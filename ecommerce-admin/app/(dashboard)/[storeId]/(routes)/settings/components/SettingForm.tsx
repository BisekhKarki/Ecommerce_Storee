"use client"
import { Store } from '@prisma/client'
import React, { useState } from 'react'
import Heading from './Heading'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/AlertModal'
import ApiAlert from '@/components/ui/api-alert'
import { useOrigin } from '@/hooks/use-origin'

interface SettingFormProps{
  initialData: Store
}

const formSchema = z.object({
    name: z.string().min(1)
})


type SettingFormValues = z.infer<typeof formSchema>;


export default function SettingForm({
    initialData
}:SettingFormProps ) {

    const params = useParams()
    const router = useRouter()
    const [open,setOpen] = useState(false)
    const [loading,setloading] = useState(false)
    const origin = useOrigin();

    const form = useForm<SettingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData
    });

    const onSubmit = async (data:SettingFormValues) =>{
       
        try {
         setloading(true)
        await axios.patch(`/api/stores/${params.storeId}`,data)
        router.refresh()
        toast.success('Store Updated')
       } catch (error) {
        toast.error("Something went wrong")
       }finally{
        setloading(false)
       }
    }


    const onDelete = async ()=>{
        try {
            setloading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push('/')
            toast.success('Store deleted.')
        } catch (error) {
            toast.error("Make sure you remove all products and categories first.")
        }finally{
            setloading(false)
            setOpen(false)
        }
    }


  return (
  <>
    <AlertModal
    isOpen={open}
    onClose={()=>setOpen(false)}
    onConfirm={onDelete}
    loading={loading}

    />
    <div className='flex items-center justify-between'  >
      <Heading
      title="Settings"
      description="Manage store preferences"
      />
        <Button
        disabled={loading}
        variant={"destructive"}
        size={"sm"}
        onClick={()=>setOpen(true)}
        >
            <Trash className='h-4 w-4' />
        </Button>
    </div>
    <Separator />
    <Form  {...form} >
        <form  onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 w-full'
        >
            <div className='grid grid-cols-3 gap-8'>
                <FormField
                control={form.control}
                name='name'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input disabled={loading}
                            placeholder='Store name'
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />

            </div>
            <Button type='submit' disabled={loading} className='ml-auto' >Save Changes</Button>
        </form>
    </Form>
    <Separator />
    <ApiAlert  
    title="NEXT_PUBLIC_API_URL"
     description={`${origin}/api/${params.storeId}`}
      variant='public'
       />
  </>
  )
}

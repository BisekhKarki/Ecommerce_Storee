"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ApiAlertProps{
    title:String;
    description: string;
    variant: 'public' | 'admin'
}

const textMap: Record<ApiAlertProps['variant'], string> ={
    public: 'Public',
    admin : "Admin"
}

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> ={
    public: 'secondary',
    admin : "destructive"
}


export default function ApiAlert({
    title,
    description,
    variant
}: ApiAlertProps ) {

    const onCopy = () => {
        navigator.clipboard.writeText(description)
        toast.success("API Route copied to the clipboard")
    }

    return(
      <Alert>
        <Server className="h-4 w-4"  />
        <AlertTitle className="flex items-center gap-x-2" >
            {title}
            <Badge variant={variantMap[variant]} >
                {textMap[variant]}
            </Badge>
        </AlertTitle>
        <AlertDescription  className="mt-4 flex items-center justify-between" >
            <code className="relative rounde bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" >
                {description}
            </code>
            <Button variant={"outline"}  onClick={onCopy} >
                <Copy className="h-4 w-4" size={"icon"} />
            </Button>
        </AlertDescription>
      </Alert>
    )

}
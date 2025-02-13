"use client"

import React, { useEffect, useState } from 'react'
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

interface AlertModalProps{
    isOpen: boolean;
    onClose: ()=> void;
    onConfirm: ()=> void;
    loading: boolean
}

const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {

    const [mounted,setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!mounted){
        return null
    }


  return (
    <Modal title='Are you sure?'
    description='This action cannot be undone'
    isOpen={isOpen}
    onClose={onClose}
    >
    <div className='pt-6 w-full space-x-2 flex items-center justify-end' >
        <Button
        disabled={loading}
        variant={'outline'}
        onClick={onClose}
        >
        Cancel
        </Button>

        <Button
        disabled={loading}
        variant='destructive'
        onClick={onConfirm}
        >
        Continue
        </Button>

    </div>
    </Modal>
  )
}

export default AlertModal

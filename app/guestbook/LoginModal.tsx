'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider } from "@nextui-org/react";
import { Dispatch, SetStateAction, useContext } from "react";
import { signIn } from 'next-auth/react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { MediaContext } from "../providers/Responsive/ResponsiveProvider";
import Google from "../ui/icons/Google";

export default function LoginModal({
    isOpen,
    setIsOpen,
}:{
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
    const media = useContext(MediaContext);

    return (
        <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement={media.isDesktop ? 'center' : 'auto'}
        className="p-2"
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader>Sign In</ModalHeader>
                <Divider />
                <ModalBody>
                    <Button
                        type='button'
                        className='h-10 rounded-xl font-bold'
                        onClick={() => signIn('github')}
                    >
                        <SiGithub className='mr-3' />
                        Continue with GitHub
                    </Button>
                    <Button
                        type='button'
                        className='h-10 rounded-xl font-bold'
                        onClick={() => signIn('google')}
                    >
                        <Google className='mr-3' />
                        Continue with Google
                    </Button>
                </ModalBody>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}
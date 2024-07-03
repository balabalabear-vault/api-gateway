'use client'

import { Button, Divider } from "@nextui-org/react";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function Guestbook() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <main>
            <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <header className="mb-4">
                <h1 className="text-4xl font-bold my-1 mb-1 text-white">Guestbook</h1>
                <p className="text-gray-400">Sign in and share your idea with everyone else.</p>
            </header>
            <Divider className="my-4 font-bold bg-gray-400" />
            <div className="text-white">
                <Button
                    className="mr-1 bg-gradient-to-r from-[#FF512F] to-[#F09819] text-white text-bold"
                    onClick={() => setIsOpen(true)}
                >
                    Login
                </Button>
                {' '}to leave a message
            </div>
        </main>
    )
}
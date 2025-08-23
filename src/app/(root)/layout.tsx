import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

export default function Layout({children}: Readonly<{children: React.ReactNode}>){
    return (
        <main >
            <Navbar />
            {children}
            <Toaster />
        </main>
    )
}
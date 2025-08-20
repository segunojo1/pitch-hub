import Navbar from "@/components/navbar";
import React from "react";

export default function Layout({children}: Readonly<{children: React.ReactNode}>){
    return (
        <main >
            <Navbar />
            {children}
        </main>
    )
}
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from './Nav'
import React, { useEffect, useState } from 'react'

export default function Layout({children}) {
    const { data: session } = useSession();
    const [showNav, setShowNav] = useState(false);
    if (!session) {
        return (
            <div className={'bg-blue-900 w-screen h-screen flex items-center'}>
                <div className="text-center w-full">
                    <button onClick={() => signIn()} className="bg-white p-2 px-4 rounded-lg">Login with Google</button>
                </div>
            </div>
        )
    }

    return (
        <div className="by-bgGray min-h-screen">
            <button onClick={() => setShowNav(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
            </button>        
            <div className="bg-blue-900 min-h-screen flex">
                <Nav show={true}/>
                <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}
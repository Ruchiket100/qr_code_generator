import React from 'react'
import { Link } from 'react-router-dom'
export const Main = () => {
    return (
        <div className='w-screen h-screen bg-gradient-to-r from-purple-200 to-white'>
            <div className='w-full md:w-[60%] h-full flex flex-col gap-10 md:gap-12 md:items-center justify-center m-auto px-2'>
                <h1 className='text-5xl md:text-8xl font-extrabold text-slate-900 md:text-center tracking-tighter'>GENERATE CUSTOMIZED QR CODES</h1>
                <div>
                    <Link to="/qr" className='p-4 md:px-6 bg-purple-300 text-purple-900 text-md md:text-lg font-bold rounded-full border-4 border-purple-400 hover:border-purple-500 transition-all'>Create One</Link>
                </div>
            </div>
        </div>
    )
}

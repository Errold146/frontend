"use client"

import { useState } from "react"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"

export default function ConfirmAccountForm() {

    const [token, setToken] = useState("")

    const handleChange = (token: string) => {
        setToken(token)
    }

    const handleComplete = () => {
        
    }

    return (
        <div className=" flex justify-center gap-5 my-10">
            <PinInput
                value={token}
                onChange={handleChange}
                onComplete={handleComplete}
            >
                <PinInputField 
                    className=" h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white" 
                />
                <PinInputField 
                    className=" h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white" 
                />
                <PinInputField 
                    className=" h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white" 
                />
                <PinInputField 
                    className=" h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white" 
                />
                <PinInputField 
                    className=" h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white" 
                />
                <PinInputField 
                    className=" h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white" 
                />
            </PinInput>
        </div>
    )
}

"use client"

import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { confirmAccount } from "@/actions"

export default function ConfirmAccountForm() {

    const router = useRouter()
    const [isComplete, setIsComplete] = useState(false)
    const [token, setToken] = useState("")

    const confirmAccountWithToken = confirmAccount.bind(null, token)
    const [state, dispatch] = useFormState(confirmAccountWithToken, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (isComplete) {
            dispatch()
        }
    }, [isComplete])

    useEffect(() => {
        if ( state.errors ) {
            state.errors.forEach(err => {
                toast.error(err)
            })
        }
        if ( state.success ) {
            toast.success(state.success, {
                onClose: () => {
                    router.push('/auth/login')
                }
            })
        }
    }, [state])

    const handleChange = (token: string) => {
        setIsComplete(false)
        setToken(token)
    }

    const handleComplete = () => {
        setIsComplete(true)
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-6 my-5 mx-10">
                <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                    <PinInputField className="h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white" />
                    <PinInputField className="h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white" />
                    <PinInputField className="h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white" />
                    <PinInputField className="h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white" />
                    <PinInputField className="h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white" />
                    <PinInputField className="h-10 w-10 border border-gray-300 shadow-lg rounded-lg text-center placeholder-white" />
                </PinInput>
            </div>

        </>
    )
}

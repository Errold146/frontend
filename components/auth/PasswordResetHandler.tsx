"use client"

import { useState } from "react"
import ValidateTokenForm from "./ValidateTokenForm"
import ResetPasswordForm from "./ResetPasswordForm"

export default function PasswordResetHandler() {

    const [token, setToken] = useState('')
    const [isValidToken, setIsValidToken] = useState(false)

    return (
        <>
            {
                !isValidToken 
                ? <ValidateTokenForm 
                    setIsValidToken={setIsValidToken} 
                    token={token}
                    setToken={setToken}
                /> 
                : <ResetPasswordForm token={token} />
            }
        </>
    )
}

"use client"

import { useEffect } from "react"
import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { resetPassword } from "@/actions"

export default function ResetPasswordForm({token}: {token: string}) {

    const router = useRouter()

    const resetPasswordWithToken = resetPassword.bind(null, token)
    const [state, dispatch] = useFormState(resetPasswordWithToken, {
        errors: [],
        success: ''
    })

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

    return (
        <form
            className=" mt-14 space-y-5"
            noValidate
            action={dispatch}
        >
            <div className="flex flex-col gap-5">
                <label
                    className="font-bold text-2xl"
                >Password</label>

                <input
                    type="password"
                    placeholder="Password de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="password"
                />
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-bold text-2xl"
                >Repetir Password</label>

                <input
                    id="password_confirmation"
                    type="password"
                    placeholder="Repite Password de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="password_confirmation"
                />

            </div>

            <input
                type="submit"
                value='Guardar Nuevo Password'
                className="bg-purple-800 hover:bg-purple-900 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
            />
        </form>
    )
}
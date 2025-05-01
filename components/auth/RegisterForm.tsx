"use client"

import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import { register } from "@/actions"
import { ErrorMessage, SuccessMessage } from "../ui"

export default function RegisterForm() {

    const ref = useRef<HTMLFormElement>(null)
    const [state, dispatch] = useFormState(register, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if ( state.success ) {
            ref.current?.reset()
        }
    }, [state])

    return (

        <form
            ref={ref}
            className="mt-14 space-y-5 w-full"
            noValidate
            action={dispatch}
        >

            {(state.errors ?? []).map(error => <ErrorMessage>{error}</ErrorMessage>)}

            {state.success && <SuccessMessage>{state.success}</SuccessMessage>}

            <div className="flex flex-col gap-2 w-">
                <label
                    className="font-bold text-2xl"
                    htmlFor="email"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="email"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                >
                    Nombre
                </label>

                <input
                    type="name"
                    placeholder="Nombre de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="name"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                >
                    Password
                </label>

                <input
                    type="password"
                    placeholder="Password de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="password"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                >
                    Repetir Password
                </label>

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
                value='Registrarme'
                className="bg-purple-700 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
            />
        </form>
    )
}

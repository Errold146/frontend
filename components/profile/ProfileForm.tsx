"use client"

import { updateUser } from "@/actions"
import type { User } from "@/src"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"

export function ProfileForm({user}: {user: User}) {

    const [state, dispatch] = useFormState(updateUser, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(err => {
                toast.error(err)
            })
        }
        if ( state.success ) {
            toast.success(state.success)
        }
    }, [state])

    return (
        <>
            <form
                className=" mt-14 space-y-5"
                noValidate
                action={dispatch}
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                    >Nombre</label>
                    <input
                        type="name"
                        placeholder="Tu Nombre"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="name"
                        defaultValue={user.name}
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Tu Email"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="email"
                        defaultValue={user.email}
                    />
                </div>

                <input
                    type="submit"
                    value='Guardar Cambios'
                    className="bg-purple-800 hover:bg-purple-700 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}
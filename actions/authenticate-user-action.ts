"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ErrorSchema, LoginSchema } from "@/src"

type ActionStateType = {
    errors: string[]
}

export async function authenticate(prevState: ActionStateType, formData: FormData) {
    
    const loginCredentials = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const auth = LoginSchema.safeParse(loginCredentials)
    if ( !auth.success ) {
        return {
            errors: auth.error.errors.map(err => err.message)
        }
    }

    const url = `${process.env.API_URL}/auth/login`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: auth.data.password,
            email: auth.data.email
        })
    })

    const json = await req.json()
    if ( !req.ok ) {
        const { error } = ErrorSchema.parse(json)
        return {
            errors: [error]
        }
    }

    // Setear Cookies
    cookies().set({
        name: 'CASHTRACKR_TOKEN',
        value: json,
        httpOnly: true,
        path: '/'
    })

    redirect('/admin')
}
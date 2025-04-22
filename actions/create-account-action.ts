"use server"

import { ErrorSchema, RegisterSchema, SuccessSchema } from "@/src"

type ActionStateType = {
    errors: string[]
    success: string
}

export async function register(state: ActionStateType, payload: FormData) {
    const registerData = {
        email: payload.get('email'),
        name: payload.get('name'),
        password: payload.get('password'),
        password_confirmation: payload.get('password_confirmation'),
    };

    const register = RegisterSchema.safeParse(registerData);
    if (!register.success) {
        const errors = register.error.errors.map(error => error.message);
        return { errors, success: state.success };
    }

    const url = `${process.env.API_URL}/auth/create-account`;
    const req = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: register.data.name,
            email: register.data.email,
            password: register.data.password,
        }),
    });

    const json = await req.json();
    if (req.status === 409) {
        const { error } = ErrorSchema.parse(json);
        return { errors: [error], success: '' };
    }

    const success = SuccessSchema.parse(json);
    return { errors: [], success };
}
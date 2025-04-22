import { z } from "zod"

export const RegisterSchema = z.object({
    email: z.string().min(1, { message: 'El Email es obligatorio' }).email({ message: 'Email Inválido' }),
    name: z.string().min(1, { message: 'El Nombre es obligatorio' }),
    password: z.string().min(8, { message: 'El Password es muy corto, mínimo 8 caracteres' }),
    password_confirmation: z.string(),
}).refine( data => data.password === data.password_confirmation, {
    message: 'Los Password\'s no son iguales',
    path: ['password_confirmation']
})

export const SuccessSchema = z.string()
export const ErrorSchema = z.object({
    error: z.string()
})
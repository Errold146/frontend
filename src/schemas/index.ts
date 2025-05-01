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

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email()
})

export const ExpenseAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    budgetId: z.number(),
})

export const BudgetAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    userId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    expenses: z.array(ExpenseAPIResponseSchema).optional().default([])
})

export const TokenSchema = z.string({ message: 'Token inválido' }).length(6, { message: 'Token inválido' })

export const LoginSchema = z.object({
    email: z.string()
        .min(1, { message: 'El Email es Obligatorio' })
        .email({ message: 'Email inválido' }),
    password: z.string()
        .min(1, { message: 'El Password no puede ir vacio' })
})

export const ForgotPasswordSchema = z.object({
    email: z.string()
        .min(1, { message: 'El Email es Obligatorio' })
        .email({ message: 'Email inválido' }),
})

export const ResetPasswordSchema = z.object({
    password: z.string()
        .min(8, { message: 'El Password debe ser de al menos 8 caracteres' }),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Los Password\'s no son iguales",
    path: ["password_confirmation"]
})

export const DraftBudgetSchema = z.object({
    name: z.string()
        .min(1, { message: 'El Nombre del presupuesto es obligatorio' }),
    amount: z.coerce.
        number({ message: 'Cantidad inválida' })
        .min(1, { message: 'Cantidad inválida' }),
})

export const BudgetAPIArraySchema = z.array(BudgetAPIResponseSchema)

export const PasswordValidationSchema = z.string().min(1, {message: 'Password inválido'})

export const DraftExpenseSchema = z.object({
    name: z.string().min(1, {message: 'El nombre del gasto es obligatorio'}),
    amount: z.coerce.number().min(1, {message: 'Cantidad inválida'})
})

export const UpdatePasswordSchema = z.object({
    current_password: z.string().min(1, { message: 'El Password no puede ir vacio' }),
    password: z.string()
        .min(8, { message: 'El Nuevo Password debe ser de al menos 8 caracteres' }),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Los Password\'s no son iguales",
    path: ["password_confirmation"]
});

export const ProfileFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'Tu Nombre no puede ir vacio' }),
    email: z.string()
        .min(1, { message: 'El Email es Obligatorio' })
        .email({ message: 'Email no válido' }),
})

export const SuccessSchema = z.string()
export const ErrorSchema = z.object({
    error: z.string()
})

export type User = z.infer<typeof UserSchema>
export type Budget = z.infer<typeof BudgetAPIResponseSchema>
export type Expense = z.infer<typeof ExpenseAPIResponseSchema>
export type DraftExpense = z.infer<typeof DraftExpenseSchema>
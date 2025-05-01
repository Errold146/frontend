"use server"

import { DraftExpenseSchema, ErrorSchema, getToken, SuccessSchema } from "@/src"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[]
    success: string
}

export async function createExpense(budgetId: number, prevState: ActionStateType, formData: FormData) {
    
    const expenseData = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }
    const expense = DraftExpenseSchema.safeParse(expenseData)
    if ( !expense.success ) {
        return {
            errors: expense.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    // Generar el gasto
    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount
        })
    })
    const json = await req.json()
    if ( !req.ok ) {
        const { error } = ErrorSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }
    const success = SuccessSchema.parse(json)
    revalidatePath(`/admin/budgets/${budgetId}`)

    return {
        errors: [],
        success
    }
}
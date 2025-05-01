"use server"

import { DraftExpenseSchema, ErrorSchema, getToken, SuccessSchema, type Budget, type Expense } from "@/src"
import { revalidatePath } from "next/cache"

type BudgetAndExpense = {
    budgetId: Budget['id']
    expenseId: Expense['id']
}

type ActionStateType = {
    errors: string[]
    success: string
}

export async function editExpense(
    {budgetId, expenseId}: BudgetAndExpense, 
    prevState: ActionStateType, 
    formData: FormData
) {
    const expense = DraftExpenseSchema.safeParse({
        name: formData.get('name'),
        amount: formData.get('amount')
    })

    if ( !expense.success ) {
        return {
            errors: expense.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    // Actualizar el gasto
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
    const token = getToken()
    const req = await fetch(url, {
        method: 'PUT',
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
        const {error} = ErrorSchema.parse(json)
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
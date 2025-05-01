"use server"

import { ErrorSchema, getToken, SuccessSchema, type Budget, type Expense } from "@/src"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[]
    success: string
}

type BudgetIdAndExpenseId = {
    budgetId: Budget['id']
    expenseId: Expense['id']
}

export async function deleteExpense({budgetId, expenseId}: BudgetIdAndExpenseId, prevState: ActionStateType) {
    
    const token = getToken()
    console.log("Token:", token);
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
    const req = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const json = await req.json()
    if ( !req.ok ) {
        const { error } = ErrorSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }
    revalidatePath(`/admin/budgets/${budgetId}`)
    const success = SuccessSchema.parse(json)

    return {
        errors: [],
        success
    }
}
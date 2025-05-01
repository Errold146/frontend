import { notFound } from "next/navigation"
import { cache } from "react"
import { BudgetAPIResponseSchema, getToken } from "@/src"

export const getBudget = cache(async (budgetId: string) => {

    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}`
    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        next: {
            tags: ['all-budgets']
        }
    })
    const json = await req.json()
    if ( !req.ok ) {
        notFound()
    }

    const budget = BudgetAPIResponseSchema.parse(json)
    return budget
})
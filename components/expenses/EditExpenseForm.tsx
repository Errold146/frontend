"use client"

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import type { DraftExpense } from "@/src";
import { useFormState } from "react-dom";
import { editExpense } from "@/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EditExpenseForm() {

    const router = useRouter()
    const [expense, setExpense] = useState<DraftExpense>()
    const { id: budgetId } = useParams()
    const searchParams = useSearchParams()
    const expenseId = searchParams.get('editExpenseId')!

    const editExpenseIdAndBudgetId = editExpense.bind(null, {
        budgetId: +budgetId,
        expenseId: +expenseId
    })
    const [state, dispatch] = useFormState(editExpenseIdAndBudgetId, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`
        fetch(url)
            .then(res => res.json())
            .then(data => setExpense(data))
        
    }, [])

    useEffect(() => {
        if ( state.errors ) {
            state.errors.forEach(err => {
                toast.error(err)
            })
        }
        if ( state.success ) {
            router.push(`/admin/budgets/${budgetId}`)
            toast.success(state.success)
        }
    }, [state])

    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-purple-950 my-5"
            >
                Editar Gasto
            </DialogTitle>
            <p className="text-xl font-bold">Edita los detalles de un {''}
                <span className="text-amber-500">gasto</span>
            </p>
            <form
                className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
                noValidate
                action={dispatch}
            >
                <ExpenseForm expense={expense} />

                <input
                    type="submit"
                    className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                    value='Guardar Cambios'
                />
            </form>
        </>
    )
}

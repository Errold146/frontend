"use client"

import { useFormState } from "react-dom";
import { useParams, useRouter } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { createExpense } from "@/actions";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AddExpenseForm() {

    const { id } = useParams()
    const router = useRouter()

    const createExpenseWithBudgetId = createExpense.bind(null, +id)
    const [state, dispacth] = useFormState(createExpenseWithBudgetId, {
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
            router.push(`/admin/budgets/${id}`)
        }
    }, [state])

    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-purple-950 my-5"
            >
                Agregar Gasto
            </DialogTitle>

            <p className="text-xl font-bold">Llena el formulario y crea un {''}
                <span className="text-amber-500">gasto</span>
            </p>
            <form
                className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
                noValidate
                action={dispacth}
            >
                <ExpenseForm />

                <input
                    type="submit"
                    className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                    value='Registrar Gasto'
                />
            </form>
        </>
    )
}
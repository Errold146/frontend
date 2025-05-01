"use client"

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { useFormState } from "react-dom";
import { deleteExpense } from "@/actions";
import { useEffect, useCallback } from "react";
import { toast } from "react-toastify";

type DeleteExpenseForm = {
    closeModal: () => void
}

export default function DeleteExpenseForm() {

    const { id: budgetId } = useParams()
    const searchParams = useSearchParams()
    const expenseId = searchParams.get('deleteExpenseId')!
    const pathname = usePathname()
    const router = useRouter()

    const closeModal = useCallback(() => {
        const hideModal = new URLSearchParams(searchParams.toString());
        hideModal.delete("deleteExpenseId");
        router.replace(`${pathname}?${hideModal}`);
    }, [searchParams, pathname, router]); // Dependencias necesarias

    const deleteExpenseWithBudgetId = deleteExpense.bind(null, {
        budgetId: +budgetId,
        expenseId: +expenseId
    })
    const [state, dispatch] = useFormState(deleteExpenseWithBudgetId, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if ( !Number.isInteger(+budgetId) || !Number.isInteger(+expenseId) ) {
            closeModal()
        }
    }, [budgetId, closeModal, expenseId])

    useEffect(() => {
        if ( state.errors ) {
            state.errors.forEach(err => {
                toast.error(err)
            })
        }
        if ( state.success ) {
            closeModal()
            toast.success(state.success)
        }
    }, [state, budgetId, closeModal, expenseId])

    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-purple-800 my-5"
            >
                Eliminar Gasto
            </DialogTitle>
            <p className="text-xl font-bold">Confirma para eliminar, {''}
                <span className="text-amber-500">el gasto</span>
            </p>
            <p className='text-red-600 font-semibold'>(Un gasto eliminado no se puede recuperar)</p>
            <div className="grid grid-cols-2 gap-5 mt-10">
                <button
                    className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                    onClick={closeModal}
                >Cancelar</button>
                <button
                    type='button'
                    className="bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors"
                    onClick={() => dispatch()}
                >Eliminar</button>
            </div>
        </>
    )
}

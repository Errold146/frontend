import type { Metadata } from "next"
import Link from "next/link"
import { ForgotPasswordForm } from "@/components"

export const metadata: Metadata = {
    title: "CashTrackr - Restablecer Password",
    description: "CashTrackr - Restablecer Password"
}

export default function ForgotPasswordPage() {

    return (
        <>
            <h1 className=" font-black text-6xl text-purple-800">Restablecer Password</h1>
            <p className=" text-3xl font-bold">Aquí puedes <span className=" text-amber-500">restablecer tu password</span></p>

            <ForgotPasswordForm />

            <nav className=" mt-10 flex flex-col space-y-4">
                <Link
                    href='/auth/login'
                    className=" text-center text-gray-600 hover:text-purple-800 font-semibold text-lg"
                >
                    ¿Ya tienes cuenta? Inicia Sesión
                </Link>

                <Link
                    href='/auth/register'
                    className=" text-center text-gray-600 hover:text-purple-800 font-semibold text-lg"
                >
                    ¿No tienes cuenta? Crear Cuenta
                </Link>
            </nav>
        </>
    )
}

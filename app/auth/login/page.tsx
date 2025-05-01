import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components"

export const metadata: Metadata = {
    title: "CashTrackr - Iniciar Sesión",
    description: "CashTrackr - Iniciar Sesión"
}

export default function LoginPage() {

    return (
        <div className="flex flex-col justify-center items-center lg:min-h-screen lg:overflow-hidden">
            <h1 className=" font-black text-6xl text-purple-800">Inicia Sesión</h1>
            <p className=" text-3xl font-bold">y controla tus <span className=" text-amber-500">finanzas</span></p>

            <LoginForm />

            <nav className=" mt-10 flex flex-col space-y-4">
                <Link
                    href='/auth/register'
                    className=" text-center text-gray-600 hover:text-purple-800 font-semibold text-lg"
                >
                    ¿No tienes cuenta? Crear Cuenta
                </Link>

                <Link
                    href='/auth/forgot-password'
                    className=" text-center text-gray-600 hover:text-purple-800 font-semibold text-lg"
                >
                    ¿Olvidé mi password? Restablecer Password
                </Link>
            </nav>
        </div>
    )
}

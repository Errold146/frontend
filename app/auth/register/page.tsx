import type { Metadata } from "next"
import Link from "next/link"
import { RegisterForm } from "@/components"

export const metadata: Metadata = {
    title: "CashTrackr - Crear Cuenta",
    description: "CashTrackr - Crear Cuenta"
}

export default function RegisterPage() {

    return (
        <>
           <h1 className=" font-black text-6xl text-purple-800">Crea una Cuenta</h1> 
           <p className=" text-3xl font-bold">y controla tus <span className=" text-amber-500">finanzas</span></p>

            <RegisterForm />

            <nav className=" mt-10 flex flex-col space-y-4">
                <Link
                    href='/auth/login'
                    className=" text-center text-gray-600 hover:text-purple-800 font-semibold text-lg"
                >
                    ¿Ya tienes cuenta? Inicia Sesión
                </Link>
                
                <Link
                    href='/auth/forgot-password'
                    className=" text-center text-gray-600 hover:text-purple-800 font-semibold text-lg"
                >
                    ¿Olvidé mi password? Restablecer Password
                </Link>
            </nav>
        </>
    )
}

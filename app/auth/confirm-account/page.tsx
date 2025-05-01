import { ConfirmAccountForm } from "@/components";

export default function ConfirmAccountPage() {
    return (
        <div className="flex flex-col justify-center items-center lg:min-h-screen lg:overflow-hidden">
            <h1 className="font-black text-6xl text-purple-800">Confirma tu Cuenta</h1>
            <p className="text-3xl font-bold text-center">
                Ingresa el código recibido
                <span className="text-amber-500"> por Email</span>
            </p>
            <ConfirmAccountForm />
        </div>
    );
}
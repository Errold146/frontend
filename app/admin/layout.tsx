import Link from "next/link";
import Image from "next/image";
import { AdminMenu, Logo, ToastNotification } from "@/components";
import { verifySession } from "@/src";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user } = await verifySession()

    return (
        <>
            <header className='bg-purple-800 py-5'>
                <div className='max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
                    <div className='w-96'>
                        <Link href={'/admin'}>
                            <Logo />
                        </Link>
                    </div>
                    
                    <AdminMenu 
                        user={user}
                    />

                </div>
            </header>

            <section className='max-w-5xl mx-auto mt-20 p-3 py-10'>
                {children}
            </section>
            
            <ToastNotification />

            <footer className="py-5">
                <div className="flex flex-col items-center md:flex-row md:justify-center gap-4">
                    <p className="text-center">
                        Todos los Derechos Reservados MicroWeb-cr {new Date().getFullYear()}
                    </p>
                    <Image
                        src="/favicon.png"
                        alt="Logo CashTrackr"
                        className="w-8 h-8 md:w-10 md:h-10"
                    />
                </div>
            </footer>
        </>
    );
}
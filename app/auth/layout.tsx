import { Logo, ToastNotification } from "@/components";
import Link from "next/link";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="lg:grid lg:grid-cols-2 h-screen lg:overflow-hidden">
                <div 
                    className=" bg-purple-950 lg:bg-auth lg:bg-30 bg-no-repeat bg-left-bottom flex justify-center"
                >
                    <div className="w-96 py-10 lg:py-24">
                        <Link href={'/'}>
                            <Logo />
                        </Link>
                    </div>
                </div>
                
                <div className="p-5 lg:py-10">
                    <div className=" max-w-3xl mx-auto">
                        {children}
                    </div>
                </div>
            </div>

            <ToastNotification />
        </>
    );
}
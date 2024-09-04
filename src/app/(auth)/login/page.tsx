import { Metadata } from "next";
import loginImage from "@/assets/login-image.jpg";
import Image from "next/image";
import LoginForm from "./LoginForm";
import Link from "next/link";
import GoogleSignInButton from "./GoogleSignInButton";


export const metadata: Metadata = {
    title: "Connexion",
};

export default function Page() {
    return (
        <main className="flex h-screen items-center justify-center p-5">
            <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
                <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
                    <div className="space-y-1 text-center">
                        <h1 className="text-3xl font-bold">Connexion</h1>
                        <p className="text-muted-foreground">
Un endroit où même <span className="italic">vous</span> pouvez trouver un ami.
                        </p>
                    </div>
                    <div className="space-y-5">
                        <GoogleSignInButton />
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-muted"></div>
                            <span>OU</span>
                            <div className="h-px flex-1 bg-muted"></div>
                        </div>
                        <LoginForm/>
                        <Link href="/signup" className="block text-center hover:underline">
                        Je n&apos;ai pas de compte ? S&apos;enregistrer</Link>
                    </div>
                </div>
                <Image
                    src={loginImage}
                    alt="login-image"
                    className="w-1/2 hidden md:block object-cover" />
            </div>
        </main>
    );
}
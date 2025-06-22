import Link from "next/link"
import Image from "next/image"
import { SignupForm } from "@/components/signup-form"
import logotipo from "../../../../public/images/lox-logo.svg"

export default function LoginPage() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-0 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col">
                <Link href="/" className="flex items-center gap-2 self-center font-medium">
                    <div className="text-primary-foreground flex size-15 items-center justify-center rounded-md">
                        <Image
                            src={logotipo}
                            width={90}
                            height={90}
                            alt="Universidade lusíadas"
                        />
                    </div>
                </Link>
                <SignupForm />
            </div>
        </div>
    )
}

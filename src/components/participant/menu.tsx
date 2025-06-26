import Link from "next/link";
import Image from "next/image";
import logotipo from "../../../public/images/lox-whitelogo.svg"

export default function Menu() {
    return (
        <header className="hidden relative w-full md:flex flex-col items-center text-sm">
            <div className="w-full bg-green-900 text-black flex justify-between px-40 py-9">
                <Link href="/">
                    <Image
                        src={logotipo}
                        alt="lox logotipo"
                        width={60}
                    />
                </Link>
                <nav className="text-white flex gap-4">
                    <Link href="/Blogs" className="px-3 py-2">Notícias</Link>
                    <Link href="/SignUp" className="h-fit px-3 py-2 border-2 border-gray-300 rounded-4xl">Terminar sessão</Link>
                </nav>
            </div>
            <nav className="relative -top-6 flex gap-2 items-center text-black py-2 px-6 bg-white rounded-xs shadow-sm">
                <Link href="/" className="p-2">Eventos</Link>
                <Link href="#" className="p-2">Serviços</Link>
                <Link href="#" className="p-2">Funcionamento</Link>
                <Link href="#" className="p-2">Testemunhos</Link>
                <Link href="#" className="p-2">Sobre LOX</Link>
                <Link href="#" className="p-2">Contactos</Link>
            </nav>
        </header >
    );
}
import Link from "next/link";
import Image from "next/image";
import { NavigationMenuUi } from "@/components/ui/index";

import logotipo from "../../public/images/lox-logo.svg";

export default function DesktopMenu() {
    return (
        <div className="hidden relative w-full h-[75px] md:flex flex-row justify-between items-center text-base text-white px-[8%] lg:px-[10%] xl:px-[15%] 2xl:px-[20%]">
            <div>
                <Link href="/">
                    <Image
                        src={logotipo}
                        width={60}
                        height={60}
                        alt="Universidade lusíadas"
                    />
                </Link>
                <NavigationMenuUi.NavigationMenu>
                    <NavigationMenuUi.NavigationMenuList>
                        <NavigationMenuUi.NavigationMenuItem>
                            <NavigationMenuUi.NavigationMenuTrigger>Item One</NavigationMenuUi.NavigationMenuTrigger>
                            <NavigationMenuUi.NavigationMenuContent>
                                <NavigationMenuUi.NavigationMenuLink>Link 1</NavigationMenuUi.NavigationMenuLink>
                            </NavigationMenuUi.NavigationMenuContent>
                        </NavigationMenuUi.NavigationMenuItem>
                    </NavigationMenuUi.NavigationMenuList>
                </NavigationMenuUi.NavigationMenu>
            </div>
            <div>
                <Link href="#">Log in</Link>
                <Link href="#">Começar agora</Link>
            </div>
        </div>
    );
}
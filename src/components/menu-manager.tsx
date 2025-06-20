import MobileMenu from "./mobile-menu";
import DesktopMenu from "./desktop-menu";

export default function MenuManager() {
    return (
        <header className="w-full fixed z-40 flex justify justify-between items-center">
            <DesktopMenu />
            <MobileMenu />
        </header>
    );
}
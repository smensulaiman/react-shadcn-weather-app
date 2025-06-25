import {Cloud} from "lucide-react";
import {Link} from "react-router-dom";
import {useTheme} from "@/components/context/theme-provider.tsx";

const Header = () => {

    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur p-2 supports-[backdrop-filter]:bg-background/40">
            <div className="container mx-auto flex">
                <Link to={"/"}>
                    <Cloud className={ isDark ? "text-green-400" : "text-black" } width="40" height="40"/>
                    <h3 className={ (isDark ? "text-green-400" : "text-black") + " text-xl" }>Abhawa</h3>
                </Link>
            </div>
            <div>
                {/*search*/}
                {/*theme toggle*/}
                <div className="cursor-pointer" onClick={ function (): void { setTheme(isDark ? "light" :  "dark") } }>toggle</div>
            </div>
        </header>
    );
};

export default Header;
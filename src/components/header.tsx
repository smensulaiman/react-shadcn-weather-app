import {Moon, Sun} from "lucide-react";
import {Link} from "react-router-dom";
import {useTheme} from "@/components/context/theme-provider.tsx";

const Header = () => {

    const {theme, setTheme} = useTheme();
    const isDark = theme === "dark";

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur py-4 supports-[backdrop-filter]:bg-background/40">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link className="flex" to={"/"}>
                    <img className="h-6 w-6 fill-red-50" src="/logo.png"  alt="abhawa"/>
                    <h3 className={(isDark ? "text-green-400" : "text-black") + " text-xl font-libertinus"}>{ "/abhawa".toUpperCase() }</h3>
                </Link>
                <div>
                    {/*search*/}
                    {/*theme toggle*/}
                    <div className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}`}
                         onClick={function (): void { setTheme(isDark ? "light" : "dark")}}>
                        {(isDark ? (<Sun className="h-6 w-6 text-yellow-400 rotate-0 transition-all"/>)
                            : (<Moon className="h-6 w-6 text-black rotate-0 transition-all"/>))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
import {type PropsWithChildren} from 'react';
import {Heart} from "lucide-react";

const Layout = ({children}: PropsWithChildren) => {
    return (
        <div className="bg-gradient-to-br from-background to-muted">
            {/*header*/}

            {/*main*/}
            <main className="min-h-screen container mx-auto p-4">
            {children}
            </main>

            {/*footer*/}
            <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/20">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p className="flex gap-2 justify-center items-center">Made with<Heart width="18" height="18" color="red"/>by sulaiman</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
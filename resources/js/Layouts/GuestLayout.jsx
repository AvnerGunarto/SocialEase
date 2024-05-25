import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-50 drop-shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Link href="/login" className=" hover:bg-gray-200 px-3 py-2 rounded-md text-black font-bold h-10 box-border border-2 border-purple-500">
                                Login
                            </Link>
                            <Link href="/register" className="bg-purple-500 hover:bg-purple-700 px-3 py-2 rounded-md text-white ml-2 font-bold">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="mt-4">
                {children}
            </div>

        </div>
    );
}

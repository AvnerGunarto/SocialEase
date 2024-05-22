import { Link, Head } from "@inertiajs/react";
import Guest from "@/Layouts/GuestLayout";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="Welcome" />
            <Guest>
                <div className="mx-24">
                    <div className="flex items-center">
                        <div>
                            <h1 className="font-extrabold text-5xl ">
                                Do Better with Social Media Automation
                            </h1>
                            <p className="my-4 text-xl">
                                Our tool will allow you to supercharge your
                                marketing efforts, effortlessly. Unlock social
                                media as a powerful marketing avenue.
                            </p>
                            <div className="my-4">
                                <Link
                                    href="/register"
                                    className="bg-purple-500 hover:bg-purple-700 px-3 py-3 rounded-md text-white mr-2 font-bold text-xl border-2 border-purple-500 hover:border-purple-700"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href="/login"
                                    className="hover:bg-gray-200 px-3 py-3 rounded-md text-black font-bold h-10 box-border border-2 border-purple-500 text-xl"
                                >
                                    Login
                                </Link>
                            </div>
                            <p className="text-gray-500">
                                Start your journey with 30 days of free trial.
                            </p>
                        </div>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg"
                            className="h-96"
                            alt="meow" // This is a cat, or is it?
                            title="meow" // This is a cat, or is it?

                        />
                    </div>
                    <div>
                        <h1 className="font-extrabold text-5xl">
                            Why SocialEase?
                        </h1>
                        <div className="flex justify-between">
                            <div className="border-2 border-black rounded-md h-52 min-w-64 max-w-96 p-6 ">
                                <h2 className="font-bold text-3xl mb-2">Save Time</h2>
                                <p>
                                    SocialEase allows you to focus less on
                                    making a consistent schedule, allowing you
                                    to focus on more important things.
                                </p>
                            </div>
                            <div className="border-2 border-black rounded-md h-52 min-w-64 max-w-96 p-6">
                                <h2 className="font-bold text-3xl mb-2">Affordable</h2>
                                <p>
                                    SocialEase provides competitive price
                                    compared to other competitors.
                                </p>
                            </div>
                            <div className="border-2 border-black rounded-md h-52 min-w-64 max-w-96 p-6">
                                <h2 className="font-bold text-3xl mb-2">Feature-Rich</h2>
                                <p>
                                    SocialEase provides many features- from
                                    scheduling posts, content analytics, to
                                    content generation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Guest>
        </>
    );
}

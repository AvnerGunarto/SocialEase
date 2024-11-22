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
                <div className="relative">
                    {/* Container with relative position */}
                    <div className="mx-24 flex items-center relative z-[10]">
                        <div>
                            <h1 className="font-extrabold text-5xl ">
                                <br /> <br /> <br />
                                Do Better with Social Media <br />
                                Automation
                            </h1>
                            <p className="my-4 text-xl ">
                                Our tool will allow you to supercharge your
                                marketing efforts, <br />
                                effortlessly. Unlock social media as a powerful
                                marketing <br />
                                avenue.
                            </p>
                            <div className="my-4">
                                <Link
                                    href="/register"
                                    className="bg-purple-500 hover:bg-purple-700 px-4 py-3 rounded-full text-white font-bold text-xl border-2 border-purple-500 hover:border-purple-700 shadow-lg"
                                >
                                    Try Demo
                                </Link>
                            </div>
                            <p className="text-gray-500">
                                Start your journey with 30 days of free trial.
                            </p>
                        </div>
                    </div>
                    <div className="absolute top-[0px] right-[-130px] w-[600px] h-auto z-[0] pointer-events-none">
                        <img
                            src="/images/Onboarding/Combine2.png"
                            className="w-full h-auto rounded drop-shadow-xl"
                            alt="meow"
                            title="meow"
                        />
                    </div>
                    {/* Feature Cards Section */}
                    <div className="relative z-[10] mt-18 ml-[140px] transform translate-y-40">
                        <div className="flex justify-start space-x-10">
                            {/* Card 1 */}
                            <div
                                className="bg-teal-400 text-white rounded-lg p-6 w-64 shadow-lg text-center"
                                style={{ backgroundColor: "#15F5BA" }}
                            >
                                <div
                                    className="bg-purple-500 p-4 rounded-lg mb-4 mx-auto w-30 h-26 flex flex-col items-center justify-center"
                                    style={{ backgroundColor: "#836FFF" }}
                                >
                                    <img
                                        src="/images/Onboarding/fast.png"
                                        alt="Fast icon"
                                        className="w-20 h-20 mb-2"
                                        style={{
                                            filter: "brightness(0) invert(1)",
                                        }}
                                    />
                                    <h2 className="font-bold text-md">Fast</h2>
                                </div>
                                <p
                                    className="text-sm font-bold text-left"
                                    style={{ color: "#836FFF" }}
                                >
                                    SocialEase allows you to focus less on
                                    making a consistent schedule, allowing you
                                    to focus on more important things.
                                </p>
                            </div>
                            {/* Card 2 */}
                            <div
                                className="bg-teal-400 text-white rounded-lg p-6 w-64 shadow-lg text-center"
                                style={{ backgroundColor: "#15F5BA" }}
                            >
                                <div
                                    className="bg-purple-500 p-4 rounded-lg mb-4 mx-auto w-30 h-26 flex flex-col items-center justify-center"
                                    style={{ backgroundColor: "#836FFF" }}
                                >
                                    <img
                                        src="/images/Onboarding/Affordable.png"
                                        alt="Affordable icon"
                                        className="w-20 h-20 mb-2"
                                        style={{
                                            filter: "brightness(0) invert(1)",
                                        }}
                                    />
                                    <h2 className="font-bold text-md">
                                        Affordable
                                    </h2>
                                </div>
                                <p
                                    className="text-sm font-bold text-left"
                                    style={{ color: "#836FFF" }}
                                >
                                    SocialEase provides competitive pricing
                                    compared to other competitors.
                                </p>
                            </div>
                            {/* Card 3 */}
                            <div
                                className="bg-teal-400 text-white rounded-lg p-6 w-64 shadow-lg text-center"
                                style={{ backgroundColor: "#15F5BA" }}
                            >
                                <div
                                    className="bg-purple-500 p-4 rounded-lg mb-4 mx-auto w-30 h-26 flex flex-col items-center justify-center"
                                    style={{ backgroundColor: "#836FFF" }}
                                >
                                    <img
                                        src="/images/Onboarding/Seemless.png"
                                        alt="Seamless icon"
                                        className="w-20 h-20 mb-2"
                                        style={{
                                            filter: "brightness(0) invert(1)",
                                        }}
                                    />
                                    <h2 className="font-bold text-md">
                                        Seamless
                                    </h2>
                                </div>
                                <p
                                    className="text-sm font-bold text-left"
                                    style={{ color: "#836FFF" }}
                                >
                                    SocialEase provides many features - from
                                    scheduling posts, content analytics, to
                                    content generation.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Purple About Us Section */}
                    <div className="bg-[#836FFF] py-32">
                        <div className="mx-auto mt-24 text-center w-[80%] lg:pl-20 lg:pr-40 relative">
                            <h2 className="text-2xl font-extrabold mb-4 text-white">
                                About Us
                            </h2>
                            <p className="text-center text-white text-sm">
                                At SocialEase, we are committed to simplifying
                                social media management for businesses,
                                influencers, and marketers by offering a
                                comprehensive suite of automation tools. Our
                                platform empowers users to streamline content
                                scheduling, enhance customer engagement, and
                                gain deep insights through advanced analytics,
                                all while saving time and effort. With
                                influencer discovery features and multi-platform
                                live streaming, SocialEase enables users to
                                focus on creativity and strategy. Prioritizing
                                security and ease of use, we offer intuitive
                                interfaces with strong safety measures, ensuring
                                that managing your online presence is both
                                effortless and effective.
                            </p>
                        </div>
                    </div>

                    {/* Dark Footer Section */}
                    <div className="bg-[#211951] py-8 relative">
                        <div className="flex justify-between items-center mx-auto w-[90%] text-white">
                            <div className="text-sm font-semibold relative mt-12">
                                <p>© 2024. All Rights Reserved.</p>
                            </div>
                            <div
                                className="flex flex-col items-center space-y-2 "
                                style={{ marginLeft: "800px" }}
                            >
                                {" "}
                                <p className="text-white font-semibold">
                                    Follow us
                                </p>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://www.instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="bg-[#15F5BA] rounded-full p-2">
                                            <img
                                                src="/images/OnBoarding/instagram.png"
                                                alt="Instagram"
                                                className="w-4 h-4"
                                            />
                                        </div>
                                    </a>

                                    <a
                                        href="https://www.linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="bg-[#15F5BA] rounded-full p-2">
                                            <img
                                                src="/images/OnBoarding/linkedin.png"
                                                alt="LinkedIn"
                                                className="w-4 h-4"
                                            />
                                        </div>
                                    </a>

                                    <a
                                        href="https://www.facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="bg-[#15F5BA] rounded-full p-2">
                                            <img
                                                src="/images/OnBoarding/facebook.png"
                                                alt="Facebook"
                                                className="w-4 h-4"
                                            />
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="relative -mt-32">
                                {" "}
                                <p className="bg-[#15F5BA] text-[#211951] font-semibold py-2 px-4 rounded-full ">
                                    Curious About Us?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Guest>
        </>
    );
}

import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phoneNum: "",
        accountType: "1",
        terms: false,
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="relative flex min-h-screen bg-gray-100 items-center justify-center">
                <div className="absolute -top-10 -left-10 w-1/3 p-6">
                    <img
                        src="/images/register/Combine Reg.png"
                        alt="Registration Illustration"
                        className="w-60% h-60%"
                    />
                </div>

                <div className="w-full md:w-2/3 lg:w-1/2 bg-white shadow-lg rounded-lg p-10 mx-8 md:ml-1/3">
                    <h1 className="text-4xl font-bold text-center mb-8">
                        Register
                    </h1>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="phoneNum"
                                value="Phone Number"
                            />
                            <TextInput
                                id="phoneNum"
                                name="phoneNum"
                                value={data.phoneNum}
                                className="mt-1 block w-full"
                                autoComplete="phoneNum"
                                onChange={(e) =>
                                    setData("phoneNum", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.phoneNum}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-start">
                            <Checkbox
                                type="checkbox"
                                id="terms"
                                name="terms"
                                value="terms"
                                className="mr-2"
                                onChange={(e) =>
                                    setData("terms", e.target.checked)
                                }
                            />
                            <label>
                                I agree to the{" "}
                                <Link
                                    href="/tnc"
                                    className="text-purple-500 underline"
                                >
                                    terms and conditions
                                </Link>
                            </label>
                            <InputError
                                message={errors.terms}
                                className="ml-2"
                            />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <Link
                                href={route("login")}
                                className="text-sm text-gray-600 hover:text-gray-900 underline"
                            >
                                Already registered?
                            </Link>
                            <PrimaryButton
                                className="px-6 py-2"
                                disabled={processing}
                            >
                                Register
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}

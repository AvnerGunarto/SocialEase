import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";

export default function RegisterPaymentInfo() {
    const { data, setData, post, processing, errors, reset } = useForm({
        card_number: "",
        address: "",
        cvv: "",
        expiry_date: "",
    });

    useEffect(() => {
        return () => {
            reset("expiry_date", "cvv", "address", "card_number");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("payment.store"));
    };

    return (
        <GuestLayout>
            <Head title="Input Payment Info" />
            <div className="flex flex-col items-center max-w-none">
                <h1 className="text-5xl font-extrabold">Input Payment Info</h1>
                <p>Don't worry, you won't be charged.</p>
                <form
                    onSubmit={submit}
                    className="mx-32"
                    style={{ width: "50%" }}
                >
                    <div>
                        <InputLabel htmlFor="card_number" value="Card Number" />

                        <TextInput
                            id="card_number"
                            name="card_number"
                            value={data.card_number}
                            className="mt-1 block w-full"
                            autoComplete="card_number"
                            isFocused={true}
                            onChange={(e) =>
                                setData("card_number", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.card_number}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="address" value="Address" />

                        <TextInput
                            id="address"
                            name="address"
                            value={data.address}
                            className="mt-1 block w-full"
                            autoComplete="Address"
                            onChange={(e) => setData("address", e.target.value)}
                            required
                        />

                        <InputError message={errors.address} className="mt-2" />
                    </div>

                    <div className="flex justify-between">
                        <div className="mt-4" style={{ width: "100%" }}>
                            <InputLabel htmlFor="cvv" value="CVV" />

                            <TextInput
                                id="cvv"
                                name="cvv"
                                value={data.cvv}
                                className="mt-1 block w-full"
                                autoComplete="cvv"
                                onChange={(e) => setData("cvv", e.target.value)}
                                placeholder="e.g. 123"
                                required
                            />

                            <InputError message={errors.cvv} className="mt-2" />
                        </div>

                        <div className="mt-4 ml-2" style={{ width: "100%" }}>
                            <InputLabel
                                htmlFor="expiry_date"
                                value="Expiration Date"
                            />

                            <TextInput
                                id="expiry_date"
                                name="expiry_date"
                                value={data.password}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("expiry_date", e.target.value)
                                }
                                placeholder="e.g. 12-23"
                                required
                            />

                            <InputError
                                message={errors.expiry_date}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}

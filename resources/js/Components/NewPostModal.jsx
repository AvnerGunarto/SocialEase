import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";

export default function NewPostModal({ showModal, setShowModal, options }) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } =
        useForm({
            body: "",
            social_account: [],
            post_title: "",
            post_date: "",
            image: null,
        });

    const submit = (e) => {
        e.preventDefault();

        post(route("dashboard.store"), {
            onSuccess: () => setShowModal(false),
        });
    };

    useEffect(() => {
        return () => {
            reset("body", "social_account", "post_title", "post_date", "image");
        };
    }, [showModal]);
    return (
        <Modal show={showModal} maxWidth="2xl">
            <div className="p-8" style={{ height: "100%" }}>
                <div>
                    <div className="flex flex-row justify-between mb-2">
                        <h1 className="text-3xl font-black">Post</h1>
                        <button
                            onClick={() => {
                                setShowModal(false);
                            }}
                        >
                            X
                        </button>
                    </div>
                    <form onSubmit={submit}>
                        <div className="flex flex-row justify-between">
                            <div style={{ width: "100%" }} className="mr-8">
                                <InputLabel htmlFor="body" value="Post Body" />
                                <textarea
                                    name="body"
                                    id="body"
                                    value={data.body}
                                    required
                                    style={{ width: "100%" }}
                                    onChange={(e) =>
                                        setData("body", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.body}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="social_account"
                                    value="Social Media Accounts"
                                />
                                <Select
                                    options={options}
                                    isMulti
                                    name="colors"
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={(selectedOptions) => {
                                        setData(
                                            "social_account",
                                            selectedOptions.map(
                                                (option) => option.value
                                            )
                                        );
                                    }}
                                    required
                                />
                                <InputError
                                    message={errors.social_account}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="post_title"
                                    value="Post Title"
                                    className="mt-4"
                                />
                                <TextInput
                                    type="text"
                                    name="post_title"
                                    id="post_title"
                                    value={data.post_title}
                                    required
                                    style={{ width: "100%" }}
                                    onChange={(e) =>
                                        setData("post_title", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.post_title}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="post_date"
                                    value="Post Date"
                                    className="mt-4"
                                />
                                <TextInput
                                    type="datetime-local"
                                    name="post_date"
                                    id="post_date"
                                    value={data.post_date}
                                    required
                                    style={{ width: "100%" }}
                                    onChange={(e) =>
                                        setData("post_date", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.post_date}
                                    className="mt-2"
                                />
                                <InputLabel
                                    htmlFor="image"
                                    value="Upload Image (Optional)"
                                    className="mt-4"
                                />
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    //value={data.image}
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                />
                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex flex-row items-center">
                            <PrimaryButton
                                className=" mr-4"
                                disabled={processing}
                            >
                                Schedule Post
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}

import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import { useForm } from "@inertiajs/react";

export default function PostScheduleItems({ postSchedule, options }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const { data, setData, patch, processing, errors, reset, wasSuccessful } =
        useForm({
            body: postSchedule.body,
            social_account: postSchedule.social_account.map(
                (account) => account.id
            ),
            post_title: postSchedule.title,
            post_date: postSchedule.post_date,
            image: postSchedule.image,
        });
    console.log(data.social_account);
    const submit = (e) => {
        e.preventDefault();

        patch(route("dashboard.update", postSchedule.id));
    };
    return (
        <div className="flex  items-center justify-between border-b-2 mb-2">
            <div>
                <h1>{postSchedule.title}</h1>
                <p>{new Date(postSchedule.post_date).toLocaleString()}</p>
            </div>
            <div>
                <SecondaryButton className="mr-2">
                    Post Moderation
                </SecondaryButton>
                <PrimaryButton
                    onClick={() => {
                        setShowEditModal(true);
                    }}
                >
                    Edit
                </PrimaryButton>
            </div>
            <Modal show={showEditModal} maxWidth="2xl">
                <div className="p-8" style={{ height: "100%" }}>
                    <div>
                        <div className="flex flex-row justify-between mb-2">
                            <h1 className="text-3xl font-black">Post</h1>
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                }}
                            >
                                X
                            </button>
                        </div>
                        <form onSubmit={submit}>
                            <div className="flex flex-row justify-between">
                                <div style={{ width: "100%" }} className="mr-8">
                                    <InputLabel
                                        htmlFor="body"
                                        value="Post Body"
                                    />
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
                                        defaultValue={postSchedule.social_account.map(
                                            (account) => ({
                                                value: account.id,
                                                label:
                                                    account.social_media_type +
                                                    " - " +
                                                    account.social_media_name,
                                            })
                                        )}
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
                                            setData(
                                                "post_title",
                                                e.target.value
                                            )
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
                                Update Post Schedule
                            </PrimaryButton>
                            {wasSuccessful && (
                                <p className="text-green-500">Post Update Successful!</p>
                            )}
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

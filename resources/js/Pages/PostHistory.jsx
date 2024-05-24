import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import NewPostModal from "@/Components/NewPostModal";
import PostScheduleItems from "@/Components/PostScheduleItems";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";

export default function PostHistory({ auth, postSchedules, socialAccounts }) {
    const [showModal, setShowModal] = useState(false);
    const options = socialAccounts.map((account) => ({
        value: account.id,
        label: account.social_media_type + " - " + account.social_media_name,
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-12 flex flex-row justify-between">
                <div style={{ width: "100%" }} className="mr-40">
                    <h1 className="text-5xl font-black mb-4">
                        Posted Scheduled Posts
                    </h1>
                    {Object.keys(postSchedules).length === 0 ? (
                        <h2 className="text-xl text-gray-500">
                            No scheduled posts posted yet! Schedule some posts.
                        </h2>
                    ) : (
                        postSchedules.map((postSchedule) => (
                            <PostScheduleItems
                                key={postSchedule.id}
                                postSchedule={postSchedule}
                                options={options}
                                posted={true}
                            />
                        ))
                    )}
                </div>

                <div>
                    <Calendar />
                </div>
            </div>

            {/* <Modal show={showModal} maxWidth="2xl">
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
                            <PrimaryButton
                                className="mt-4"
                                disabled={processing}
                            >
                                Schedule Post
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </Modal> */}
        </AuthenticatedLayout>
    );
}

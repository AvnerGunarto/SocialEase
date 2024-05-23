import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PostScheduleItems from "@/Components/PostScheduleItems";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";

export default function Dashboard({ auth, postSchedules }) {
    const [showModal, setShowModal] = useState(false);
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
                        Scheduled Posts
                    </h1>
                    {Object.keys(postSchedules).length === 0 ? (
                        <h2 className="text-xl text-gray-500">
                            Looks like you don't have any posts scheduled yet.
                            Add some!
                        </h2>
                    ) : (
                        postSchedules.map((postSchedule) => (
                            <PostScheduleItems
                                key={postSchedule.id}
                                postSchedule={postSchedule}
                            />
                        ))
                    )}
                </div>

                <div>
                    <div className="mb-4 flex justify-end">
                        <PrimaryButton
                            className="mr-2"
                            onClick={() => {
                                setShowModal(true);
                            }}
                        >
                            Add Post
                        </PrimaryButton>
                        <SecondaryButton>Chatbot Settings</SecondaryButton>
                    </div>
                    <Calendar />
                </div>
            </div>
            <Modal show={showModal} maxWidth="2xl" >
                <div className="p-8" style={{height:"100%"}}>
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
                        <div className="flex flex-row justify-between">
                            <div style={{width:"100%"}} className="mr-8">
                                <InputLabel htmlFor="body" value="Post Body" />
                                <textarea name="body" id="body" required />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="social_account"
                                    value="Social Media Accounts"
                                />
                                <Select
                                    options={[
                                        { value: "aahaaa", label: "yanto" },
                                        { value: "aaha", label: "yanto2" },
                                        { value: "aahaa", label: "yanto3" },
                                    ]}
                                    isMulti
                                    name="colors"
                                    className="basic-multi-select"
                                    classNamePrefix="select"
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
                                    required
                                    style={{width:"100%"}}
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
                                    style={{width:"100%"}}
                                />
                                <InputLabel
                                    htmlFor="image"
                                    value="Upload Image (Optional)"
                                    className="mt-4"
                                />
                                <input type="file" name="image" id="image" />
                            </div>
                        </div>
                    </div>
                    <PrimaryButton className="mt-4">
                        Schedule Post
                    </PrimaryButton>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

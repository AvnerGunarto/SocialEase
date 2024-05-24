import { useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useState } from "react";
import { ImTumblr2 } from "react-icons/im";
import DangerButton from "@/Components/DangerButton";
import SocialAccounts from "@/Components/SocialAccounts";

export default function UpdateAPIKeys({ className = "", socialMedia }) {
    const [showAddSocialMedia, setShowAddSocialMedia] = useState(false);

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Social Media Accounts
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Add or remove your social media accounts.
                </p>
                <p className="text-sm text-gray-600">
                    Currently, we support Tumblr.
                </p>
            </header>

            <div className="mt-6 space-y-6">
                <PrimaryButton
                    onClick={() => {
                        setShowAddSocialMedia(!showAddSocialMedia);
                    }}
                >
                    Add new Social Media
                </PrimaryButton>
            </div>

            {showAddSocialMedia && (
                <div className="mt-4 space-y-4">
                    <a href="/profile/tumblr">
                        <PrimaryButton
                            style={{ backgroundColor: "#001935" }}
                            onClick={() => {}}
                        >
                            <ImTumblr2 className="mr-2" /> Tumblr
                        </PrimaryButton>
                    </a>
                </div>
            )}
            <div className="mt-6 space-y-6">
            <h3 className="font-black">List of Linked Social Accounts</h3>
                {socialMedia.map((media) => (
                    <SocialAccounts key={media.id} media={media}  />
                ))}
                {/* <table className="table-auto min-w-full text-center">
                    <tr className="border-b-2 mb-2">
                        <th>Social Media</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    {socialMedia.map((media) => (
                        <SocialAccounts key={media.id} media={media} />
                    ))}
                </table> */}
            </div>
        </section>
    );
}

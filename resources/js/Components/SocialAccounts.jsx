import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import DangerButton from "./DangerButton";
import SecondaryButton from "./SecondaryButton";
import { useForm } from "@inertiajs/react";
import TextInput from "./TextInput";
import InputError from "./InputError";

export default function SocialAccounts({ media }) {
    const [edit, setEdit] = useState(false);
    const { data, setData, patch, processing, errors, reset, wasSuccessful } =
        useForm({
            social_media_name: media.social_media_name,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("socialAccount.update", media.id), {onSuccess: () => setEdit(false)});

    };
    return (
        <><InputError message={errors.social_media_name} /><form
            onSubmit={submit}
            className="flex flex-row justify-between border-b-2 pb-2 items-center"
        >
            <h4 className="font-bold">{media.social_media_type}</h4>

            {edit ? (
                <TextInput
                    type="text"
                    value={data.social_media_name}
                    onChange={(e) => setData("social_media_name", e.target.value)} />
            ) : (
                <h3>{media.social_media_name}</h3>
            )}

            <div>
                {edit ? (
                    <>
                        <PrimaryButton className="mr-2" disabled={processing}>
                            Save
                        </PrimaryButton>
                        <SecondaryButton onClick={() => setEdit(!edit)}>
                            Cancel
                        </SecondaryButton>
                    </>
                ) : (
                    <>
                        <SecondaryButton
                            className="mr-2"
                            onClick={() => setEdit(!edit)}
                        >
                            Edit Name
                        </SecondaryButton>
                        <DangerButton
                            href={route("socialAccount.destroy", media.id)}
                        >
                            Delete
                        </DangerButton>
                    </>
                )}
            </div>

        </form></>
    );
}

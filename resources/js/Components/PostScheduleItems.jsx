import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function PostScheduleItems({ postSchedule }) {
    return (
        <div className="flex  items-center justify-between border-b-2 mb-2">
            <div>
                <h1>{postSchedule.title}</h1>
                <p>{postSchedule.post_date}</p>
            </div>
            <div>
                <SecondaryButton className="mr-2">Post Moderation</SecondaryButton>
                <PrimaryButton>Edit</PrimaryButton>
            </div>
        </div>
    );
}

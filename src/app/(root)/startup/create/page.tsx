import CreateStartupForm from "@/components/create-startup-form"
import { auth } from "../../../../../auth"
import { redirect } from "next/navigation";

const CreateStartup = async () => {
    const session = await auth();

    if (!session) redirect("/")
    return <>
    <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit Pitch</h1>
    </section>
        <CreateStartupForm />
    </>
}

export default CreateStartup
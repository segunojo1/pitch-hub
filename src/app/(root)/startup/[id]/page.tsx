import { client } from "@/sanity/lib/client"
import { STARTUP_BY_ID_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries"

const StartupPage = async ({ params }: { params: Promise<{ id: string }>}) => {
    const id = (await params).id
    const { data: post } = await client.fetch(STARTUP_BY_ID_QUERY)
    return (
        <div>
            <h1 className="text-3xl">Startup: {id}</h1>
        </div>
    )
}

export default StartupPage
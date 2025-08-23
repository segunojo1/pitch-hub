import { z } from "zod"
export const formSchema = z.object( {
    title: z.string().min(3).max(100),
    description: z.string().min(10).max(600),
    category: z.string().min(1).max(100),
    link: z.url().refine( async (url) => {
        try {
            const result = await fetch(url, {method: "HEAD"})
            const contentType = result.headers.get("content-type");

            return contentType?.startsWith("image/")
        } catch {
            return false
        }
    })
})
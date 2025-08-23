"use client"

import { useActionState, useState } from "react"
import { Textarea } from "./ui/textarea"
import MDEditor from "@uiw/react-md-editor"
import { Button } from "./ui/button"
import { Send } from "lucide-react"
import { Description } from "@radix-ui/react-toast"
import { formSchema } from "@/lib/validation"
import z, { treeifyError } from "zod"
import { useToast } from "@/hooks/use-toast"
import { submitStartup } from "@/lib/actions"
import { useRouter } from "next/navigation"

const CreateStartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("")
    const {toast} = useToast();
    const router = useRouter();
    const handleSubmit = async (prevData: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch
            }

            await formSchema.parseAsync(formValues);
            console.log(formValues);
            
            const startup = await submitStartup(prevData, formData, pitch)
            console.log(startup);

            if(startup.status == "SUCCESS") {
                toast({
                    title: "Success",
                    description: "Your startup pitch has been created"
                })

                router.push(`/startup/${startup._id}`)     
            }
              
        } catch (error) {        
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors

                setErrors(fieldErrors as unknown as Record<string, string>)
                toast({
                    title: "Error",
                    description: "Check your inputs and try again!",
                    variant: "destructive"
                })
                return {...prevData, error: "Validation failed", status: "ERROR"}
            }

            toast({
                title: "Error",
                description: "An unexpected error has occured",
                variant: "destructive"
            })

            return {
                ...prevData, error: "An unexpected error has occured", status: "ERROR"
            }
        }
    }

    const [state, formAction, isPending] = useActionState(handleSubmit, {
        error: "",
        status: "INITIAL"
    });
return (
    <form action={formAction} className="startup-form">
        <div>  
            <label htmlFor="title" className="startup-form_label">Title</label>
            <input id="title" name="title" className="startup-form_input" required placeholder="Startup title" />
            {errors.title && <p className="startup-form_error">{errors.title}</p>}
        </div>
        <div> 
            <label htmlFor="description " className="startup-form_label">Description</label>
            <Textarea id="description" name="description" className="startup-form_input" required placeholder="Startup title" />
            {errors.description && <p className="startup-form_error">{errors.description}</p>}
        </div>
        <div> 
            <label htmlFor="category" className="startup-form_label">Category</label>
            <input id="category" name="category" className="startup-form_input" required placeholder="Startup Category" />
            {errors.category && <p className="startup-form_error">{errors.title}</p>}
        </div>
        <div> 
            <label htmlFor="link" className="startup-form_label">Image URL</label>
            <input id="link" name="link" className="startup-form_input" required placeholder="Startup image Url" />
            {errors.link && <p className="startup-form_error">{errors.link}</p>}
        </div>
        <div data-color-mode="light"> 
            <label htmlFor="pitch" className="startup-form_label">Pitch</label>
            <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value as string)}
            id="pitch"
            preview="edit"
            height={300}
            style={{ borderRadius: 20, overflow: "hidden"}}
            textareaProps={{
                placeholder:
                "briefly describe your project/startup idea"
            }}
            previewOptions={{
                disallowedElements: ["style"]
            }}
            />
            {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
        </div>

        <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
            <Send className="size-6 ml-2"/>
        </Button>
    </form>
)        
}
export default CreateStartupForm
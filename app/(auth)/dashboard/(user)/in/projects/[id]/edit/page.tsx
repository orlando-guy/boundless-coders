import { fetchProjectById } from "@/app/lib/data";
import EditProjectForm from "@/app/ui/projects/edit-form";
import { notFound } from "next/navigation";

export default async function EditPage({
    params
}: Readonly<{
    params: { id: string }
}>) {

    const project = await fetchProjectById(params.id)

    if (!project) {
        notFound()
    }

    return (
        <div className="dashboard-responsive">
            <EditProjectForm project={project} />
        </div>
    )
}
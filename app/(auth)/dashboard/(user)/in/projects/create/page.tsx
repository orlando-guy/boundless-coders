import { fetchTags } from "@/app/lib/data";
import CreateProjectForm from "@/app/ui/projects/create-form"

export default async function CreateProjectPage() {
    const tags = await fetchTags()
    
    return (
        <div className="dashboard-responsive">
            <CreateProjectForm tags={tags} />
        </div>
    )
}
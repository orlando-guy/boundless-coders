import { countProjects, fetchProjectsTags, filterProjectByTagAndPage } from '@/app/lib/data';
import { ProjectContentFrames } from '@/app/ui/projects/project-content-frames';

export default async function ContributionsPage({
    searchParams
}: Readonly<{
    searchParams?: {
        page?: string,
        topic?: string
    }
}>) {

    const currentPage = (searchParams?.page && searchParams?.page !== "0") ? Number(searchParams.page) : 1
    const topic = searchParams?.topic ?? ''
    const projects = await filterProjectByTagAndPage(currentPage, topic)
    const [tags, totalProjects] = await Promise.all([
        fetchProjectsTags(),
        countProjects(topic)
    ])
    
    return (
        <section className='py-6'>
            <ProjectContentFrames
                projects={projects}
                tags={tags}
                totalProjects={totalProjects}
            />
        </section>
    )
}
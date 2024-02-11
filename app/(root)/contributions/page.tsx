import { countProjects, fetchProjectsTags, fetchProjectsWithTags } from '@/app/lib/data';
import { ProjectContentFrames } from '@/app/ui/projects/project-content-frames';

export default async function Repository() {
    const projects = await fetchProjectsWithTags()
    const tags = await fetchProjectsTags()
    const totalProjects = await countProjects()

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
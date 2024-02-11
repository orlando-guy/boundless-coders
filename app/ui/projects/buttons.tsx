'use client'

import { deleteProject } from '@/app/lib/actions'
import { Edit, TrashCan } from '@carbon/icons-react'
import { Button } from '@carbon/react'
import Link from 'next/link'

const UpdateProjectButton = ({ projectId }: Readonly<{ projectId: string }>) => {
    return (
        <Link
            href={`/dashboard/in/projects/${projectId}/edit`}
            passHref
        >
            <Button
                hasIconOnly
                iconDescription="Modifier"
                renderIcon={Edit}
                kind="ghost"
            />
        </Link>
    )
}

const DeleteProjectButton = ({ projectId }: Readonly<{ projectId: string }>) => {

    const deleteProjectWithId = deleteProject.bind(null, projectId)

    return (
        <form action={deleteProjectWithId}>
            <Button
                hasIconOnly
                iconDescription="Supprimer"
                renderIcon={TrashCan}
                kind="ghost"
                type='submit'
            />
        </form>
    )
}

export {
    DeleteProjectButton,
    UpdateProjectButton
}
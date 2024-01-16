'use client'

import { archiveChallenge, deleteChallenge } from '@/app/lib/actions'
import { Box, Edit, TrashCan } from '@carbon/icons-react'
import { Button } from '@carbon/react'
import Link from 'next/link'

const UpdateChallengeButton = ({ id }: Readonly<{ id: string }>) => {
    return (
        <Link
            href={`/dashboard/in/my-challenges/${id}/edit`}
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

const DeleteChallengeButton = ({ id }: Readonly<{ id: string }>) => {

    const deleteChallengeWithId = deleteChallenge.bind(null, id)

    return (
        <form action={deleteChallengeWithId}>
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

const ArchiveChallengeButton = ({ id }: Readonly<{ id: string }>) => {
    const archiveChallengeWithId = archiveChallenge.bind(null, id)

    return (
        <form action={archiveChallengeWithId}>
            <Button
                hasIconOnly
                iconDescription="Archiver"
                renderIcon={Box}
                kind="ghost"
                type='submit'
            />
        </form>
    )
}

export {
    UpdateChallengeButton,
    DeleteChallengeButton,
    ArchiveChallengeButton
}

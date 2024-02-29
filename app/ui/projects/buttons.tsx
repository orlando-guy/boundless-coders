'use client'

import { contributeToAProject, deleteProject } from '@/app/lib/actions'
import { Edit, Need, TrashCan } from '@carbon/icons-react'
import { Button, ToastNotification } from '@carbon/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useFormState } from 'react-dom'
import { toast, Toaster } from 'react-hot-toast'

const ContributeButton = ({ 
    projectId,
    projectUrl
 }: Readonly<{
    projectId: string;
    projectUrl: string;
}>) => {

    const initialState = { message: "", success: false }
    const contributeProjectWithId = contributeToAProject.bind(null, projectId)
    const [state, dispatch] = useFormState(contributeProjectWithId, initialState)
    const router = useRouter()
    
    React.useEffect(() => {
        if (state.message !== "") {
            toast((t) => (
                <ToastNotification
                    className='w-full h-full'
                    aria-label="closes notification"
                    kind={state.success ? 'success' : 'error'}
                    onClose={() => toast.remove(t.id)}
                    onCloseButtonClick={() => toast.dismiss(t.id)}
                    role="alert"
                    statusIconDescription="notification"
                    subtitle={state.message}
                    title="Status"
                />
            ), {
                style: {
                    background: "transparent",
                    boxShadow: "none"
                }
            })

            // This means that a new contributor will be redirect to the project's github repo
            if (state.success) router.push(projectUrl)
        }
    }, [state, projectUrl, router])

    return (
        <>
            <form action={dispatch}>
                <Button
                    className="mt-3 mb-7"
                    renderIcon={Need}
                    iconDescription="Contribuez à ce projet"
                    kind="tertiary"
                    type='submit'
                >Contribuez</Button>
            </form>
            <Toaster
                position='bottom-right'
                reverseOrder
            />
        </>
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

export {
    ContributeButton,
    DeleteProjectButton,
    UpdateProjectButton
}
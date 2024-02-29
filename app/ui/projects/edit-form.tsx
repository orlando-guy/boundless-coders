'use client'

import React from 'react'
import { Form, TextInput, TextArea, Button } from '@carbon/react'
import { ViewUpdate } from '@uiw/react-codemirror'
import { useFormState } from 'react-dom'
import MarkdownEditor from '@/app/ui/markdown-editor/markdown-editor'
import { updateProject } from '@/app/lib/actions'
import { useDebouncedCallback } from '@/app/lib/hooks'
import { Project } from '@/app/lib/definitions'

const EditProjectForm = ({
    project
}: Readonly<{
    project: Project
}>) => {
    const [projectContent, setProjectContent] = React.useState(project.description)
    const initialState = { message: "", errors: {} }
    const updateProjectWithId = updateProject.bind(null, project.id)
    const [state, dispatch] = useFormState(updateProjectWithId, initialState)

    const handleChangeChallengeContent = useDebouncedCallback((val: string, viewUpdate: ViewUpdate) => {
        setProjectContent(val)
    }, 500)

    return (
        <Form
            action={dispatch}
            aria-label='form to edit challenge'
        >
            <div className="flex flex-col gap-4">
                <TextInput
                    type='text'
                    id='input-project-title'
                    name='title'
                    defaultValue={project.title}
                    labelText='Le titre du projet'
                    placeholder="Titre"
                    required
                    invalid={!!state.errors?.title}
                    invalidText={state.errors?.title?.join(' ')}
                />
                <TextInput
                    id='input-project-issue-url'
                    name='issueURL'
                    defaultValue={project.issueUrl}
                    labelText='le lien vers le problème'
                    required
                    invalid={!!state.errors?.issueUrl}
                    invalidText={state.errors?.issueUrl?.join(' ')}
                />
                <TextArea
                    rows={4}
                    id='textarea-project-description'
                    name='description'
                    labelText='Description'
                    defaultValue={projectContent}
                    hidden
                    invalid={!!state.errors?.description}
                    invalidText={state.errors?.description?.join(' ')}
                />

                <MarkdownEditor
                    currentValue={projectContent}
                    onChange={handleChangeChallengeContent}
                />
                                
                <Button type='submit'>
                    Modifier
                </Button>
            </div>
        </Form>
    )
}

export default EditProjectForm
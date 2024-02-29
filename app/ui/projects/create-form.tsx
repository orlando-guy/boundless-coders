'use client'

import React from 'react';
import { useFormState } from 'react-dom';
import {
    Form,
    FormGroup,
    Checkbox,
    TextInput,
    TextArea,
    Button,
    InlineNotification
} from '@carbon/react';
import { ViewUpdate } from '@uiw/react-codemirror';
import { useDebouncedCallback } from '@/app/lib/hooks';
import { TagField } from '@/app/lib/definitions';
import MarkdownEditor from '@/app/ui/markdown-editor/markdown-editor';
import { createProject } from '@/app/lib/actions';

const CreateProjectForm = ({
    tags
}: Readonly<{
    tags: TagField[]
}>) => {

    const exampleOfContent = `Ajouter votre description ici...`
    const [projectContent, setProjectContent] = React.useState(exampleOfContent)
    const initialState = { message: "", errors: {} }
    const [state, dispatch] = useFormState(createProject, initialState)

    const handleChangeProjectContent = useDebouncedCallback((val: string, viewUpdate: ViewUpdate) => {
        setProjectContent(val)
    }, 500)

    return (
        <>
            {state?.message && <InlineNotification
                className='mt-2 mb-3'
                hideCloseButton
                kind='error'
                subtitle={state.message}
                statusIconDescription="Échec de l'enregistrement"
                title="Problème: "
            />}
            
            <Form
                action={dispatch}
                aria-label='form to create project'
            >
                <div className="flex flex-col gap-4">
                    <TextInput
                        type='text'
                        id='input-project-title'
                        name='title'
                        labelText='Le titre du projet'
                        placeholder="Titre"
                        required
                        invalid={!!state.errors?.title}
                        invalidText={state.errors?.title?.join(' ')}
                    />

                    <TextInput
                        type='url'
                        id='input-project-issue-url'
                        name='issueURL'
                        labelText='Le lien vers le problème'
                        placeholder="https://github.com/user-name/repo-name/issues/3"
                        required
                        invalid={!!state.errors?.issueUrl}
                        invalidText={state.errors?.issueUrl?.join(' ')}
                    />

                    <TextArea
                        rows={4}
                        id='textarea-project-cotent'
                        name='description'
                        labelText='Rédiger le contenue au format Markdown'
                        value={projectContent}
                        hidden
                        invalid={!!state.errors?.description}
                        invalidText={state.errors?.description?.join(' ')}
                    />

                    <MarkdownEditor
                        currentValue={projectContent}
                        onChange={handleChangeProjectContent}
                    />

                    {(tags && tags.length > 0) && (
                        <FormGroup
                            legendText="Sélectionner le(s) tag(s) lié(s) à ce projet. 3 maximum"
                            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
                        >
                            {tags.map(tag => (
                                <Checkbox
                                    labelText={tag.title}
                                    id={tag.id}
                                    key={tag.id}
                                    name="tag"
                                    value={tag.id}
                                />
                            ))}
                        </FormGroup>
                    )}

                    <Button type='submit'>
                        Enregistrer
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default CreateProjectForm
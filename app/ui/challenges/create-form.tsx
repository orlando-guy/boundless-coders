'use client'

import React from 'react'
import { Form, FormGroup, RadioButtonGroup, Checkbox, TextInput, TextArea, RadioButton, Button } from '@carbon/react'
import MarkdownEditor from '@/app/ui/markdown-editor/markdown-editor'
import { ViewUpdate } from '@uiw/react-codemirror'
import { useFormState } from 'react-dom'
import { useDebouncedCallback } from '@/app/lib/hooks'
import { TagField } from '@/app/lib/definitions'
import { createChallenge } from '@/app/lib/actions'

const CreateChallengeForm = ({
    tags
}: Readonly<{
    tags?: TagField[]
}>) => {
    const exampleOfContent = `# Le titre du défi\n\nEn quoi consiste ce défi.\n\nQuelles sont les apports de ce défi pour les apprenants ?`
    const [challengeContentValue, setChallengeContentValue] = React.useState(exampleOfContent)
    const initialState = { message: "", errors: {} }
    const [state, dispatch] = useFormState(createChallenge, initialState)
    const handleChangeChallengeContent = useDebouncedCallback((val: string, viewUpdate: ViewUpdate) => {
        setChallengeContentValue(val)
    }, 500)

    return (
        <Form
            action={dispatch}
            aria-label='form to create challenge'
        >
            <div className="flex flex-col gap-4">
                <TextInput
                    type='text'
                    id='input-challenge-title'
                    name='title'
                    labelText='Le titre du défi'
                    placeholder="Écrivez votre premier roccourcisseur d'URL"
                    required
                    invalid={!!state.errors?.title}
                    invalidText={state.errors?.title?.join(' ')}
                />
                <TextArea
                    rows={4}
                    id='textarea-challenge-description'
                    name='description'
                    labelText='Description'
                    placeholder="exemple: Ce défit consiste à créer votre propre raccourcisseur d'URL pensez à bit.ly ou à tinyurl.com"
                    required
                    invalid={!!state.errors?.description}
                    invalidText={state.errors?.description?.join(' ')}
                />
                <TextArea
                    rows={4}
                    id='textarea-challenge-cotent'
                    name='content'
                    labelText='Rédiger le contenue au format Markdown'
                    value={challengeContentValue}
                    hidden
                    invalid={!!state.errors?.content}
                    invalidText={state.errors?.content?.join(' ')}
                />

                <MarkdownEditor
                    currentValue={challengeContentValue}
                    onChange={handleChangeChallengeContent}
                />

                {(tags && tags.length > 0) && (
                    <FormGroup
                        legendText="Sélectionner le(s) tag(s) lié(s) à ce défi. 3 au max"
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

                <RadioButtonGroup
                    name='level'
                    legendText="Sélectionner le niveau de difficulter de ce défi"
                    defaultSelected="ENTRY"
                    invalid={!!state.errors?.level}
                    invalidText={state.errors?.level?.join(' ')}
                >
                    <RadioButton
                        value="ENTRY"
                        labelText="Facile"
                    />
                    <RadioButton
                        value="MIDDLE"
                        labelText="Intermédiaire"
                    />
                    <RadioButton
                        value="ADVANCED"
                        labelText="Avancé"
                    />
                </RadioButtonGroup>

                <Button type='submit'>
                    Enregistrer
                </Button>
            </div>
        </Form>
    )
}

export default CreateChallengeForm
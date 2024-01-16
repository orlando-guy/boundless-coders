'use client'

import React from 'react'
import { Form, RadioButtonGroup, TextInput, TextArea, RadioButton, Button } from '@carbon/react'
import { ViewUpdate } from '@uiw/react-codemirror'
import { useFormState } from 'react-dom'
import MarkdownEditor from '@/app/ui/markdown-editor/markdown-editor'
import { updateChallenge } from '@/app/lib/actions'
import { useDebouncedCallback } from '@/app/lib/hooks'
import { ChallengeFields, TagField } from '@/app/lib/definitions'

const EditChallengeForm = ({
    tags,
    challenge
}: Readonly<{
    tags?: TagField[],
    challenge: ChallengeFields
}>) => {
    const [challengeContentValue, setChallengeContentValue] = React.useState(challenge.content)
    const initialState = { message: "", errors: {} }
    const updateChallengeWithId = updateChallenge.bind(null, challenge.id)
    const [state, dispatch] = useFormState(updateChallengeWithId, initialState)

    const handleChangeChallengeContent = useDebouncedCallback((val: string, viewUpdate: ViewUpdate) => {
        setChallengeContentValue(val)
    }, 500)

    // const isDefaultChecked = (id:string) => !!challenge.tags.find(el => el.tagId === id)

    return (
        <Form
            action={dispatch}
            aria-label='form to edit challenge'
        >
            <div className="flex flex-col gap-4">
                <TextInput
                    type='text'
                    id='input-challenge-title'
                    name='title'
                    defaultValue={challenge.title}
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
                    defaultValue={challenge.description}
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
                    labelText='Contenue'
                    defaultValue={challengeContentValue}
                    hidden
                    invalid={!!state.errors?.content}
                    invalidText={state.errors?.content?.join(' ')}
                />

                <MarkdownEditor
                    currentValue={challengeContentValue}
                    onChange={handleChangeChallengeContent}
                />

                <RadioButtonGroup
                    name='level'
                    legendText="Sélectionner le niveau de difficulter de ce défi"
                    defaultSelected={challenge.level}
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

export default EditChallengeForm
'use client'

import React from 'react'
import { Form, FormGroup, RadioButtonGroup, Checkbox, TextInput, TextArea, RadioButton, Button } from '@carbon/react'
import MarkdownEditor from '@/app/ui/markdown-editor/markdown-editor'
import { updateChallenge } from '@/app/lib/actions'
import { ViewUpdate } from '@uiw/react-codemirror'
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
    const handleChangeChallengeContent = useDebouncedCallback((val: string, viewUpdate: ViewUpdate) => {
        setChallengeContentValue(val)
    }, 500)
    const updateChallengeWithId = updateChallenge.bind(null, challenge.id)

    const isDefaultChecked = (id:string) => !!challenge.tags.find(el => el.tagId === id)

    return (
        <Form
            action={updateChallengeWithId}
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
                />
                <TextArea
                    rows={4}
                    id='textarea-challenge-description'
                    name='description'
                    defaultValue={challenge.description}
                    labelText='Description'
                    placeholder="exemple: Ce défit consiste à créer votre propre raccourcisseur d'URL pensez à bit.ly ou à tinyurl.com"
                    required
                />
                <TextArea
                    rows={4}
                    id='textarea-challenge-cotent'
                    name='content'
                    labelText='Contenue'
                    defaultValue={challengeContentValue}
                    hidden
                />

                <MarkdownEditor
                    currentValue={challengeContentValue}
                    onChange={handleChangeChallengeContent}
                />

                <RadioButtonGroup
                    name='level'
                    legendText="Sélectionner le niveau de difficulter de ce défi"
                    defaultSelected={challenge.level}
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
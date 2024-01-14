'use client'
import React from 'react'
import { Form, FormGroup, RadioButtonGroup, Checkbox, TextInput, TextArea, RadioButton, Button } from '@carbon/react'
import MarkdownEditor from '@/app/ui/markdown-editor/markdown-editor'
import { createChallenge } from '@/app/lib/actions'
import { ViewUpdate } from '@uiw/react-codemirror'
import { useDebouncedCallback } from '@/app/lib/hooks'
import { TagField } from '@/app/lib/definitions'

const CreateChallengeForm = ({
    tags
}: Readonly<{
    tags?: TagField[]
}>) => {
    const [challengeContentValue, setChallengeContentValue] = React.useState("# Titre de premier degré  ")
    const handleChangeChallengeContent = useDebouncedCallback((val: string, viewUpdate: ViewUpdate) => {
        setChallengeContentValue(val)
    }, 500)

    return (
        <Form
            action={createChallenge}
            aria-label='form to create challenge'
        >
            <div className="flex flex-col gap-4">
                <TextInput
                    type='text'
                    id='input-challenge-title'
                    name='title'
                    labelText='Le titre du défi'
                    placeholder="Écrivez votre premier roccourcisseur d'URL"
                />
                <TextArea
                    rows={4}
                    id='textarea-challenge-description'
                    name='description'
                    labelText='Description'
                    placeholder="exemple: Ce défit consiste à créer votre propre raccourcisseur d'URL pensez à bit.ly ou à tinyurl.com"
                />
                <TextArea
                    rows={4}
                    id='textarea-challenge-cotent'
                    name='content'
                    labelText='Contenue'
                    value={challengeContentValue}
                    hidden
                />

                <MarkdownEditor
                    currentValue={challengeContentValue}
                    onChange={handleChangeChallengeContent}
                />

                {(tags && tags.length > 0) && (
                    <FormGroup
                        legendText="Sélectionner le(s) tag(s) lié(s) à ce défi"
                        className='flex'
                    >
                        {/* <Checkbox labelText= /> */}
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
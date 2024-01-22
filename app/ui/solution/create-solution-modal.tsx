'use client'

import React from "react"
import { createPortal, useFormState } from "react-dom"
import { Button, Form, Modal, TextInput, Loading, InlineNotification } from "@carbon/react"

import { createChallengeSolution } from "@/app/lib/actions"
import { Upload } from "@carbon/icons-react"
import { useToggle } from "@/app/lib/hooks"


const ModalStateManager = ({
    challengeId
}: Readonly<{ challengeId: string }>) => {
    const [open, setOpenOrClose] = useToggle(false)

    return (
        <>
            <Button
                onClick={setOpenOrClose}
                renderIcon={Upload}
            >
                Poster votre solution
            </Button>

            <CreateSolutionModal
                challengeId={challengeId}
                isOpen={open}
                onClose={setOpenOrClose}
            />
        </>
    )
}

const CreateSolutionModal = ({
    isOpen,
    onClose,
    challengeId
}: Readonly<{
    challengeId: string;
    isOpen: boolean;
    onClose: () => void;
}>) => {
    const initState = { message: "", success: false, errors: {} }
    const createChallengeSolutionWithId = createChallengeSolution.bind(null, challengeId)
    const [state, dispatch] = useFormState(createChallengeSolutionWithId, initState)
    const [clientDOM, setClientDOM] = React.useState<Document | null>(null)

    React.useEffect(() => {
        if (document) {
            setClientDOM(document)
        }
    }, [])


    const handleClose = () => {
        state.errors = {}
        onClose()
    }

    const portalTarget = clientDOM ? clientDOM.body : null

    if (!portalTarget) {
        // Do nothing on the server
        return <></>
    }

    return createPortal(
        <Modal
            modalHeading="Poster votre solution"
            primaryButtonText="Ajouter"
            secondaryButtonText="Annuler"
            open={isOpen}
            onRequestClose={handleClose}
            onRequestSubmit={() => {
                if (document) {
                    const form = document
                        .querySelector<HTMLFormElement>('#form-create-solution')

                    if (form) {
                        form.requestSubmit()
                    }
                }
            }}
        >
            <p className="mt-4">
                Si vous pensez que votre solution est un exemple dont d'autres
                développeurs peuvent s'inspirer, merci de la partagez avec les
                autres via le champ de texte ci-dessous.
            </p>

            <Form action={dispatch} id="form-create-solution">
                <TextInput
                    data-modal-primary-focus
                    id="repo-url"
                    labelText="l'URL du dépot"
                    placeholder="Par exemple https://github.com/orlando-guy/boundless-coders"
                    className="mt-4"
                    name="repoUrl"
                    invalid={!!state?.errors?.repoUrl}
                    invalidText={state?.errors?.repoUrl?.join(' ')}
                />
            </Form>

            {(state?.success || state?.message ) && <InlineNotification
                aria-label="Fermer la notification"
                kind={state?.success ? "success" : "error"}
                statusIconDescription={state?.success ? "Réussite" : "Échec"}
                subtitle={state?.message}
                title="Statut de l'enregistrement"
                className="mt-2"
            />}
        </Modal>,
        portalTarget
    )
}

export {
    ModalStateManager,
    CreateSolutionModal
}
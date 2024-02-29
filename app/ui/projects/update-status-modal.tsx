'use client'

import React from 'react';
import { createPortal, useFormState } from 'react-dom';
import {
    Form,
    InlineNotification,
    Modal,
    Select,
    SelectItem,
    TextInput
} from "@carbon/react";
import { ProjectWithContributors } from '@/app/lib/definitions';
import { closeProject } from '@/app/lib/actions';
import Link from 'next/link';

const UpdateProjectStatusModal = ({
    project,
    isOpen,
    onClose,
}: Readonly<{
    project: ProjectWithContributors;
    isOpen: boolean;
    onClose: () => void;
}>) => {
    const initialState = { message: "", errors: {}, success: false }
    const [clientDOM, setClientDOM] = React.useState<Document | null>(null)
    const closeProjectWithItsId = closeProject.bind(null, project.id)
    const [state, dispatch] = useFormState(closeProjectWithItsId, initialState)

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
            modalHeading="Clôturer votre problème"
            primaryButtonText="Clôturer"
            secondaryButtonText="Annuler"
            open={isOpen}
            onRequestClose={handleClose}
            onRequestSubmit={() => {
                if (document) {
                    const form = document
                        .querySelector<HTMLFormElement>('#form-close-project')

                    if (form) {
                        form.requestSubmit()
                    }
                }
            }}
        >
            <p className="mt-4">
                En marquant votre problème comme étant clôture,
                vous indiquez aux autres développeurs que vous n'avez
                plus besoin d'aide.
                <br />
                Cependant votre problème continuera d'apparaître dans le 
                menu <Link href="/contributions">Les contributions</Link> {' '}
                "contribuer" n'apparaîtra plus comme <strong>CTA </strong> sur votre 
                problème à la place il y'aura "Voir la solution".
            </p>

            <Form action={dispatch} id="form-close-project" className="mt-3">
                <Select
                    id='select-person'
                    labelText="Sélectionner parmis ces contributeurs celui qui vous a aidez à régler le problème"
                    name='contributor'
                    required
                    invalid={!!state?.errors?.contributor}
                    invalidText={state?.errors?.contributor?.toString()}
                >
                    <SelectItem value="" text="" />
                    {project.contributions.map(item => (
                        <SelectItem
                            key={item.contributor.name}
                            value={item.contributor.name ?? ""}
                            text={item.contributor.name ?? ""}
                        />
                    ))}
                </Select>

                <TextInput
                    className="mt-4"
                    data-modal-primary-focus
                    helperText="En ajoutant l'URL de la solution vous permettrez aux autres développeurs de voir comment le contributeur s'y est prit pour résoudre votre problème"
                    id="solution-url"
                    labelText="l'URL de la solution"
                    name="solutionURL"
                    placeholder="Par exemple https://github.com/user-name/repo-name/pull/338/files"
                    required
                    type='url'
                    invalid={!!state?.errors?.solutionUrl}
                    invalidText={state?.errors?.solutionUrl?.join(' ')}
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

export default UpdateProjectStatusModal;
import { deleteSolution } from "@/app/lib/actions";
import { TrashCan } from "@carbon/icons-react";
import { Button } from "@carbon/react";

const DeleteSolutionButton = ({
    solutionId
}: Readonly<{
    solutionId: string;
}>) => {
    const deleteSolutionWithId = deleteSolution.bind(null, solutionId)

    return (
        <form action={deleteSolutionWithId}>
            <Button
                type="submit"
                kind="ghost"
                renderIcon={TrashCan}
                iconDescription="Supprimer"
                hasIconOnly
            />
        </form>
    )
}

export {
    DeleteSolutionButton
}
import { FaceVeryDissatisfied } from "@carbon/pictograms-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="notfound vh-full relative">
            <div className="notfound-content absolute absolute--center">
                <div className="notfound-404">
                    <FaceVeryDissatisfied />
                </div>
                <h1>404</h1>
                <h2>Oops ! Cette page est introuvable</h2>
                <p>
                    Désolé mais la page que vous essayez d'accédé n'existe pas.
                    Elle à peut-être été retirer, son nom à peut-être changer ou elle est temporairement indisponnible.
                </p>
                <Link href='/dashboard/in/my-challenges' className="text-decoration-none">
                    Retourner en arrière
                </Link>
            </div>
        </div>
    )
}
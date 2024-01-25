import { Dashboard, /* List, */ IbmCloudProjects, Need, Development } from '@carbon/icons-react'
import { Session } from 'next-auth';
import Link from 'next/link'

export default function SideBar({
    className,
    session
}: Readonly<{
    className?: string;
    session?: Session | null;
}>) {
    const challengeManagers = ['ADMIN', 'CHALLENGE_MANAGER']

    return (
        <nav className={`left-sidebar-wrapper ${className ?? ''}`}>
            <div className='left-sidebar'>
                <ul className="left-sidebar__menu-items">
                    <li className="left-sidebar__menu-item">
                        <Link href="/dashboard/in">
                            <Dashboard />
                            <span>Tableau de bord</span>
                        </Link>
                    </li>
                    <li className="left-sidebar__menu-item">
                        <Link href="/dashboard/in/contributions">
                            <Need />
                            <span>Mes contributions</span>
                        </Link>
                    </li>
                    <li className="left-sidebar__menu-item">
                        <Link href="/">
                            <IbmCloudProjects />
                            <span>Mes projets</span>
                        </Link>
                    </li>
                    {(session && challengeManagers.includes(session.user.role))
                        && (<li className="left-sidebar__menu-item">
                            <Link href="/dashboard/in/my-challenges">
                                <Development />
                                <span>Mes challenges</span>
                            </Link>
                        </li>)
                    }
                </ul>
            </div>
        </nav>
    )
}
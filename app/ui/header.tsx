import {
    Header,
    HeaderContainer,
    HeaderName,
    HeaderNavigation,
    HeaderMenuButton,
    HeaderMenuItem,
    SkipToContent,
    SideNav,
    SideNavItems,
    HeaderSideNavItems,
    Button,
} from '@carbon/react'
import { UserAvatar, LogoGithub} from '@carbon/icons-react'
import Link from 'next/link'
import { Session } from 'next-auth'
import { LoggedInUserPopover } from './popover/popover'

const HeaderNavbar = ({
    session
}: Readonly<{
    session?: Session | null
}>) => {

    return (
        <HeaderContainer
            render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                <Header arial-labelledby="Carbon Navbar" className="max-vw-full">
                    <SkipToContent />
                    <HeaderMenuButton
                        aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
                        onClick={onClickSideNavExpand}
                        isActive={isSideNavExpanded}
                        aria-expanded={isSideNavExpanded}
                    />
                    <Link href='/' passHref legacyBehavior>
                        <HeaderName prefix=' '>
                            BOUNDLESS CODERS
                        </HeaderName>
                    </Link>
                    <HeaderNavigation aria-label='Carbon header'>
                        <Link href="/contributions" passHref legacyBehavior>
                            <HeaderMenuItem>Les contributions</HeaderMenuItem>
                        </Link>
                        <Link href="/challenges" passHref legacyBehavior>
                            <HeaderMenuItem>Les défis de codage</HeaderMenuItem>
                        </Link>
                    </HeaderNavigation>
                    <SideNav
                        aria-label="Side navigation"
                        expanded={isSideNavExpanded}
                        isPersistent={false}
                    >
                        <SideNavItems>
                            {isSideNavExpanded && (
                                <HeaderSideNavItems>
                                    <Link href="/repos" passHref legacyBehavior>
                                        <HeaderMenuItem>Les contributions</HeaderMenuItem>
                                    </Link>
                                    <Link href="/challenges" passHref legacyBehavior>
                                        <HeaderMenuItem>Les défis de codage</HeaderMenuItem>
                                    </Link>
                                    {session && (
                                        <>
                                            <Link href="/dashboard/in" passHref legacyBehavior>
                                                <HeaderMenuItem>
                                                    Tableau de bord
                                                </HeaderMenuItem>
                                            </Link>
                                            <Link href="/dashboard/in/contributions" passHref legacyBehavior>
                                                <HeaderMenuItem>
                                                    Mes contributions
                                                </HeaderMenuItem>
                                            </Link>
                                            <Link href="/dashboard/in/projects" passHref legacyBehavior>
                                                <HeaderMenuItem>
                                                    Mes projets
                                                </HeaderMenuItem>
                                            </Link>
                                            <Link href="/dashboard/in/my-challenges" passHref legacyBehavior>
                                                <HeaderMenuItem>
                                                    Mes challenges
                                                </HeaderMenuItem>
                                            </Link>
                                        </>
                                    )}
                                </HeaderSideNavItems>
                            )}
                        </SideNavItems>
                    </SideNav>
                    <div className="flex flex-1 justify-end block-size-100">
                        <Button
                            hasIconOnly
                            iconDescription='Le dépot Github'
                            href='https://github.com/orlando-guy/boundless-coders'
                            renderIcon={() => <LogoGithub size={20} />}
                            kind="ghost"
                        />
                        {session ? (
                            <LoggedInUserPopover
                                userName={session.user?.name}
                                userPicture={session.user?.image}
                            />
                        ) : (
                            <Link href="/sign-in" passHref>
                                <Button
                                    hasIconOnly
                                    iconDescription='Le dépot Github'
                                    renderIcon={() => <UserAvatar size={20} />}
                                    kind="ghost"
                                />
                            </Link>
                        )}
                    </div>
                </Header>
            )}
        />
    )
}

export default HeaderNavbar;
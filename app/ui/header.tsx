import {
    Header,
    HeaderContainer,
    HeaderName,
    HeaderNavigation,
    HeaderMenuButton,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SkipToContent,
    SideNav,
    SideNavItems,
    HeaderSideNavItems,
} from '@carbon/react'
import { UserAvatar, LogoGithub } from '@carbon/icons-react'
import Link from 'next/link'


const HeaderNavbar = () => {
    return (
        <HeaderContainer
            render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                <Header arial-labelledby="Carbon Navbar" className="max-vw-full">
                    <SkipToContent />
                    <HeaderMenuButton
                        aria-label='Open menu'
                        onClick={onClickSideNavExpand}
                        isActive={isSideNavExpanded}
                    />
                    <Link href='/' passHref legacyBehavior>
                        <HeaderName href='/' prefix=' '>
                            BOUNDLESS CODERS
                        </HeaderName>
                    </Link>
                    <HeaderNavigation aria-label='Carbon header'>
                        <Link href="/repos" passHref legacyBehavior>
                            <HeaderMenuItem href="/repos">Les contributions</HeaderMenuItem>
                        </Link>
                        <Link href="/challenges" passHref legacyBehavior>
                            <HeaderMenuItem href="/challenges">Les défis de codage</HeaderMenuItem>
                        </Link>
                    </HeaderNavigation>
                    <SideNav
                        aria-label="Side navigation"
                        expanded={isSideNavExpanded}
                        isPersistent={false}
                    >
                        <SideNavItems>
                            <HeaderSideNavItems>
                                <Link href="/repos" passHref legacyBehavior>
                                    <HeaderMenuItem href="/repos">Les contributions</HeaderMenuItem>
                                </Link>
                                <Link href="/" passHref legacyBehavior>
                                    <HeaderMenuItem href="/">Les défis de codage</HeaderMenuItem>
                                </Link>
                            </HeaderSideNavItems>
                        </SideNavItems>
                    </SideNav>
                    <HeaderGlobalBar>
                        <HeaderGlobalAction aria-label="Voir le projet" tooltipAlignment="center">
                            <a href="https://github.com/orlando-guy/boundless-coders" target='_blank'>
                                <LogoGithub size={20} />
                            </a>
                        </HeaderGlobalAction>
                        <HeaderGlobalAction aria-label="Avatar de l'utilisateur" tooltipAlignment="center">
                            <UserAvatar size={20} />
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>
                </Header>
            )}
        />
    )
}

export default HeaderNavbar;
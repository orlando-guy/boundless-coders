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
import { Switcher, Notification, UserAvatar } from '@carbon/icons-react'
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
                            <HeaderMenuItem href="/repos">Repositories</HeaderMenuItem>
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
                                    <HeaderMenuItem href="/repos">Repositories</HeaderMenuItem>
                                </Link>
                            </HeaderSideNavItems>
                        </SideNavItems>
                    </SideNav>
                    <HeaderGlobalBar>
                        <HeaderGlobalAction aria-label="Notification" tooltipAlignment="center">
                            <Notification size={20} />
                        </HeaderGlobalAction>
                        <HeaderGlobalAction aria-label="User Avatar" tooltipAlignment="center">
                            <UserAvatar size={20} />
                        </HeaderGlobalAction>
                        <HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="end">
                            <Switcher size={20} />
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>
                </Header>
            )}
        />
    )
}

export default HeaderNavbar;
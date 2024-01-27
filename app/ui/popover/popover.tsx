'use client'

import React from 'react'
import { Button, Popover, PopoverContent } from "@carbon/react"
import { Settings, UserAvatar, ArrowRight } from '@carbon/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const BasePopover = ({
    children,
    buttonIcon,
    className,
    buttonClassName,
    contentClassName
}: Readonly<{
    children: React.ReactNode;
    buttonIcon?: React.ReactNode;
    className?: string;
    buttonClassName?: string;
    contentClassName?: string;
}>) => {
    const [open, setOpen] = React.useState(false)
    buttonIcon ||= <Settings size={20} />

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.code === 'Escape') {
            setOpen(false);
        }
    }

    return (
        <Popover
            open={open}
            align="bottom-right"
            onKeyDown={handleKeyDown}
            isTabTip
            onRequestClose={() => setOpen(false)}
            className={`${className ?? ''}`}
        >
            <button
                aria-label='user'
                type='button'
                onClick={() => setOpen(v => !v)}
                className={`${buttonClassName ?? ''}`}
            >
                {buttonIcon}
            </button>
            <PopoverContent className={`${contentClassName ?? ''}`}>
                {children}
            </PopoverContent>
        </Popover>
    )
}

const LoggedInUserPopover = ({
    userName,
    userPicture
}: Readonly<{
    userName?: string | null;
    userPicture?: string | null;
}>) => {
    return (
        <BasePopover
            buttonIcon={<UserAvatar size={20} />}
            className='liup-switcher'
            buttonClassName='liup-switcher-button'
            contentClassName='liup-switcher-content'
        >
            <ul
                className='liup-switcher__menu'
                aria-label='profile menu'
            >
                <li className='liup-switcher__menu-item user-profile'>
                    <div className="user-profile__info">
                        <p>{userName ?? ''}</p>
                    </div>
                    <div className="user-profile__image">
                        {userPicture ? (
                            <Image
                                src={userPicture}
                                width={56}
                                height={56}
                                alt='user profile picture'
                            />
                        ) : (
                            <UserAvatar size={56} />
                        )}
                    </div>
                </li>

                <li className='liup-switcher__menu-item'>
                    <div className='flex flex-col'>
                        <Link className='text-decoration-none' href="/dashboard/in">Tableau de bord</Link>
                    </div>
                </li>

                <li className='liup-switcher__menu-item logout-item p-0'>
                    <Button
                        onClick={() => signOut()}
                        className='w-full'
                        renderIcon={ArrowRight}
                        kind='secondary'
                    >
                        Déconnexion
                    </Button>
                </li>
            </ul>
        </BasePopover>
    )
}

export {
    LoggedInUserPopover
}
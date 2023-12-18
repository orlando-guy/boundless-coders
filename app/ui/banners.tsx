'use client'

import { Breadcrumb, BreadcrumbItem } from "@carbon/react"
import { usePathname } from "next/navigation"
import { parseSlug } from "../lib/utils"
import Link from "next/link"

const BannerWithBreadCrumbs = (
    { subtitle, title }
        : Readonly<{ subtitle?: string, title?: string }>
) => {
    const pathname = parseSlug(usePathname())
    const heading = pathname.pop()?.replaceAll('-', ' ')

    return (
        <div className="landing-page__banner px-10">
            <Breadcrumb noTrailingSlash>
                <BreadcrumbItem>
                    <Link href="/">Accueil</Link>
                </BreadcrumbItem>
                {pathname.map(slug => (
                    <BreadcrumbItem key={slug}>
                        <Link href={`/${slug}`}>{slug}</Link>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
            <div className="landing-page__heading">
                <h1>{title ?? heading}</h1>
                {subtitle && (<p>{subtitle}</p>)}
            </div>
        </div >
    )
}

export {
    BannerWithBreadCrumbs
}
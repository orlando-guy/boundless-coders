import { LogoGithub, LogoLinkedin } from "@carbon/icons-react";
import { Select, SelectItem, Grid, Column, Link as CarbonLink, Button } from "@carbon/react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="w-100">
                <Grid className="gap-2 footer__grid-1">
                    <Column sm={16} md={8} lg={12} className="footer__r1">
                        <Link href='/' className="footer__logo">
                            BOUNDLESS CODERS
                        </Link>
                    </Column>
                    <Column sm={16} md={8} lg={4} className="footer__r2">
                        <Select
                            id={`select-app-language`}
                            labelText="Langue"
                            helperText="Changez la langue"
                            disabled
                            size="lg"
                        >
                            <SelectItem value="french" text="Français" />
                        </Select>
                    </Column>
                </Grid>
            </div>
            <div className="w-100 footer__menu-groups">
                <Grid>
                    {/* Here's come other footer menu groups */}
                    <Column sm={4} className="py-2">
                        <div className="flex flex-col">
                            <h5 className="heading-01">Suivre BOUNDLESS CODERS</h5>
                            <ul className="list-unstyle mt-2">
                                <li>
                                    <CarbonLink
                                        href="https://github.com/orlando-guy/boundless-coders"
                                        className="text-white-20"
                                        target="_blank"
                                    >GitHub</CarbonLink>
                                </li>
                                <li className="text-white-20 mt-1">LinkedIn</li>
                            </ul>
                        </div>
                    </Column>
                    <Column sm={4} className="py-2">
                        <div className="flex flex-col">
                            <h5 className="heading-01">Le projet</h5>
                            <ul className="list-unstyle mt-2">
                                <li>
                                    Développer par {' '}
                                    <CarbonLink
                                        href="https://my-portfolio-orlando-guy.vercel.app/"
                                        className="text-white-20"
                                        target="_blank"
                                    >Orlando Guichard</CarbonLink>
                                </li>
                                <li>
                                    <CarbonLink
                                        href="https://www.linkedin.com/in/orlando-guychard-731a15201"
                                        className="text-white-20"
                                        target="_blank"
                                    >
                                        Mon LinkedIn
                                    </CarbonLink>
                                </li>
                                <li>
                                    <CarbonLink 
                                        href="https://github.com/orlando-guy"
                                        className="text-white-20"
                                        target="_blank"
                                    >
                                        Mon Github
                                    </CarbonLink>
                                </li>
                            </ul>
                        </div>
                    </Column>
                </Grid>
            </div>
            <p className="text-center w-full text-sm mt-3">Copyright © {(new Date()).getFullYear()} BOUNDLESS CODERS.</p>
        </footer>
    )
}

export default Footer;
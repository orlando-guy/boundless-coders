'use client'

import {
    Grid,
    Column,
    Breadcrumb,
    BreadcrumbItem,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    Button,
} from '@carbon/react'
import Image from 'next/image'
import {
    Advocate,
    Globe,
    AcceleratingTransformation,
} from '@carbon/pictograms-react'
import { InfoCard, InfoSection } from '@/app/ui/info/info'

export default function Home() {
    return (
        <main>
            <Grid className="landing-page" fullWidth>
                <Column lg={16} md={8} sm={4} className="landing-page__banner">
                    <Breadcrumb noTrailingSlash arial-label="Page navigation">
                        <BreadcrumbItem>
                            <a href="/">Getting started</a>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <h1 className="landing-page__heading">
                        Design &amp; build with Carbon
                    </h1>
                </Column>
                <Column lg={16} md={8} sm={4} className="landing-page__r2">
                    <Tabs defaultSelectedIndex={0}>
                        <TabList className='tabs-group' aria-label='tab list'>
                            <Tab>À propos</Tab>
                            <Tab>Les Défis du codage</Tab>
                            <Tab>Les Contributions</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Grid className="tabs-group-content">
                                    <Column md={4} lg={7} sm={4} className="landing-page__tab-content">
                                        <h2 className="landing-page__subheading">Qu'est-ce que BOUNDLESS CODERS ?</h2>
                                        <p className="landing-page__p">
                                            BOUNDLESS CODERS est un projet open source dont le but est de vous aider à devenir
                                            un meilleur ingénieur logiciel et à trouver un travail sympa grâce à des défis de codage, 
                                            et des contributions sur des projets d'autres développeurs. <br />
                                            C'est le moyen le plus simple d'entrer dans les meilleures équipes de développement et de 
                                            mettre un vrai projet sur votre CV, au lieu de ridicules « exemples de code ».
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            <Button>Voir les défis &rarr;</Button>
                                            <Button>Voir les contributions &rarr;</Button>
                                        </div>
                                    </Column>
                                    <Column md={4} lg={{ span: 8, offset: 7 }} sm={4}>
                                        <Image
                                            className='max-w-full tabs-group__image'
                                            src="/images/coding-night.jpg"
                                            alt="Brown skinned coder illustration"
                                            width={786}
                                            height={647}
                                        />
                                    </Column>
                                </Grid>
                            </TabPanel>
                            <TabPanel>
                                <Grid className="tabs-group-content">
                                    <Column lg={16} md={8} sm={4} className="landing-page__tab-content">
                                        Rapidly build beautiful and accessible experiences. The Carbon kit
                                        contains all resources you need to get started.
                                    </Column>
                                </Grid>
                            </TabPanel>
                            <TabPanel>
                                <Grid className="tabs-group-content">
                                    <Column lg={16} md={8} sm={4} className="landing-page__tab-content">
                                        Carbon provides styles and components in Vanilla, React, Angular,
                                        and Vue for anyone building on the web.
                                    </Column>
                                </Grid>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Column>
                <Column lg={16} md={8} sm={4} className="landing-page__r3">
                    <InfoSection heading="Les caractéristiques clées" className="landing-page__r3">
                        <InfoCard
                            heading="BOUNDLESS CODERS est Open"
                            body="Il s'agit d'un effort distribué, guidé par les principes du mouvement open source. Les utilisateurs de BOUNDLESS CODERS sont également ses créateurs, et chacun est encouragé à contribuer."
                            icon={<Advocate width={50} height={50} />}
                        />
                        <InfoCard
                            heading="Facile à démarrer"
                            body="Les défis de codage sont tous conçus pour vous guider tout au long du processus de création d'une application et pour représenter moins de 8 heures de travail."
                            icon={<AcceleratingTransformation width={50} height={50} />}
                        />
                        <InfoCard
                            heading="Indépendant du langage"
                            body="Vous pouvez relever les défis dans le langage de programmation de votre choix. Vous pouvez même les aborder dans plusieurs langues différentes si vous préférez."
                            icon={<Globe width={50} height={50} />}
                        />
                    </InfoSection>
                </Column>
            </Grid>

        </main>
    )
}
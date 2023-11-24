import { Grid, Column } from '@carbon/react';
import { createArrayFromPhrase } from '@/app/lib/utils';
import React from 'react';

interface InfoSectionProps {
    className: string;
    heading: string;
    children: React.ReactNode;
}

interface InfoCardProps {
    heading: string;
    body: string;
    icon: React.ReactNode;
}

const InfoSection = ({ className, heading, children }:
    Readonly<InfoSectionProps>
) => (
    <Grid className={`${className} info-section`}>
        <Column md={8} lg={4} xlg={3}>
            <h3 className="info-section__heading">{heading}</h3>
        </Column>
        {children}
    </Grid>
);

const InfoCard = ({ heading, body, icon }: Readonly<InfoCardProps>) => {
    return (
        <Column sm={4} md={8} lg={4} className="info-card">
            <h4 className="info-card__heading">
                <strong>{heading}</strong>
            </h4>
            <p className="info-card__body">{body}</p>
            {icon}
        </Column>
    );
};

export { InfoSection, InfoCard };
'use client'

import React from 'react';
import { Grid, Column } from '@carbon/react';

export default function Repository() {
    return (
        <Grid>
            <Column lg={16} md={8} sm={4} className='repo-page__r1'>
                Aucun projet requierant une contribution n'a encore été soumit pour le moment.
            </Column>
        </Grid>
    )
}
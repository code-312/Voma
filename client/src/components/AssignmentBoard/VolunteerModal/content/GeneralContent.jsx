import React from 'react';
import Typography from '@mui/material/Typography';

const GeneralContent = ({ title, fields }) => (
        <>
        <Typography variant="h6" component="h2" gutterBottom>
            {title}
        </Typography>
        { fields.map((field) => <div key={field.label}>
                <Typography variant="overline">{field.label}</Typography>
                <Typography variant="subtitle-1" paragraph>{field.value}</Typography>
            </div>)
        }
        </>
    );

export default GeneralContent;

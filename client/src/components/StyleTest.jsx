import React from 'react';
import { BodyText2, BodyText3, Label1, Label2, Label3, Label4 } from '../styles/components/Typography';

const StyleTest = () => (    
        <div style={{ width: '600px', margin: 'auto'}}>
            <h1>I am an h1 header</h1>
            <h2>I am an h2 header</h2>
            <h3>I am H3</h3>
            <h4>I am h4</h4>
            I am just regular body copy.
            <BodyText2>body 2</BodyText2>
            <BodyText3>body 3</BodyText3>
            <div>
                <Label1>Label1</Label1>
            </div>
            <div>
                <Label2>Label2</Label2>
            </div>
            <div>
                <Label3>Label3</Label3>
            </div>
            <div>
                <Label4>Label4</Label4>
            </div>
            <h3>Colors:</h3>
            <div>
                <div style={{ backgroundColor: 'var(--managementBlue)', color: 'var(--white)'}}>ManagementBlue</div>
                <div style={{ backgroundColor: 'var(--managementBlue2)'}}>ManagementBlue2</div>
                <div style={{ backgroundColor: 'var(--managementBlue3)'}}>ManagementBlue3</div>
                <div style={{ backgroundColor: 'var(--volunteerGreen)'}}>volunteerGreen</div>
                <div style={{ backgroundColor: 'var(--lightPeach)'}}>lightPeach</div>
                <div style={{ backgroundColor: 'var(--uiBlue)'}}>uiBlue</div>
                <div style={{ backgroundColor: 'var(--uiError)'}}>uiError</div>
                <div style={{ backgroundColor: 'var(--blueShadeIII)', color: 'var(--white)'}}>blueShadeIII</div>
                <div style={{ backgroundColor: 'var(--white)'}}>white</div>
                <div style={{ backgroundColor: 'var(--peachShade1)'}}>peachShade1</div>
                <div style={{ backgroundColor: 'var(--peachShade2)'}}>peachShade2</div>
                <div style={{ backgroundColor: 'var(--blueShade1)'}}>blueShade1</div>
                <div style={{ backgroundColor: 'var(--blueShade2)'}}>blueShade2</div>
                <div style={{ backgroundColor: 'var(--lightBlueGrey)'}}>lightBlueGrey</div>
            </div>
        </div>
);

export default StyleTest;

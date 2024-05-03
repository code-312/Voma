import React from 'react';
import ProjectInfoField from '../ProjectPage/ProjectInfoField';
import StackedInput from '../StackedInputs';
import { Label3 } from '../../styles/components/Typography';

const BackgroundForm = ({
    volunteer,
    updateInfo,
    updateVolunteerArray
}) => {
    const handleChange = (e) => {
        updateInfo({[e.target.name]: e.target.value});
    };

    const updateVolRadio = (e) => {
        // it really likes to pass its values as a string, so we have to get the boolean values
        let value;
        if (e.currentTarget.value === "true") {
            value = true;
        } else {
            value = false;
        }
        // Then we have to pass it this mock event object... probably a good idea to refactor
        updateInfo({[e.target.name]: value });
    }

    const arrayListener = (e) => {
        const { name, value, checked} = e.currentTarget;
        const copy = {...volunteer};
        console.log(copy);
        console.log(name);
        console.log(copy[name]);
        let arrCopy = [...copy[name]];
        if (checked) {
            arrCopy = [...arrCopy, value];
        } else {
            arrCopy.splice(arrCopy.indexOf(value), 1);

        }
        
        updateVolunteerArray(name, arrCopy);
    }

    const backendTechOptions = [{
        value: 'sql',
        text: 'SQL'
    }, {
        value: 'python', 
        text: 'Python'
    }, {
        value: 'php',
        text: 'PHP'
    }, {
        value: 'node',
        text: 'Node/Express'
    }, {
        value: 'nonrelationalDbs',
        text: 'Non-Relational Databases'
    }, {
        value: 'none',
        text: 'N/A'
    }, {
        value: 'other',
        text: 'Other'
    }];

    const frontendTechOptions = [{
        value: 'html',
        text: "HTML & CSS",
    }, {
        value: 'js',
        text: 'Javascript'
    }, {
        value: 'react',
        text: 'React'
    }, {
        value: 'ruby',
        text: 'Ruby / Ruby on Rails'
    }, {
        value: 'none',
        text: "N/A"
    }, {
        value: 'other',
        text: 'Other'
    }];

    const webtoolOptions = [{
        value: 'airtable',
        text: 'Airtable'
    }, {
        value: 'figma',
        text: 'Figma'
    }, {
        value: 'miro',
        text: "Miro"
    }, {
        value: 'trello',
        text: 'Trello'
    }, {
        value: 'gitbook',
        text: "Gitbook"
    }, {
        value: 'none',
        text: "N/A"
    }, {
        value: 'other',
        text: 'Other'
    }];

    const webPlatformOptions = [{
        value: 'squarespace', 
        text: 'Squarespace'
    }, {
        value: 'wix',
        text: 'Wix'
    }, {
        value: 'wordpress',
        text: 'Wordpress'
    }, {
        value: 'netlify',
        text: 'Netlify'
    }, {
        value: 'github',
        text: 'Github'
    }, {
        value: 'none',
        text: 'N/A'
    }, {
        value: 'other',
        text: 'Other'
    }];

    return (
        <div>
            <h3>Background</h3>
                <Label3>Are you hoping to further develop a core skill set or looking to try something new?</Label3>
                    <StackedInput 
                        labelText="Yes, one of the reasons is to strengthen my skillset."
                        value="Yes, one of the reasons is to strengthen my skillset."
                        name="goal"
                        checked={volunteer.goal === "Yes, one of the reasons is to strengthen my skillset."}
                        onChange={handleChange}
                        type="radio"
                    />
                    <StackedInput 
                        labelText="Yes, one of the reasons is I want to try something new."
                        value="Yes, one of the reasons is I want to try something new."
                        name="goal"
                        checked={volunteer.goal === "Yes, one of the reasons is I want to try something new."}
                        onChange={handleChange}
                        type="radio"
                    />
                    <StackedInput 
                        labelText="Both"
                        value="Both"
                        name="goal"
                        checked={volunteer.goal === "Both"}
                        onChange={handleChange}
                        type="radio"
                    />
                    <StackedInput 
                        labelText="Neither"
                        value="Neither"
                        name="goal"
                        checked={volunteer.goal === "Neither"}
                        onChange={handleChange}
                        type="radio"
                    />
                <Label3>
                    Do you have at least more than 1 year of experience in a role in the tech industry?
                </Label3>
                    <StackedInput 
                        labelText="Yes"
                        value
                        name="experience"
                        checked={volunteer.experience}
                        onChange={updateVolRadio}
                        type="radio"
                    />
                <StackedInput 
                    labelText="No"
                    value={false}
                    name="experience"
                    checked={!volunteer.experience}
                    onChange={updateVolRadio}
                    type="radio"
                />
            <ProjectInfoField
                label="Select the back-end technologies and language you feel you are proficient in:"
                valueText={volunteer.backendTech?.join(', ')}
                value={volunteer.backendTech || []}
                isEditing
                changeListener={arrayListener}
                options={backendTechOptions.map((tech) => ({ value: tech.value, text: tech.text }))}
                type="checkbox"
                name="backendTech"
            />
            <ProjectInfoField
                label="Select the front-end technologies and language you feel you are proficient in"
                valueText={volunteer.frontendTech?.join(', ')}
                value={volunteer.frontendTech || []}
                isEditing
                changeListener={arrayListener}
                options={frontendTechOptions.map((tech) => ({ value: tech.value, text: tech.text }))}
                type="checkbox"
                name="frontendTech"
            />
            <ProjectInfoField
                label="Select the web tools you have used in the past:"
                valueText={volunteer.webtools?.join(', ')}
                value={volunteer.webtools || []}
                isEditing
                changeListener={arrayListener}
                options={webtoolOptions.map((tech) => ({ value: tech.value, text: tech.text }))}
                type="checkbox"
                name="webtools"
            />
            <ProjectInfoField
                label="Select the web development platforms that you have used in past:"
                valueText={volunteer.webPlatforms?.join(', ')}
                value={volunteer.webPlatforms || []}
                isEditing
                changeListener={arrayListener}
                options={webPlatformOptions.map((tech) => ({ value: tech.value, text: tech.text }))}
                type="checkbox"
                name="webPlatforms"
            />

        </div>
    )
};

export default BackgroundForm;

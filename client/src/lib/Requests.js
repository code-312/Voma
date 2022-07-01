/**
 * Fetch all volunteers from the API.
 * 
 * GET /api/volunteers
 * 
 * @returns {Array} Array of volunteer objects or empty array on error.
 */
const fetchVolunteers = async () => {
    const volunteerList = await fetch('/api/volunteers')
        .then(response => response.json())
        .catch(e => {
            console.error(e);
            return [];
        });

    // console.log('fetchVolunteers', volunteerList); // debug

    return volunteerList;
};

/**
 * Fetch all project from the API.
 * 
 * @returns {Array} Array of project objects or empty array on error.
 */
const fetchProjects = async () => {
    const projectList = await fetch('/api/projects')
        .then(response => response.json())
        .catch(e => {
            console.error(e);
            return [];
        });
    
    // console.log('fetchProjects', projectList); // debug

    return projectList;
}

/** 
 * Assign a volunteer to a project. 
 * Returns true on success, otherwise the error message
 */

const assignVolunteerToProject = async (volunteerId, projectId ) => {
    let error;
    const result = await fetch('/api/assign-volunteer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ volunteerId, projectId })
    })
    .then((res) => {
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        return res.json();
    })
    .catch((e) => {
        error = e;
        return false;
    });

    return result || error;
}

export {
    fetchVolunteers,
    fetchProjects,
    assignVolunteerToProject
};
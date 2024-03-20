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

/**
 * Fetch all skills from the API.
 * 
 * @returns {Array} Array of project objects or empty array on error.
 */

const fetchSkills = async () => {
    const skillList = await fetch('/api/skills')
        .then(response => response.json())
        .catch(e => {
            console.error(e);
            return [];
        });
    
    // console.log('fetchProjects', skillList); // debug

    return skillList;
};

/** 
 * Edit a Volunteer's details
 */
const editVolunteer = async (volunteer) => {
    let error;
    const result = await fetch(`/api/volunteer/${volunteer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(volunteer)
    })
    .then((res) => {
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        return true;
    })
    .catch((e) => {
        error = e;
        return false;
    });

    return result || error;
};
/**
 * Edit a project's details.
 * 
 * @returns {true} on success, otherwise it will return the error. 
 */

const editProject = async (project, id) => {
    let error;
    const result = await fetch(`/api/project/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
    })
    .then((res) => {
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        return true;
    })
    .catch((e) => {
        error = e;
        return false;
    });

    return result || error;
};

const updateActivity = async (id, name, volunteerId, isNew) => {
    let error;

    const result = await fetch(`/api/event/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, volunteerId, isNew })
    })
    .then((res) => {
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        return true;
    })
    .catch((e) => {
        error = e;
        return false;
    });

    return result || error;
}

const updateActivityBulk = async (events) => {
    let error;

    const result = await fetch(`/api/event/bulkUpdate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events })
    })
    .then((res) => {
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        return true;
    })
    .catch((e) => {
        error = e;
        return false;
    });

    return result || error;
}

const deleteActivityBulk = async (ids) => {
    let error;
    console.log(ids);
    const result = await fetch(`/api/event/bulk`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids })
    })
    .then((res) => {
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        return true;
    })
    .catch((e) => {
        error = e;
        return false;
    });

    return result || error;
}

/**
 * Remove a link from a project. 
 * Returns true on success, else the error
 */

const removeLink = async (id) => {
    let error; 
    const result = await fetch(`/api/link/${id}`, {
        method: 'DELETE'
    })
    .then((res) => {
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        return true;
    })
    .catch((e) => {
        error = e;
        return false;
    });

    return result || { error };
}

/**
 * Adds a link to a project.
 * Returns true on success, else the error.
 */
const addLink = async (link) => {
    let error;
    const result = await fetch('/api/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(link)
    })
    .then((res) => {
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        return true;
    })
    .catch((e) => {
        error = e;
        return false;
    });

    return result || { error };
}

/**
 * Edit a link.
 * Returns true on success, else the error.
 */
const editLink = async (link) => {
    let error;
    const result = await fetch(`/api/link/${link.id}`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(link)
    })
    .then((res) => {
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        return true;
    })
    .catch((e) => {
        error = e;
        return false;
    });

    return result || { error };
}

/** Trigger the welcome to project slack message to a volunteer 
 * Returns true on success, else the error.
*/

const sendWelcomeSlackMessage = async (volunteerSlackId, project) => {
    let error;
    let payload = JSON.stringify({
        slackId: volunteerSlackId,
        project: JSON.stringify(project)
    });
    const result = await fetch('/api/slack/send-welcome-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload
    })
    .then((res) => {
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        return true;
    })
    .catch((e) => {
        error = e;
        return false;
    });

    return result || { error };
};

/* Edit Admin profile details */ 
const editAdmin = async(id, name, email) => {
    let error; 
    let payload = JSON.stringify({ id, name, email });

    const result = await fetch('/api/admin/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload
    })
    .then((res) => {
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        return true;
    })
    .catch((e) => {
        error = e; 
        return false;
    });

    return result || { error };
}

/* Change Admin Password */
const changePassword = async (id, oldPassword, newPassword) => {
    let error; 
    let payload = JSON.stringify({ id, oldPassword, newPassword });

    const result = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload
    })
    .then((res) => {
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        return true;
    })
    .catch((e) => {
        error = e; 
        return false;
    });

    return result || { error };
}

const addAdmin = async (name, password, email) => {
    let error; 
    let payload = JSON.stringify({ name, password, email });

    const result = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload
    })
    .then((res) => {
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        return true;
    })
    .catch((e) => {
        error = e; 
        return false;
    });

    return result || { error };
}

const getIndicatorViewsLS = () => {
    if (!JSON.parse(localStorage.getItem('tasksComplete'))) {
        localStorage.setItem("tasksComplete", JSON.stringify({viewed: [], notViewed: []}))
    }
    const { viewed, notViewed } = JSON.parse(localStorage.getItem('tasksComplete'));
    return { viewed, notViewed};
}

const setViewedLS = (id) => {
    let {viewed, notViewed} = getIndicatorViewsLS();
    viewed = [...viewed, id];
    notViewed = notViewed.filter(volId => volId !== id)
    localStorage.setItem('tasksComplete', JSON.stringify({viewed, notViewed}))
}

const addProject = async (name) => {
    let error; 
    let payload = JSON.stringify({ name });

    const result = await fetch('/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload
    })
    .then((res) => {
        if (res.status !== 200) {
            throw new Error(res.error);
        }
        return res.json();
    }).then((json) => {
        console.log(json);
        return json.id
    })

    .catch((e) => {
        error = e; 
        return false;
    });

    return result || { error };
}

export {
    fetchVolunteers,
    fetchProjects,
    fetchSkills,
    assignVolunteerToProject,
    editProject,
    editVolunteer, 
    removeLink,
    addLink,
    editLink,
    sendWelcomeSlackMessage, 
    editAdmin,
    changePassword, 
    addAdmin, 
    getIndicatorViewsLS, 
    setViewedLS,
    updateActivity,
    updateActivityBulk,
    deleteActivityBulk,
    addProject
};
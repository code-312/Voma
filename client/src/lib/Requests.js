export const getVolunteers = async () => {
    try {
        const res = await fetch('/api/volunteers');
        if (!res.ok) {
            throw new Error(`Error!  ${res.status}`);
        }
        const json = await res.json();
        return json;
    } catch (err) {
        console.log(err);
        return null;
    }
};

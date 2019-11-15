export const parseResponse = async (response) => {
    try {
        const res = await response.json();
        if (res.status >= 200 && res.status < 300) {
            return res;
        } else if (res.status === 404) {
            let err = new Error('Error');
            err.response = { title: "Oh No", description: res.message || "Unable to find the required details" };
            throw err;
        } else if (res.status === 401) {
            let err = new Error('Error');
            err.response = { title: "Session Expired", description: "Please login again" };
            throw err;
        } else {
            let err = new Error('Error');
            err.response = res.error;
            throw err;
        }
    } catch (e) {
        let err = new Error('Error');
        err.response = (e.response !== undefined) ? e.response : { title: "Oh no!", description: "Something went wrong" };
        throw err;
    }

}

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};

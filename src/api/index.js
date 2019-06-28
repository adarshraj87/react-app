const METHOD = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT'
}
const ACCEPT_JSON = 'application/json';

export const v1 = {
    root: "http://localhost:7777",
    call: async (url, parameters) => {
        try {
            const finalUrl = `${v1.root}${url}`;
            const response = await fetch(finalUrl, parameters);
            return response;
        } catch (e) {
            const error = new Error(e.message);
            error.response = { title: "Oh no!", description: "Something went wrong" }
            throw error;
        }
    },
    parameters: (
        authorisation,
        method = METHOD.GET,
        accept = ACCEPT_JSON,
        body = {}
    ) => {
        const withBody = [METHOD.PUT, METHOD.PATCH, METHOD.POST];
        const params = {
            method,
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                Authorization: `apiKey ${authorisation.key}:${authorisation.secret}`,
                'Cache-Control': 'no-cache',
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
        };
        if (withBody.indexOf(method) !== -1) {
            params.body = JSON.stringify(body);
            if (method === METHOD.PUT) {
                params.headers['Content-Length'] = 0;
            }
        }
        return params;
    },
    delete: async (url, authorisation, body = {}) => {
        const response = await v1.call(
            url,
            v1.parameters(authorisation, METHOD.DELETE, ACCEPT_JSON, body)
        );
        return response;
    },
    get: async (url, authorisation, body = {}) => {
        const response = await v1.call(url, v1.parameters(authorisation, METHOD.GET, ACCEPT_JSON, body));
        return response;
    },
    post: async (url, authorisation, body = {}) => {
        const response = await v1.call(
            url,
            v1.parameters(authorisation, METHOD.POST, ACCEPT_JSON, body)
        );
        return response;
    },
    put: async (url, authorisation, body = {}) => {
        const response = await v1.call(
            url,
            v1.parameters(authorisation, METHOD.PUT, ACCEPT_JSON, body)
        );    
        return response;
    }
}
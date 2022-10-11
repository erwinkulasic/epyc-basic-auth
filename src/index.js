
function getCredentials(authorization) {
    if (authorization) {
        const [username, password] = Buffer.from(authorization.slice(6), 'base64')
            .toString()
            .split(/:/);

        return {
            username,
            password
        };
    }

    return undefined;
}

module.exports = (prediction) => (request, response, next) => {
    const credentials = getCredentials(request.headers.Authorization || request.headers.authorization);

    if(credentials === undefined || !prediction(credentials)) {
        response.writeHead(401, { 'WWW-Authenticate': 'Basic' })
        response.end();
    } else {
        response.statusCode = 200;
        next();
    }
}
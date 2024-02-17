import { request as _request } from 'http';

let urlparams = {
    host: 'localhost',
    port: 4444,
    path: '/tasks',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};

export function SendRequest(dataToSend) {
    function OnResponse(response) {
        var data = '';

        response.on('data', function (chunk) {
            data += chunk;
        });

    }

    let request = _request(urlparams, OnResponse);

    request.write(JSON.stringify(dataToSend));
    request.end();
}

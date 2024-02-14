import http from 'http';

import { toJson } from './middleware/toJson.js';
import { routes } from './routes.js';
import { extractQueryParams } from './Utils/extractQueryParams.js';

const server = http.createServer(async (req, res) => {
    const { method, url } = req
    await toJson(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)
        const { query, ...params } = routeParams.groups
        req.query = query ? extractQueryParams(query) : {}
        req.params = params
        return route.handler(req, res)
    }
    return res.writeHead(404).end()
})


server.listen(4444)
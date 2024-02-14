
import { randomUUID } from 'crypto';
import { buildRouterPath } from './Utils/buildRoutePath.js';
import { Database } from './database.js';
import { timeZone } from './Utils/timeZoneBrazil.js';

const database = new Database
export const routes = [
    {
        method: 'GET',
        path: buildRouterPath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query
            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            } : null)

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRouterPath('/tasks'),
        handler: (req, res) => {
            const date = timeZone()
            const { title, description } = req.body

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: date,
                updated_at: date,
            }
            database.insert('tasks', task)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRouterPath('/tasks/:id'),
        handler: (req, res) => {
            try {
                const date = timeZone()
                const { id } = req.params
                const { title, description } = req.body
                if (!title || !description) {
                    return res.writeHead(417).end(JSON.stringify("Preencha todo formulario"))
                }
                const task = ({
                    title,
                    description,
                    updated_at: date
                })
                database.update('tasks', id, task)
                return res.writeHead(204).end()
            } catch (error) {
                return res.writeHead(404).end(JSON.stringify(error.message))
            }

        }
    },
    {
        method: 'DELETE',
        path: buildRouterPath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            try {
                database.delete('tasks', id)
                return res.writeHead(204).end()
            } catch (error) {
                return res.writeHead(404).end(JSON.stringify(error.message))
            }
        }

    },
    {
        method: 'PATCH',
        path: buildRouterPath('/tasks/:id/complete'),
        handler: (req, res) => {
            const data = timeZone()
            const { id } = req.params
            try {
                database.completeTask('tasks', id, data)
                return res.writeHead(204).end()
            } catch (error) {
                return res.writeHead(404).end(JSON.stringify(error.message))
            }
        }
    },
    {
        method: 'GET',
        path: buildRouterPath('multipart/form-data'),
        handler: (req, res) => {

            const { id } = req.params
            try {
                database.completeTask('tasks', id, data)
                return res.writeHead(204).end()
            } catch (error) {
                return res.writeHead(404).end(JSON.stringify(error.message))
            }
        }
    }



]
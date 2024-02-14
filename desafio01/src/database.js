import fs from 'node:fs/promises';

const databasePath = new URL('tasksDb.json', import.meta.url)



export class Database {

    #database = {};

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    constructor() {

        fs.readFile(databasePath, 'utf-8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })

    }


    select(table, search) {
        let data = this.#database[table] ?? [];

        if (search) {
            data = data.filter(row => {

                return Object.entries(search).some(([key, value]) => {

                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }
        return data;
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }
        this.#persist();
        return data;
    }
    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
        throw new Error("ID NOT FOUND!")
    }
    completeTask(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table][rowIndex]["completed_at"] = data

            this.#persist()
        }

        throw new Error("ID NOT FOUND!")
    }
    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if (!rowIndex > -1) {
            const valueDateBase = this.#database[table][rowIndex]
            for (const keyChange in data) {
                for (const keyDataBase in valueDateBase) {
                    if (keyChange === keyDataBase & data[keyChange] !== undefined) {
                        valueDateBase[keyDataBase] = data[keyChange]
                    }
                }
            }
            this.#database[table][rowIndex] = valueDateBase

            this.#persist()
        }
        throw new Error("ID NOT FOUND!")
    }

}
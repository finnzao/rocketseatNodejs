
import { parse } from 'csv-parse';
import fs from 'fs';
import { SendRequest } from '../src/Utils/CreateTask.js';


const pathFile = new URL('./tasks.csv', import.meta.url)

const dataToCSV = async () => {
    const linesParse = fs.createReadStream(pathFile)
        .pipe(parse({ delimiter: ",", from_line: 2, skipEmptyLines: true }))


    for await (const line of linesParse) {
        const [title, description] = line
        SendRequest({ title, description })
    }
}

dataToCSV()





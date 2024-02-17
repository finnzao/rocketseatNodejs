
import { parse } from 'csv-parse';
import fs from 'fs';
const pathFile = '../tasks.csv'
const data = {}
let x = 1

const dataCSV = async () => {
    fs.createReadStream(pathFile)
    .pipe(parse({ delimiter: ",", from_line: 2, skipEmptyLines: true }))
    .on("data", function (row) {
        row.map((e, i, a) => {
            data[`req${x}`] = { task: a[0], description: a[1] }
            x += 1
        })
        //console.log(data)
    }).on("end", () => {
        for (const x of data) {
            console.log(x)
        }
    })
}







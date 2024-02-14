const obj = {
    id: "a2887174-bdc8-4120-b3d0-6965cb53e3a2",
    title: "Taks number 3",
    description: "description number 1",
    completed_at: null,
    created_at: "13/02/2024, 17:36:13",
    updated_at: "13/02/2024, 17:36:13"
}

const change = {
    title: "Change task",
    description: undefined,
}


const update = (updateDate) => {
    for (const keyChange in updateDate) {
        for (const key in obj) {
            if (keyChange === key & updateDate[keyChange] != undefined) {
                obj[key] = change[keyChange]
            }
        }
    }

    console.log(obj)
}


update(change)
//Arquivo .d é para definições de tipo

// eslint-disable-next-line

declare module 'knex/types/tables' {
    export interface Tables {
        meals: {
            id: string
            title: string
            desc: string
            created_at: string
            on_diet: boolean
            session_id?: string
        }
        user: {
            id: string,
            username: string
            email: string
            password: string
            created_at: string
            admin:boolean
            session_id?: string
        }
    }
}
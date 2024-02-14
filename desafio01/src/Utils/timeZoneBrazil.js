export function timeZone() {
    const date = new Date()
    const option = {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }
    const formatDate = date.toLocaleString('pt-BR', option)
    return formatDate
}
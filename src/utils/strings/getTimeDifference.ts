export const getTimeDifference = (dateTimeStr: string) => {
    const currentTime = new Date()
    const dateTime = new Date(dateTimeStr)

    const difference = currentTime.getTime() - dateTime.getTime()
    const seconds = Math.floor(difference / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const getMinutes = () => dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes()
    const formattedTime = `${dateTime.getHours()}:${getMinutes()}`

    const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    const formattedWeekday = weekdays[dateTime.getDay()]

    const formattedDate = dateTime.toLocaleDateString('ru', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })


    if (hours < 24) {
        return `${formattedTime}`
    }

    const days = Math.floor(hours / 24)
    if (days < 7) {
        return `${formattedWeekday}`
    }

    return formattedDate.slice(0, formattedDate.length - 2)
}

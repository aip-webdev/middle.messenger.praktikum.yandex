export const stringShorter = (string, number) => string.length > number ?
    `${string.substring(0, number - 1)}...` : string

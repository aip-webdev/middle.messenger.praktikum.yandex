export const stringShorter = (string: string, number: number) =>
    string.length > number ? `${string.substring(0, number - 1)}...` : string

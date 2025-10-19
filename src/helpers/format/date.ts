export const getFormattedDate = (isoDate: string) => {
    return new Intl.DateTimeFormat ("en-GB").format(new Date(isoDate))
}

export const getFormattedDetailDate = (isoDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric"
    }
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(isoDate))
}
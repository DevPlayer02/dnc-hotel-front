export const getFormattedDate = (isoDate: string) => {
    return new Intl.DateTimeFormat ("en-GB").format(new Date(isoDate))
}
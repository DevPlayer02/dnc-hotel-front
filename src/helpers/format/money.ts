export const getFormattedPrice = (price: number | string) => {
    const numberPrice = Number(price)

    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numberPrice)
}
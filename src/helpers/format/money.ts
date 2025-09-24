export const getFormattedPrice = (price: number | string) => {
  const numberPrice = Number(price);

  return Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberPrice);
};

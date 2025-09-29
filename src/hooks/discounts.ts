export const getDiscount = (price: number, discount: number) => {
    return `$${(price - (price * discount / 100)).toFixed(2)}`;
}
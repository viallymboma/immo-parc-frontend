export const formatToCurrency = (number: number, currency: string) => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency', 
        currency: currency
    }).format(number); 
}
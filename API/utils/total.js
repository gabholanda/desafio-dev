const calculateTotal = (prev, curr, symbol) => {
    if (symbol === '+')
        return prev + curr
    else if (symbol === '-')
        return prev - curr
    else
        return 0;
}

module.exports = { calculateTotal };
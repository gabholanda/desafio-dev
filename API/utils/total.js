const calculateTotal = (prev, curr, symbol) => {
    if (symbol === '+')
        return prev + curr
    else if (symbol === '-')
        return prev - curr
}

module.exports = calculateTotal;
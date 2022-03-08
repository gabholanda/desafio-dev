const cnab = {
    TransactionTypeId: {
        read: (value) => value.substring(0, 1)
    },
    ocurrenceDate: {
        read: (value) => formatDate(value)
    },
    value: {
        read: (value) => parseFloat(value.substring(9, 19)) / 100
    },
    CPF: {
        read: (value) => value.substring(19, 30)
    },
    card: {
        read: (value) => value.substring(30, 42)
    },
    hour: {
        read: (value) => joinHour(value)
    },
    shopOwner: {
        read: (value) => value.substring(48, 62).trim()
    },
    shopName: {
        read: (value) => value.substring(62, 81).trim()
    }
}

const joinHour = (value) => {
    const fullHourString = value.substring(42, 48);
    const splitedHour = fullHourString.split('');
    let joinedHour = '';
    let divide = 1;
    for (let i = 0; i < splitedHour.length; i++) {
        joinedHour += splitedHour[i];
        if (divide % 2 == 0 && i !== splitedHour.length - 1)
            joinedHour += ":";
        divide++;
    }
    return joinedHour;
}

const formatDate = (value) => {
    const year = value.substring(1, 5);
    const month = value.substring(5, 7);
    const day = value.substring(7, 9);
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

module.exports = { cnab };
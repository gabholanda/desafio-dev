const fillDocuments = (cnabDocuments, textLines, fileParser, parser) => {
    textLines.forEach(textLine => {
        const newCnabDocument = {}
        for (const key in fileParser[parser]) {
            newCnabDocument[key] = fileParser[parser][key].read(textLine);
        }
        newCnabDocument.id = `${newCnabDocument.card}:${newCnabDocument.ocurrenceDate}:${newCnabDocument.value}`
        cnabDocuments.push(newCnabDocument);
    });
}

module.exports = { fillDocuments };
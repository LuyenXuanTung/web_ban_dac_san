function convertWord(str) {
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    str = str.replace(/[đĐ]/g, 'd');
    return str;
}

module.exports = convertWord
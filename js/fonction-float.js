function convertToFloatNumber(number) {
    number = (number / 100).toFixed(2);
    return number;
};

export { convertToFloatNumber };
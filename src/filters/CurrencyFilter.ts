const formatCurrency = (value) => {
    if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('en-US');
    return formatter.format(value);
};
export default {
    formatCurrency
};
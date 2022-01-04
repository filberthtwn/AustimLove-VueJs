import moment from 'moment';

const formatDate = (value, dateFormat) => {
    return moment(value).format(dateFormat);
};
export default {
    formatDate
};
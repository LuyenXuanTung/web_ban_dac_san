import moment from 'moment'


function formatExpiry(expiryDate) {

    const expiry = moment(expiryDate);
    const now = moment();
    const diffDays = expiry.diff(now, 'days');
  
    if (diffDays > 365) {
      const diffYears = expiry.diff(now, 'years');
      return `${diffYears} năm`;
    } else if (diffDays > 30) {
      const diffMonths = expiry.diff(now, 'months');
      return `${diffMonths} tháng`;
    } else if (diffDays >= 0) {
      return `${diffDays} ngày`;
    } else {
      return 'Đã hết hạn';
    }
  }

  export default formatExpiry;
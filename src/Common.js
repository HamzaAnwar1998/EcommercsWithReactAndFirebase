export const displayNumber = (number, replaceValue = '.') => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, replaceValue);
export const mobileTypeList = ['Iphone', 'Samsung'];
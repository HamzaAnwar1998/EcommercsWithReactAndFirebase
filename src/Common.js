export const displayNumber = (number, replaceValue = '.') => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, replaceValue);
export const mobileTypeList = ['Iphone', 'Samsung'];
export const colorList  = ['#011f4b', '#fed766 ', '#fe4a49 ', '#2ab7ca', '#fe9c8f', '#009688', '#fdf498', '#7bc043', '#', '#', '#', '#', '#', '#']
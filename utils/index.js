export const removeItemById = (array, id) =>
  array.filter(function (ele) {
    return ele.id != id;
  });

export const getItemByKey = (array, id, key) => array.find(x => x[key] === id);

export const sortByName = array => {
  let tempArray = array.slice();
  return tempArray.sort((a, b) => a.name.localeCompare(b.name))
};

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const getMonthNameFromTS = ts => months[new Date(ts).getMonth()];
export const getDayNumFromTS = ts => new Date(ts).getDate();
export const getYearFromTS = ts => new Date(ts).getFullYear();

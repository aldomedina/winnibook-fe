export const removeItemById = (array, id) =>
  array.filter(function (ele) {
    return ele.id != id;
  });

export const getItemByKey = (array, id, key) => array.find(x => x[key] === id);

export const sortByName = array => array.sort((a, b) => a.name.localeCompare(b.name));

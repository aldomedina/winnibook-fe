export const removeItemById = (array, id) =>
  array.filter(function (ele) {
    return ele.id != id;
  });

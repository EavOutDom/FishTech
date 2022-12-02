export const groupArray = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
);

export const ObjectToArray = (array) => {
  return Object.keys(array).map(index => array[index]);
};

export const reducePrice = (array) => {
  if(array.length > 0){
    return '$' + array.map(v => v.price).reduce((acc, curr) => acc + curr).toFixed(2);
  }
}
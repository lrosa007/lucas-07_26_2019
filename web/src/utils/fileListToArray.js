export default list => {
  const array = [];

  for (var i = 0; i < list.length; i++) {
    array.push(list.item(i));
  }

  return array;
};

import numeral from 'numeral';

export default bytes => {
  return numeral(bytes)
    .format('0b')
    .toLowerCase();
};

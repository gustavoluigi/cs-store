export const unformatPrice = (price) => {
  let compativelComParseFloat = price.replace('R$', '').replace('.', '');
  compativelComParseFloat = compativelComParseFloat.replace(',', '.');
  const valor = parseFloat(compativelComParseFloat);
  return valor;
};

const formatPrice = price => {
  if (price) {
    return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  } else {
    return '0';
  }
};

export default formatPrice;

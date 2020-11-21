const urlShortener = (lenght) => {
  const l = lenght > 0 ? lenght : 8;
  const text = 'abcdefghijklmnoprstuwxyzABCDEFGHIJKLMNOPRSTUWXYZ0123456789';
  let returnVal = '';
  for (let i = 0; i < l; i++) {
    returnVal += text[Math.floor(Math.random() * text.length)];
  }
  return returnVal;
};

module.exports = urlShortener;
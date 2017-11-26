const generateID = (prefix = null, prefixSeparator='_') => {
  const id = Math.floor(Math.random() * 1e3 * new Date().getTime()).toString(36);
  if (prefix) {
    return `${prefix}${prefixSeparator}${id}`;
  };
  return id;
};

export default generateID;
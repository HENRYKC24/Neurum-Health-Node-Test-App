const validateData = (data) => {
  if (typeof data !== 'string' || !data.trim()) return false;
  return true;
};

module.exports = validateData;

const lowerCase = (str) => {
  return str.toLowerCase().trim();
};
const upperCase = (str) => {
  return str.toUpperCase().trim();
};
const capitalize = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((e) => {
      return e.charAt(0).toUpperCase() + e.slice(1);
    })
    .join(" ");
};
module.exports = { lowerCase, upperCase, capitalize };

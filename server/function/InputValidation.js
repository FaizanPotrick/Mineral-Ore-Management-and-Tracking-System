const input_validation = (regex, value) => {
  if (value === "") {
    return false;
  }
  if (!regex.test(value)) {
    return false;
  }
  return true;
};

const email_address_validation = (value) => {
  const regex = /^[a-zA-Z]([a-zA-Z0-9_.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]){2,6}$/;
  return input_validation(regex, value);
};
const name_validation = (value) => {
  const regex = /^([ a-zA-Z]+)$/;
  return input_validation(regex, value);
};
const phone_no_validation = (value) => {
  const regex = /^([-+0-9]+)$/;
  return input_validation(regex, value);
};
const password_validation = (value) => {
  const regex = /^(?=.*[0-9])([A-Za-z0-9@$#^!%*?&]+)$/;
  return input_validation(regex, value);
};
const number_validation = (value) => {
  const regex = /^([0-9]+)$/;
  return input_validation(regex, value);
};
const string_validation = (value) => {
  const regex = /^([a-zA-Z0-9]+)$/;
  return input_validation(regex, value);
};
const address_validation = (value) => {
  const regex = /^([ a-zA-Z0-9,/-]+)$/;
  return input_validation(regex, value);
};
module.exports = {
  email_address_validation,
  name_validation,
  phone_no_validation,
  password_validation,
  number_validation,
  string_validation,
  address_validation,
};

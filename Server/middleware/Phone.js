const phoneNumber = (phone) => {
  let phoneNumber = "+" + phone;
  phoneNumber = phoneNumber.replace(/-/g, "");
  return phoneNumber;
};

module.exports = { phoneNumber };

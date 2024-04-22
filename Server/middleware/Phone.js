const phoneNumber = (phone) => {
  let phoneNumber = "+" + phone;
  phoneNumber = phoneNumber.replace(/-/g, "");
  console.log(phoneNumber);
  return phoneNumber;
};

module.exports = { phoneNumber };

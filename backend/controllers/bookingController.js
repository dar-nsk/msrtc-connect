const calculateDiscount = (user) => {
  if (user.disabled) return 70;
  if (user.age >= 65) return 50;
  if (user.gender === "Female") return 50;
  return 0;
};
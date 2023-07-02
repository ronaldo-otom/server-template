import bcrypt from "bcrypt";

const saltRounds = 10;

export const encrypt = (str) => {
  return bcrypt
    .hash(str, saltRounds)
    .then((hash) => hash)
    .catch((err) => console.log(err));
};

export const compare = (str, strFromRecord) => {
  return bcrypt.compare(str, strFromRecord);
};

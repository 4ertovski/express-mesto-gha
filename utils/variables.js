const JWT_SECRET = 'some-secret-key';
/* const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/; */
const urlRegExp = /^[0-9a-fA-F]{24}$/;
/* /^(https?:\/\/)(www\.)?([\w-]+\.)+[\w-]+(\/[\w-._~:/?#[\]@!$&'()*+,;=]*)?#?$/ */

module.exports = {
  urlRegExp,
  JWT_SECRET,
};

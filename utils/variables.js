const JWT_SECRET = 'some-secret-key';
/* const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/; */
const urlRegExp = /^(https?:\/\/)(www\.)?([\w-]+\.)+[\w-]+(\/[\w-._~:/?#[\]@!$&'()*+,;=]*)?#?$/;

module.exports = {
  urlRegExp,
  JWT_SECRET,
};

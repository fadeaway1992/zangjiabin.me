const uuidv1 = require('uuid/v1')

function generateExpiry (days) {
  const now = new Date()
  const YEAR = now.getFullYear()
  const MONTH = now.getMonth()
  const DATE = now.getDate() + days
  return new Date(YEAR, MONTH, DATE)
}

const generateNewSession = function ({username, role}) {
 return {
   username,
   role,
   access_token: uuidv1(),
   expiry: generateExpiry(30)
 }
}

const transformDateObjectToCommonTimeString = function (DateObject) {
  const YEAR = DateObject.getFullYear()
  const MONTH = DateObject.getMonth() + 1
  const DATE = DateObject.getDate()
  return YEAR + '年' + MONTH + '月' + DATE + '日'
}

module.exports = {generateNewSession, generateExpiry, transformDateObjectToCommonTimeString}
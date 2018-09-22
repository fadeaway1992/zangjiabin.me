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

module.exports = {generateNewSession, generateExpiry}
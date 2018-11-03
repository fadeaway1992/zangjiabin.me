const uuidv1 = require('uuid/v1')
const xmlbuilder = require('xmlbuilder')
const path = require('path')
const fs = require('fs')
const axios = require('axios')

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

const generateSitemap = function (posts) {
  const sitemapPath = path.join(__dirname, '../root/sitemap.xml')
  const mainPath = 'https://zangjiabin.me/posts/'
  const root = xmlbuilder.create('urlset', {version: '1.0', encoding: 'UTF-8'}).att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
  posts.forEach((post) => {
    root.ele('url').ele('loc', mainPath + post.id).insertAfter('priority', 0.6);
  })
  fs.writeFileSync(sitemapPath, root.end({pretty: true}), function(err) {
    if (err) {
      console.log(err);  
    }
    axios.get('http://www.google.com/ping?sitemap=https://zangjiabin.me/sitemap.xml')
  })
}
module.exports = {generateNewSession, generateExpiry, transformDateObjectToCommonTimeString, generateSitemap}
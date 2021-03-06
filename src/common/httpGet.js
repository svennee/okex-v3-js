import fetch from 'node-fetch';
import CryptoJS from 'crypto-js'
import log4js, { Logger } from 'log4js'
let loggger = log4js.getLogger()


/**
 * Okex V3 Rest get请求
 * 作者: qugang
 * 邮箱: qgass@163.com
 * 创建时间：2018/10/26
 * @export
 * @param {*} url 请求地址
 * @param {*} param 参数
 * @param {*} accessKey 字符串类型的API Key
 * @param {*} passphrase 您在创建API密钥时指定的Passphrase
 */
export default function httpGet(url, param,accessKey,passphrase,secretKey) {
    let paramKeys = Object.keys(param)
    let paramArr = []
    for (let index in paramKeys) {
        var name = paramKeys[index]
        var value = param[name]
        if (value == null || value == undefined) {
            continue
        }
        paramArr.push(name + '=' + value)
    }
    if (paramArr.length > 0) {
        url += `?${paramArr.join('&')}`
    }
    const timestamp = new Date().toISOString()
    const dirUrl = url.replace(/.*\/\/[^\/]*/, '')
    let sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp + 'GET' + dirUrl, secretKey))
    let options = {
        method: 'get',
        headers: {
            'OK-ACCESS-KEY': accessKey,
            'OK-ACCESS-SIGN': sign,
            'OK-ACCESS-TIMESTAMP': timestamp,
            'OK-ACCESS-PASSPHRASE': passphrase,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    }
    console.log(`httpGet:${url} options:${JSON.stringify(options)}`)
    loggger.debug(`httpGet:${url} options:${JSON.stringify(options)}`)
    return fetch(url, options)
}

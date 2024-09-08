import config from "~/.config.json";
import { authenticator } from "otplib"
import qrcode from 'qrcode'
import jwt from 'jsonwebtoken'

authenticator.options = {
  encoding: "ascii",
  window: [2, 2]
}
const TOTPCONF = config.TOTP
const secret = authenticator.encode(TOTPCONF.secret)

export async function getTOTPQR(input = "") {
  return new Promise(resolve => {
    if (input !== TOTPCONF.secret) {
      return resolve('')
    }
    const otpauth = authenticator.keyuri(TOTPCONF.user, TOTPCONF.service, secret);
    console.log(otpauth)
    qrcode.toDataURL(otpauth, (err, imageUrl) => {
      if (err) {
        console.log('Error with QR');
        return resolve('')
      }
      resolve(imageUrl)
    });
  })
}

export async function login(code = '', fromApp = false, longtime = false) {
  return new Promise((resolve, reject) => {
    const isValid = authenticator.verify({ token: code, secret });
    if (!isValid) {
      reject('动态验证码无效')
    }
    const token = jwt.sign({ user: TOTPCONF.user }, TOTPCONF.secret, { expiresIn: fromApp || longtime ? '365d' : '6h' })
    resolve(token)
  })
}

export function verifyToken(token = "") {
  return new Promise(resolve => {
    try {
      resolve(jwt.verify(token, TOTPCONF.secret))
    } catch (err) {
      resolve("")
    }
  })
}
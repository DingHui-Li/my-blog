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

export async function login(code = '') {
  return new Promise((resolve, reject) => {
    const isValid = authenticator.verify({ token: code, secret });
    if (!isValid) {
      reject('动态验证码无效')
    }
    const token = jwt.sign({ user: TOTPCONF.user }, TOTPCONF.secret, { expiresIn: '6h' })
    resolve(token)
  })
}

export function verifyToken(token = "") {
  return jwt.verify(token, TOTPCONF.secret)
}
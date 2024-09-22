import request from 'request'
import * as FileService from './file'
import Article from "../models/article";

export function saveNetworkImg(url = "") {
  return new Promise((resolve) => {
    if (!url) {
      return resolve("")
    }
    if (url?.includes('blog465467.oss-cn-guangzhou.aliyuncs.com')) {
      return resolve(url)
    }
    url = url.replace('img2.doubanio.com', 'img3.doubanio.com')
    let req = request({
      url,
      method: "GET",
      headers: {
        "response-type": "blob"
      }
    })
    let chunks = []
    req.on('error', err => {
      resolve(url)
    })
    req.on('data', chunk => {
      chunks.push(chunk)
    })
    req.on('end', async (res) => {
      try {
        let buffer = Buffer.concat(chunks);
        let fileName = FileService.getFileHash(buffer) + '.jpg'
        url = await FileService.uploadImg('/movie/' + fileName, buffer)
        resolve(url)
      } catch (err) {
        resolve(url)
      }
    })
  })
}

export async function stByDate({ year, type } = {}) {
  if (!year) {
    year = new Date().getFullYear()
  }
  let aggregate = [];
  if (type) {
    aggregate = [
      {
        $match: { 'type': { $regex: type } }
      },
    ]
  }
  aggregate = [
    ...aggregate,
    {
      $project: {
        "createTime": { $toDate: "$createTime" },
      }
    },
    {
      $project: {
        "date": {
          $dateToString: { format: '%Y-%m-%d', date: '$createTime', timezone: "Asia/Shanghai" }
        }
      }
    },
    {
      "$match": { date: { $regex: `${year}` } }
    },
    {
      $group: {
        _id: '$date', count: { $sum: 1 }
      }
    },
    { $project: { date: '$_id', _id: 0, count: 1 } }
  ]
  let res = await Article.aggregate(aggregate)
  return res
}

export async function getContentById(ids = []) {
  let t = []
  for (const id of ids) {
    let content = await Article.find({ _id: id }).select({ htmlContent: 0 }).populate("topics")
    t.push(content[0])
  }
  return t
}

export function searchForSameDay(day = `${new Date().getMonth() + 1}-${new Date().getDate()}`) {
  let arr = []
  for (let year = new Date().getFullYear() - 1; year >= 2023; year--) {
    arr.push([
      new Date(`${year}-${day} 0:0:0`).getTime(),
      new Date(`${year}-${day} 23:59:59`).getTime(),
    ])
  }
  return Article.find({
    $or: arr.map(item => {
      return {
        createTime: { $gte: item[0], $lte: item[1] }
      }
    })
  }).select({ htmlContent: 0 })
}

export function handleOnleSelf(list = []) {
  return list.map(item => {
    if (item.onlySelf) {
      item.imgs = []
      item.textContent = item.textContent.replace(/./g, '*')
      item.desc = item.desc.replace(/./g, '*')
    }
    return item
  })
}
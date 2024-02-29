export const DEG2RAD = Math.PI / 180;
import { Vector3 } from 'three';

//获取图片数据
export function getImageData(imageUrl) {
    return new Promise(resolve => {
        const image = document.createElement('img')
        image.src = imageUrl
        image.setAttribute('crossOrigin', 'anonymous')
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        image.onload = (e) => {
            ctx.canvas.width = image.width;
            ctx.canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            resolve(ctx.getImageData(0, 0, image.width, image.height))
        }
    })
}

//根据经纬度判断有效点
export function visibilityForCoordinate(long, lat, imageData) {
    const dataSlots = 4;                              //R、G、B、A 每个像素用4个1bytes值
    const dataRowCount = imageData.width * dataSlots; //行数据个数
    const x = parseInt((long + 180) / 360 * imageData.width + 0.5);   //根据经度计算横坐标  (-180,180) => (0,360)
    const y = imageData.height - parseInt((lat + 90) / 180 * imageData.height - 0.5); //纬度范围 (-90,90) => (0,180) 上面是0 所以用imageData.height来减
    const alphaDataSlot = parseInt(dataRowCount * (y - 1) + x * dataSlots) + (dataSlots - 1);

    return imageData.data[alphaDataSlot] > 90;     //该点在图片上的透明度大于阈值
}

//将极坐标转化为笛卡尔坐标
export function polarToCartesian(lat, lon, radius, out) {     //根据球的参数方程来转化
    out = out || new Vector3();
    const phi = (90 - lat) * DEG2RAD;
    const theta = (lon + 180) * DEG2RAD;
    out.set(-(radius * Math.sin(phi) * Math.cos(theta)), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
    return out;
}

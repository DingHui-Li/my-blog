import { Vector3 } from 'three';

const DEG2RAD = Math.PI / 180;
function getImageData(imageUrl) {
  return new Promise((resolve) => {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.setAttribute("crossOrigin", "anonymous");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    image.onload = (e) => {
      ctx.canvas.width = image.width;
      ctx.canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);
      resolve(ctx.getImageData(0, 0, image.width, image.height));
    };
  });
}
function visibilityForCoordinate(long, lat, imageData) {
  const dataSlots = 4;
  const dataRowCount = imageData.width * dataSlots;
  const x = parseInt((long + 180) / 360 * imageData.width + 0.5);
  const y = imageData.height - parseInt((lat + 90) / 180 * imageData.height - 0.5);
  const alphaDataSlot = parseInt(dataRowCount * (y - 1) + x * dataSlots) + (dataSlots - 1);
  return imageData.data[alphaDataSlot] > 90;
}
function polarToCartesian(lat, lon, radius, out) {
  out = out || new Vector3();
  const phi = (90 - lat) * DEG2RAD;
  const theta = (lon + 180) * DEG2RAD;
  out.set(-(radius * Math.sin(phi) * Math.cos(theta)), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
  return out;
}

export { DEG2RAD, getImageData, polarToCartesian, visibilityForCoordinate };
//# sourceMappingURL=util-fab9bcf9.mjs.map

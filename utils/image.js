/**
 * 图片处理工具类
 */

/**
 * 压缩图片
 * @param {File} file - 原始图片文件
 * @param {Object} options - 压缩选项
 * @param {number} options.quality - 压缩质量 (0-1)
 * @param {number} options.maxWidth - 最大宽度
 * @param {number} options.maxHeight - 最大高度
 * @param {number} options.convertSize - 超过多大才触发压缩 (单位: Byte)，默认 500KB
 * @returns {Promise<File>} - 压缩后的文件或原始文件
 */
export async function compressImage(file, { quality = 0.8, maxWidth = 2000, maxHeight = 2000, convertSize = 500 * 1024 } = {}) {
  // 非图片或小于指定大小，不处理
  if (!file || !file.type.startsWith('image/') || file.size < convertSize) {
    return file;
  }

  // GIF 不建议在前端通过 canvas 压缩，因为会丢失动画
  if (file.type === 'image/gif') {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // 计算缩放比例
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        } else {
          // 如果尺寸已经在范围内，且文件类型是 WebP/JPEG 这种支持质量压缩的，可以只做质量压缩
          // 但为了简单统一，我们都走一遍 canvas
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        // 清除画布
        ctx.clearRect(0, 0, width, height);
        // 绘制图片
        ctx.drawImage(img, 0, 0, width, height);

        // 默认压缩成原始格式，如果原始格式不支持压缩质量（如 png），则使用 image/jpeg
        let targetType = file.type;
        if (targetType === 'image/png') {
            // PNG 压缩效果有限，通常转为 JPEG 效果更好，但如果用户需要透明度则会有问题
            // 这里我们保持原格式，或者根据需求决定是否转 JPEG
        }

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve(file);
            }
            
            // 只有压缩后的文件更小时才使用压缩后的
            if (blob.size < file.size) {
              const compressedFile = new File([blob], file.name, {
                type: blob.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          targetType,
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}

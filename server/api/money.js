import BaseResponse from "../base/baseResponse";
import Tesseract from 'tesseract.js';

export let test = defineEventHandler(async (event) => {
    let text = await Tesseract.recognize(
        'http://blog465467.oss-cn-guangzhou.aliyuncs.com/photo/912b45ced5181d1f75b52fcc108442d3a40e908780c381ab3b583171ad3a50d0.png',
        'chi_sim',
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
        return text
    })
    text = text.split('\n');
    let totalNums = '';
    text = text.map(item => {
        item = item.replaceAll(', ', '.').replaceAll(',', '.').replaceAll(' ', '')
        if (item.includes('应付合计')) {
            item?.split('')?.forEach(element => {
                if (!isNaN(element) || element == '.') {
                    totalNums += element
                }
            });
            if (totalNums[0] == '.') { totalNums = totalNums.replace('.', '') }
        }
        return item
    })
    return new BaseResponse({ data: totalNums });
});
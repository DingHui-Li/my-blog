export function throttle(func, interval = 100) {
    let sign = true;
    return function () {
        if (!sign) return;
        console.log('run')
        sign = false;
        setTimeout(() => {
            func.apply(this, arguments)
            sign = true;
        }, interval)
    }
}
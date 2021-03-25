
//获取除去时分秒的日期
export function getDay(time:string) {
    if (!time) {
        return ''
    }
    let day = time.trim().split(/\s+/)[0]
    return day
}

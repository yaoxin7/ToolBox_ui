// TODO 格式化时间 2023-08-23T08:28:16.000+00:00 -> YYYY年MM月DD日
const formatDate = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}年${month}月${day}日`
}

export default formatDate
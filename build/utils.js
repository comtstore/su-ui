
// 将对象展开成数组 { key: value } => [{ key: key, value: value }] 
const parseObject2Array = (targetObject, key, value) => {
    return Object.keys(targetObject).reduce((prev, cur) => {
        // @ts-ignore
        prev.push({
            [key]: cur,
            [value]: targetObject[cur]
        })
        return prev
    }, [])
}

module.exports = {
    parseObject2Array
}
   
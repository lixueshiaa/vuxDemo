/**
 * @param 获取n位的数字随机数
 */
export const randomn = function (n) {
  if (n > 21) return null
  return parseInt((Math.random() + 1) * Math.pow(10, n - 1))
}

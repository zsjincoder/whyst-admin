export default {
  isShow: [
    { label: '显示', value: 1 },
    { label: '隐藏', value: 0 }
  ],
  // 返回枚举值
  enumValue(enumKey, value) {
    return this[enumKey].find(item => item.value === value).label
  }
}

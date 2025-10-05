export const copy = (value: any, showTips = true) => {
  // 需要复制的内容
  const csvContent = typeof value === 'string' ? value : JSON.stringify(value)

  // 复制到剪贴板
  navigator.clipboard.writeText(csvContent)

  // 提示用户复制成功
  if (showTips) alert('copied successfully!')
}

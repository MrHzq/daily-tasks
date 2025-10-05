// 定义标签类型
export interface Tag {
  id: string
  name: string
}

// 标签颜色映射
export const tagColorMap: Record<string, { bg: string; text: string; border: string }> = {
  sleep: { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-l-sky-500' },
  work: { bg: 'bg-red-50', text: 'text-red-800', border: 'border-l-red-500' },
  eat: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-l-blue-500' },
  free: { bg: 'bg-green-50', text: 'text-green-800', border: 'border-l-green-500' },
}

// 保存标签到本地存储
export const saveTagsToLocalStorage = (tags: Tag[]) => {
  localStorage.setItem('tags', JSON.stringify(tags))
}

// 获取标签列表
export const getTagsToLocalStorage = (): Tag[] => {
  const savedTags = localStorage.getItem('tags')
  if (savedTags) return JSON.parse(savedTags)
  else return []
}

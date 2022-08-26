/*
 * 国际化处理
 * 需要考虑国际化的地方有
 * - 组件, 如国家列表
 * - 用户协议等法务html文件对应的语种(外部提供)
 * - 更新语言的时候需要更新此列表内的所有参数
 */
import { getURLSearchParams } from './index'
const DEFAULT_LOCALE = 'en-US'
const handleLangFlag = () => {
  const value = getURLSearchParams('lang_flag')
  const langFlag: string = typeof value === 'object' ? '' : value
  return langFlag
}

const handleBrowserLanguage = () => {
  const language = (
    navigator.language || navigator.browserLanguage
  ).toLowerCase()
  const browserLang = parseNavigatorLanguage(language)
  return browserLang
}

// 各浏览器对 navigator 对象中几个与语言相关的属性的返回值存在差异, 需要兼容处理
function parseNavigatorLanguage(language: string) {
  const CHINESE_LANGUAGE_GROUP = ['zh-hk', 'zh-tw', 'zh-sg']
  if (CHINESE_LANGUAGE_GROUP.includes(language)) {
    return 'zh-TW'
  }
  else if (language === 'ja-jp') {
    return 'ja-JP'
  }
  else if (language === 'zh-cn') {
    return 'zh-CN'
  }
  else {
    return DEFAULT_LOCALE
  }
}

let locale: string | undefined

export function getLocale() {
  const arr = [
    handleLangFlag,
    handleBrowserLanguage,
  ]
  let result
  for (let i = 0; i < arr.length; i++) {
    result = arr[i]()
    if (result) break
  }
  return locale = result
}

export function getResultLocale() {
  return locale
}

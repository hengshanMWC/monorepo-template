/*
 * 国际化处理
 * 需要考虑国际化的地方有
 * - 组件, 如国家列表
 * - 用户协议等法务html文件对应的语种(外部提供)
 * - 更新语言的时候需要更新此列表内的所有参数
 */
import { getURLSearchParams } from './index'

const LEGAL_LOCALES = ['en-US', 'zh-CN']

const handleLangFlag = (locales: string[]) => {
  const value = getURLSearchParams('lang_flag')
  const langFlag: string = typeof value === 'object' ? '' : value
  if (locales.includes(langFlag)) {
    return langFlag
  }
}

const handleBrowserLanguage = (locales: string[], defaultLocales: string) => {
  const language = (
    navigator.language || navigator.browserLanguage
  ).toLowerCase()
  const browserLang = parseNavigatorLanguage(language, defaultLocales)
  if (locales.includes(browserLang)) {
    return browserLang
  }
}

const handleSystemLanguage = (locales: string[], defaultLocales: string) => {
  const language = navigator.userLanguage || navigator.systemLanguage
  const systemLang = parseNavigatorLanguage(language, defaultLocales)
  if (locales.includes(systemLang)) {
    return systemLang
  }
}

// 各浏览器对 navigator 对象中几个与语言相关的属性的返回值存在差异, 需要兼容处理
function parseNavigatorLanguage(language: string, defaultLocales: string) {
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
    return defaultLocales
  }
}

let locale: string | undefined

export function getLocale(locales: string[] = LEGAL_LOCALES, defaultLocales = 'en-US') {
  const arr = [
    handleLangFlag,
    handleBrowserLanguage,
    handleSystemLanguage,
  ]
  let result
  for (let i = 0; i < arr.length; i++) {
    result = arr[i](locales, defaultLocales)
    if (result) break
  }
  locale = result || defaultLocales
  return result
}

export function getResultLocale() {
  return locale
}

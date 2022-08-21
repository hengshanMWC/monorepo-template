declare global {
  interface Navigator {
    readonly browserLanguage: string
    readonly userLanguage: string
    readonly systemLanguage: string
  }
}
export {}

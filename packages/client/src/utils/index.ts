export function getURLSearchParams(query: string) {
  return new URLSearchParams(window.location.search).get(query)
}

export function getEnv(locale) {

}

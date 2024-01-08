export const isValidLanguageTag = (tag: string): boolean => {
  return tag.match(/^([a-z]{2,3})(-([a-z]{2}|[0-9]{3}))?$/i) !== null
}

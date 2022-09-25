export function isRequiredField<T extends { isDraft: boolean }>(this: T): boolean {
  return !this.isDraft
}

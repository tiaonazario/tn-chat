import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFallbackName(fullName: string) {
  const names = fullName.split(' ')
  const nameSize = names.length
  if (nameSize > 1) {
    return names[0].slice(0, 1) + names[nameSize - 1].slice(0, 1)
  }
  return names[0].slice(0, 2)
}

export const dateFormatter = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    dateStyle: 'short',
  },
) => {
  return new Intl.DateTimeFormat('pt-BR', options).format(date)
}

export function truncateWord(word: string) {
  return word.length > 25 ? word.slice(0, 25) + '...' : word
}

export function chatHrefConstructor(id1: string, id2: string) {
  return [id1, id2].sort().join('--')
}

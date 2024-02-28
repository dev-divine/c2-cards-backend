import { format } from 'date-fns'

function dateToIsoString(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export const Format = {
  dateToIsoString,
}

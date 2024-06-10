// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import dayjs, { extend, Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import localizedFormat from 'dayjs/plugin/localizedFormat'

extend(utc)
extend(tz)
extend(duration)
extend(localizedFormat)

export { dayjs, Dayjs }

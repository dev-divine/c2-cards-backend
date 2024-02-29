import { OnlineSchedule } from '@modules/schedule/entities/online-schedule'

export interface OnlineScheduleRepository {
  create(eCClient: OnlineSchedule): Promise<void>
}

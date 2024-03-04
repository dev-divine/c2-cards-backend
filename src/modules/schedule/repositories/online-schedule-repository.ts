import { OnlineSchedule } from '@modules/schedule/entities/online-schedule'

export interface OnlineScheduleRepository {
  create(ecClient: OnlineSchedule): Promise<void>
}

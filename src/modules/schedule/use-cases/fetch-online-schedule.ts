import { execSync } from 'node:child_process'

import { OnlineScheduleRepository } from '@modules/schedule/repositories/online-schedule-repository'

import { RegisteringEntities } from '@infra/providers/registering-entities/registering-entities'
import { OnlineSchedule } from '../../../../tmp'
import { attemptFileTransferAndUnzip } from '@core/utils/online-schedule-import'

interface Input {
  originatorDocument: string
  financierCnpj: string
  accreditorCnpj: string
  paymentArrangementCode: string
  startDate: string
  endDate: string
}

interface Output {
  schedule: OnlineSchedule | undefined
}

export class FetchOnlineScheduleUseCase {
  constructor(
    private readonly onlineScheduleRepository: OnlineScheduleRepository,
    private readonly registeringEntities: RegisteringEntities,
  ) {}

  async execute({
    originatorDocument,
    financierCnpj,
    accreditorCnpj,
    paymentArrangementCode,
    startDate,
    endDate,
  }: Input): Promise<Output> {
    const response = await this.registeringEntities.showOnlineSchedule({
      originatorDocument,
      financierCnpj,
      accreditorCnpj,
      paymentArrangementCode,
      startDate,
      endDate,
    })

    if (!response || !!response.success) {
      throw new Error('Error on registering opt-in')
    }

    const { scheduleProtocol, requestStatus } = response

    const schedule = OnlineSchedule.create({
      scheduleProtocol,
      requestStatus,
      accreditorCnpj,
      financierCnpj,
      originatorDocument,
      paymentArrangementCode,
      startDate,
      endDate,
    })

    await this.onlineScheduleRepository.create(schedule)

    const tmpPath = '../../../../tmp'

    // execSync(
    //   `scp -r -i ../../../../auth/sftp-chave-privada-c2.pem -P 9039 ctpsi_cred2cards@Conecta-balcao.b3.com.br:/ArqsBatch/*${scheduleProtocol}* ${tmpPath}`,
    // )

    // execSync(`./unzip_all.sh`)

    attemptFileTransferAndUnzip({ tmpPath, scheduleProtocol }).then(
      (jsonData) => {
        if (jsonData) {
          const dadosControle = await prisma.dadosControle.create({
            data: {
              ...data.dadosControle,
              dataCriacao: new Date(data.dadosControle.dataCriacao),
              dataReferencia: new Date(data.dadosControle.dataReferencia),
              dataHoraSolicitacao: new Date(
                data.dadosControle.dataHoraSolicitacao,
              ),
              dataHoraRecepcao: new Date(data.dadosControle.dataHoraRecepcao),
              anuencia: {
                create: data.anuencia.map((anuencia) => ({
                  ...anuencia,
                  dataFimAnuencia: new Date(anuencia.dataFimAnuencia),
                })),
              },
              unidadesRecebiveis: {
                create: data.unidadesRecebiveis.map((unidade) => ({
                  ...unidade,
                  dataPrevistaLiquidacao: new Date(
                    unidade.dataPrevistaLiquidacao,
                  ),
                  valores: {
                    create: [unidade.valores],
                  },
                })),
              },
            },
          })
        }
      },
    )

    return {
      schedule,
    }
  }
}

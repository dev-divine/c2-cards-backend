import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeCreateURUseCase } from '@modules/ur/use-cases/factories/make-create-ur'

const bodySchema = z.object({
  contract_external_code: z.string(zodStringParser('contract_external_code')),
  contract_identifier: z.string(zodStringParser('contract_identifier')),
  holder_document: z.string(zodStringParser('holder_document')),
  covered_receivables: z.any({ description: 'recebiveis abrangidos' }),
  holder_domicile_document: z.string(
    zodStringParser('CPF/CNPJ do estabelecimento'),
  ),
  account_type: z.string(zodStringParser('tipoConta')),
  compe: z.string(zodStringParser('compe')),
  ispb: z.string(zodStringParser('ispb')),
  agency: z.string(zodStringParser('agencia')),
  account_number: z.string(zodStringParser('numeroConta')),
})

export async function createUr(request: FastifyRequest, reply: FastifyReply) {
  const {
    contract_external_code: contractExternalCode,
    contract_identifier: contractIdentifier,
    holder_document: holderDocument,
    covered_receivables: coveredReceivables,
    holder_domicile_document: holderDomicileDocument,
    account_type: accountType,
    compe,
    ispb,
    agency,
    account_number: accountNumber,
  } = bodySchema.parse(request.body)

  const createURUseCase = makeCreateURUseCase()

  await createURUseCase.execute({
    contractExternalCode,
    contractIdentifier,
    holderDocument,
    coveredReceivables,
    holderDomicileDocument,
    accountType,
    compe,
    ispb,
    agency,
    accountNumber,
  })

  return reply.status(201).send()
}

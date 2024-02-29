import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeEditDomicileURUseCase } from '@modules/ur/use-cases/factories/make-edit-domicile-ur'

const bodySchema = z.object({
  external_contract_code: z.string(
    zodStringParser('código externo do contrato'),
  ),
  contract_identifier: z.string(zodStringParser('identificador do contrato')),
  holder_domicile_document: z.string(
    zodStringParser('CPF/CNPJ do estabelecimento'),
  ),
  account_type: z.string(zodStringParser('tipoConta')),
  compe: z.string(zodStringParser('compe')),
  ispb: z.string(zodStringParser('ispb')),
  agency: z.string(zodStringParser('agencia')),
  account_number: z.string(zodStringParser('numeroConta')),
})

export async function editDomicileUr(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    external_contract_code: externalContractCode,
    contract_identifier: contractIdentifier,
    holder_domicile_document: holderDomicileDocument,
    account_type: accountType,
    compe,
    ispb,
    agency,
    account_number: accountNumber,
  } = bodySchema.parse(request.body)

  const editDomicileURUseCase = makeEditDomicileURUseCase()

  await editDomicileURUseCase.execute({
    externalContractCode,
    contractIdentifier,
    holderDomicileDocument,
    accountType,
    compe,
    ispb,
    agency,
    accountNumber,
  })

  return reply.status(204).send()
}

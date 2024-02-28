import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeCreateOptOutUseCase } from '@modules/opts/use-cases/factories/make-create-opt-out'

const bodySchema = z.object({
  company_name: z.string(zodStringParser('nome da empresa')),
  company_document: z
    .string(zodStringParser('CPF/CNPJ'))
    .min(11, 'O CPF deve ter 11 caracteres.')
    .max(14, 'O CNPJ deve ter 14 caracteres.'),
  responsible_name: z.string(zodStringParser('nome do responsável')),
  responsible_email: z
    .string(zodStringParser('e-mail do responsável'))
    .email('O e-mail do responsável informado é inválido.'),
  responsible_phone: z
    .string(zodStringParser('telefone do responsável'))
    .min(1, 'O telefone é obrigatório.'),
  responsible_document: z
    .string(zodStringParser('CPF do responsável'))
    .transform((cpf) => cpf.replace(/\D/g, '')),
  external_code: z.string(zodStringParser('código externo')),
  b3_protocol: z.string(zodStringParser('protocolo B3')),
})

export async function createOptOut(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    company_name: companyName,
    company_document: companyDocument,
    responsible_name: responsibleName,
    responsible_email: responsibleEmail,
    responsible_phone: responsiblePhone,
    responsible_document: responsibleDocument,
    external_code: externalCode,
    b3_protocol: b3Protocol,
  } = bodySchema.parse(request.body)

  const createOptOutUseCase = makeCreateOptOutUseCase()

  await createOptOutUseCase.execute({
    companyName,
    companyDocument,
    responsibleName,
    responsibleEmail,
    responsiblePhone,
    responsibleDocument,
    externalCode,
    b3Protocol,
  })

  return reply.status(201).send()
}

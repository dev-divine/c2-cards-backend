import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { makeCreateOptOutUseCase } from '@modules/opt/use-cases/factories/make-create-opt-out'
import { OptOutViewModel } from '@modules/opt/http/view-models/opt-out-view-model'

const bodySchema = z.object({
  companyName: z.string(zodStringParser('nome da empresa')),
  companyDocument: z
    .string(zodStringParser('CPF/CNPJ'))
    .min(11, 'O CPF deve ter 11 caracteres.')
    .max(14, 'O CNPJ deve ter 14 caracteres.'),
  responsibleName: z.string(zodStringParser('nome do responsável')),
  responsibleEmail: z
    .string(zodStringParser('e-mail do responsável'))
    .email('O e-mail do responsável informado é inválido.'),
  responsiblePhone: z
    .string(zodStringParser('telefone do responsável'))
    .min(1, 'O telefone é obrigatório.'),
  responsibleDocument: z
    .string(zodStringParser('CPF do responsável'))
    .transform((cpf) => cpf.replace(/\D/g, '')),
  externalCode: z.string(zodStringParser('código externo')),
  b3Protocol: z.string(zodStringParser('protocolo B3')),
})

export async function createOptOut(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    companyName,
    companyDocument,
    responsibleName,
    responsibleEmail,
    responsiblePhone,
    responsibleDocument,
    externalCode,
    b3Protocol,
  } = bodySchema.parse(request.body)

  const createOptOutUseCase = makeCreateOptOutUseCase()

  const { optOut } = await createOptOutUseCase.execute({
    companyName,
    companyDocument,
    responsibleName,
    responsibleEmail,
    responsiblePhone,
    responsibleDocument,
    externalCode,
    b3Protocol,
  })

  return reply.status(201).send({
    optOut: optOut ? OptOutViewModel.toHTTP(optOut) : undefined,
  })
}

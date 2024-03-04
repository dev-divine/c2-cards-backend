import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { zodStringParser } from '@core/utils/custom-zod-error'

import { EcClientViewModel } from '@modules/ec-client/http/view-models/ec-client-view-model'
import { makeSaveECClientUseCase } from '@modules/ec-client/use-cases/factories/make-save-ec-client'

const paramsSchema = z.object({
  id: z
    .string(zodStringParser('id'))
    .uuid({ message: 'O campo id deve ser um uuid.' }),
})

const bodySchema = z.object({
  companyName: z.string(zodStringParser('nome da empresa')),
  companyDocument: z
    .string(zodStringParser('CPF/CNPJ'))
    .min(11, 'O CPF deve ter 11 caracteres.')
    .max(14, 'O CNPJ deve ter 14 caracteres.'),
  companyPhone: z
    .string(zodStringParser('telefone'))
    .min(1, 'O telefone é obrigatório.'),
  companyEmail: z
    .string(zodStringParser('e-mail'))
    .email('O e-mail informado é inválido.'),
  companyZipCode: z.string(zodStringParser('CEP')),
  companyState: z.string(zodStringParser('estado')),
  companyCity: z.string(zodStringParser('cidade')),
  companyNeighborhood: z.string(zodStringParser('bairro')),
  companyStreet: z.string(zodStringParser('rua')),
  companyNumber: z.string(zodStringParser('número')),
  companyComplement: z.string(zodStringParser('complemento')).optional(),
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
  responsibleZipCode: z
    .string(zodStringParser('CEP do responsável'))
    .optional(),
  responsibleState: z
    .string(zodStringParser('estado do responsável'))
    .optional(),
  responsibleCity: z
    .string(zodStringParser('cidade do responsável'))
    .optional(),
  responsibleNeighborhood: z
    .string(zodStringParser('bairro do responsável'))
    .optional(),
  responsibleStreet: z.string(zodStringParser('rua do responsável')).optional(),
  responsibleNumber: z
    .string(zodStringParser('número do responsável'))
    .optional(),
  responsibleComplement: z
    .string(zodStringParser('complemento do responsável'))
    .optional(),
})

export async function saveECClient(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(request.params)

  const {
    companyName,
    companyDocument,
    companyPhone,
    companyEmail,
    companyZipCode,
    companyState,
    companyCity,
    companyNeighborhood,
    companyStreet,
    companyNumber,
    companyComplement,
    responsibleName,
    responsibleEmail,
    responsiblePhone,
    responsibleDocument,
    responsibleZipCode,
    responsibleState,
    responsibleCity,
    responsibleNeighborhood,
    responsibleStreet,
    responsibleNumber,
    responsibleComplement,
  } = bodySchema.parse(request.body)

  const saveECClientUseCase = makeSaveECClientUseCase()

  const { ecClient } = await saveECClientUseCase.execute({
    id,
    companyName,
    companyDocument,
    companyPhone,
    companyEmail,
    companyZipCode,
    companyState,
    companyCity,
    companyNeighborhood,
    companyStreet,
    companyNumber,
    companyComplement,
    responsibleName,
    responsibleEmail,
    responsiblePhone,
    responsibleDocument,
    responsibleZipCode,
    responsibleState,
    responsibleCity,
    responsibleNeighborhood,
    responsibleStreet,
    responsibleNumber,
    responsibleComplement,
  })

  return reply.status(200).send({
    ecClient: ecClient ? EcClientViewModel.toHTTP(ecClient) : undefined,
  })
}

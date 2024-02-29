// import { FastifyReply, FastifyRequest } from 'fastify'
// import { z } from 'zod'

// import { zodStringParser } from '@core/utils/custom-zod-error'

// import { makeEditDetailedURUseCase } from '@infra/config/unused/make-edit-detailed-ur'
// import { CitizenViewModel } from '@modules/citizen/http/view-models/citizen-view-model'

// const paramsSchema = z.object({
//   id: z
//     .string(zodStringParser('id'))
//     .uuid({ message: 'O campo id deve ser um uuid.' }),
// })

// const bodySchema = z.object({
//   company_name: z.string(zodStringParser('nome da empresa')),
//   company_document: z
//     .string(zodStringParser('CPF/CNPJ'))
//     .min(11, 'O CPF deve ter 11 caracteres.')
//     .max(14, 'O CNPJ deve ter 14 caracteres.'),
//   company_phone: z
//     .string(zodStringParser('telefone'))
//     .min(1, 'O telefone é obrigatório.'),
//   company_email: z
//     .string(zodStringParser('e-mail'))
//     .email('O e-mail informado é inválido.'),
//   company_zip_code: z.string(zodStringParser('CEP')),
//   company_state: z.string(zodStringParser('estado')),
//   company_city: z.string(zodStringParser('cidade')),
//   company_neighborhood: z.string(zodStringParser('bairro')),
//   company_street: z.string(zodStringParser('rua')),
//   company_number: z.string(zodStringParser('número')),
//   company_complement: z.string(zodStringParser('complemento')).optional(),
//   responsible_name: z.string(zodStringParser('nome do responsável')),
//   responsible_email: z
//     .string(zodStringParser('e-mail do responsável'))
//     .email('O e-mail do responsável informado é inválido.'),
//   responsible_phone: z
//     .string(zodStringParser('telefone do responsável'))
//     .min(1, 'O telefone é obrigatório.'),
//   responsible_document: z
//     .string(zodStringParser('CPF do responsável'))
//     .transform((cpf) => cpf.replace(/\D/g, '')),
//   responsible_zip_code: z
//     .string(zodStringParser('CEP do responsável'))
//     .optional(),
//   responsible_state: z
//     .string(zodStringParser('estado do responsável'))
//     .optional(),
//   responsible_city: z
//     .string(zodStringParser('cidade do responsável'))
//     .optional(),
//   responsible_neighborhood: z
//     .string(zodStringParser('bairro do responsável'))
//     .optional(),
//   responsible_street: z
//     .string(zodStringParser('rua do responsável'))
//     .optional(),
//   responsible_number: z
//     .string(zodStringParser('número do responsável'))
//     .optional(),
//   responsible_complement: z
//     .string(zodStringParser('complemento do responsável'))
//     .optional(),
// })

// export async function editDetailedUr(
//   request: FastifyRequest,
//   reply: FastifyReply,
// ) {
//   const { id } = paramsSchema.parse(request.params)

//   const {
//     company_name: companyName,
//     company_document: companyDocument,
//     company_phone: companyPhone,
//     company_email: companyEmail,
//     company_zip_code: companyZipCode,
//     company_state: companyState,
//     company_city: companyCity,
//     company_neighborhood: companyNeighborhood,
//     company_street: companyStreet,
//     company_number: companyNumber,
//     company_complement: companyComplement,
//     responsible_name: responsibleName,
//     responsible_email: responsibleEmail,
//     responsible_phone: responsiblePhone,
//     responsible_document: responsibleDocument,
//     responsible_zip_code: responsibleZipCode,
//     responsible_state: responsibleState,
//     responsible_city: responsibleCity,
//     responsible_neighborhood: responsibleNeighborhood,
//     responsible_street: responsibleStreet,
//     responsible_number: responsibleNumber,
//     responsible_complement: responsibleComplement,
//   } = bodySchema.parse(request.body)

//   const editDetailedURUseCase = makeEditDetailedURUseCase()

//   await editDetailedURUseCase.execute({
//     id,
//     companyName,
//     companyDocument,
//     companyPhone,
//     companyEmail,
//     companyZipCode,
//     companyState,
//     companyCity,
//     companyNeighborhood,
//     companyStreet,
//     companyNumber,
//     companyComplement,
//     responsibleName,
//     responsibleEmail,
//     responsiblePhone,
//     responsibleDocument,
//     responsibleZipCode,
//     responsibleState,
//     responsibleCity,
//     responsibleNeighborhood,
//     responsibleStreet,
//     responsibleNumber,
//     responsibleComplement,
//   })

//   return reply.status(200).send()
// }

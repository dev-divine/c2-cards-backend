import axios, { Axios } from 'axios'

import { C2CardsCode } from '@core/utils/c2-cards-code'

import { env } from '@infra/env'
import {
  CreateContractInputDTO,
  CreateContractOutputDTO,
} from '@infra/providers/registering-entities/dtos/create-contract-dto'
import {
  CreateURInputDTO,
  CreateUROutputDTO,
} from '@infra/providers/registering-entities/dtos/create-ur-dto'
import {
  OptInInputDTO,
  OptInOutputDTO,
} from '@infra/providers/registering-entities/dtos/opt-in-dto'
import {
  OptOutInputDTO,
  OptOutOutputDTO,
} from '@infra/providers/registering-entities/dtos/opt-out-dto'
import {
  RemoveContractInputDTO,
  RemoveContractOutputDTO,
} from '@infra/providers/registering-entities/dtos/remove-contract-dto'
import {
  RemoveURInputDTO,
  RemoveUROutputDTO,
} from '@infra/providers/registering-entities/dtos/remove-ur-dto'
import {
  SaveContractInputDTO,
  SaveContractOutputDTO,
} from '@infra/providers/registering-entities/dtos/save-contract-dto'
import {
  SaveURDetailedInputDTO,
  SaveURDetailedOutputDTO,
} from '@infra/providers/registering-entities/dtos/save-ur-detailed-dto'
import {
  SaveURDomicileInputDTO,
  SaveURDomicileOutputDTO,
} from '@infra/providers/registering-entities/dtos/save-ur-domicile-dto'
import {
  SaveURSimplifiedInputDTO,
  SaveURSimplifiedOutputDTO,
} from '@infra/providers/registering-entities/dtos/save-ur-simplified-dto'
import { ShowContractOutPutDTO } from '@infra/providers/registering-entities/dtos/show-contract-dto'
import {
  ShowURInputDTO,
  ShowUROutputDTO,
} from '@infra/providers/registering-entities/dtos/show-ur-dto'
import { RegisteringEntities } from '@infra/providers/registering-entities/registering-entities'

export class B3 implements RegisteringEntities {
  request: Axios

  constructor() {
    this.request = axios.create({
      baseURL: 'https://api-balcao.b3.com.br',
    })
  }

  async registerOptIn(
    params: OptInInputDTO,
  ): Promise<OptInOutputDTO | undefined> {
    try {
      const { data } = await this.request.post('/v1.0/optin', {
        Optin: [
          {
            codigoExterno: C2CardsCode.generateExternalCode(),
            cnpjSolicitante: env.C2_CARDS_DOCUMENT,
            cnpjFinanciador: params.financialAgentDocument, // agente financeiro
            documentoUsuarioFinalRecebedor: params.ecClientDocument,
            dataAssinatura: params.signatureDate ?? new Date(), // string
            dataEfetivacao: new Date(), // string
            dataExpiracao: params.expirationDate, // string
          },
        ],
      })

      return {
        externalCode: data.codigoExterno,
        protocol: data.protocolo, // Manda no optout
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  async registerOptOut(
    params: OptOutInputDTO,
  ): Promise<OptOutOutputDTO | undefined> {
    try {
      const { data } = await this.request.put('v1.0/optout', {
        Optout: [
          {
            codigoExterno: params.externalCode,
            cnpjSolicitante: env.C2_CARDS_DOCUMENT,
            protocolo: params.protocol,
          },
        ],
      })

      return {
        externalCode: data.codigoExterno,
        protocol: data.protocolo,
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  async showContract(
    externalCode: string,
  ): Promise<ShowContractOutPutDTO | undefined> {
    try {
      const { data } = await this.request.get(
        `/v2/contrato/${externalCode}/${externalCode}`,
      )

      return {
        contract: {
          externalCode: data.codigoExterno,
          contractIdentifier: data.identificadorContrato,
          contractSituation: data.situacaoContrato,
          debtorContractDocument: data.documentoContratanteDivida, // CNPJ ou CPF do contratante da dívida com formatação "EC"
          participantDocument: data.cnpjParticipante,
          holderDocument: data.cnpjDetentor, // Agente financeiro
          contractEffectType: data.tipoEfeitoContrato,
          guaranteedOperationLimit: data.saldoDevedorOuLimite,
          minimumValueToBeMaintained: data.valorMinimoASerMantido,
          signatureDate: data.dataAssinatura,
          expirationDate: data.dataVencimento,
          divisionRule: data.regraDivisao,
          distributionResult: {
            affectedReceivablesUnitsQuantity:
              data.quantidadeUnidadesRecebiveisAfetadas,
            affectedReceivablesUnitsValue: data.valorUnidadesRecebiveisAfetadas,
            commitmentSituation: data.situacaoComprometimento,
          },
        },
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  async createContract(
    params: CreateContractInputDTO,
  ): Promise<CreateContractOutputDTO | undefined> {
    try {
      const { data } = await this.request.post('/v2/contrato', {
        Contrato: {
          codigoExterno: params.externalCode,
          identificadorContrato: params.externalCode,
          documentoContratanteDivida: params.debtorContractDocument, // CNPJ ou CPF do "EC" com formatação
          cnpjParticipante: params.participantDocument,
          cnpjDetentor: params.holderDocument, // Agente financeiro
          tipoEfeitoContrato: params.contractEffectType,
          saldoDevedorOuLimite: params.guaranteedOperationLimit,
          valorMinimoASerMantido: params.minimumValueToBeMaintained,
          dataAssinatura: params.signatureDate,
          dataVencimento: params.expirationDate,
          regraDivisao: params.divisionRule,
        },
      })

      return {
        success: true,
        externalCode: data.codigoExterno,
        contractIdentifier: data.identificadorContrato, // Usado nas URs
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  async saveContract(
    params: SaveContractInputDTO,
  ): Promise<SaveContractOutputDTO | undefined> {
    try {
      const { data } = await this.request.put('/v2/contrato', {
        Contrato: [
          {
            codigoExterno: params.externalCode,
            identificadorContrato: params.externalCode,
            saldoDevedorOuLimite: params.outstandingBalanceOrLimit,
            valorMinimoASerMantido: params.minimumValueToBeMaintained,
          },
        ],
      })

      return {
        externalCode: data.codigoExterno,
        contractIdentifier: data.identificadorContrato,
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  async removeContract(
    params: RemoveContractInputDTO,
  ): Promise<RemoveContractOutputDTO | undefined> {
    try {
      const { data, status } = await this.request.delete(
        `/v1.0/contrato/${params.operationType}/${params.externalCode}/${params.contractIdentifier}`,
      )

      return {
        success: status === 200,
        externalCode: data.codigoExterno,
        contractIdentifier: data.identificadorContrato,
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  async showUR(params: ShowURInputDTO): Promise<ShowUROutputDTO | undefined> {
    try {
      const { data, status } = await this.request.get(
        `/v2/definicao-unidades-recebiveis-detalhada/${params.externalContractCode}/${params.contractIdentifier}/${params.externalCode}`,
      )

      return {
        success: status === 200,
        externalCode: data.codigoExterno,
        externalContractCode: data.codigoExternoContrato,
        contractIdentifier: data.identificadorContrato,
        receivablesUnitsDefinition: {
          holderDocument: data.documentoTitular, // Agente financeiro - tipo efeito contrato troca de titularidade && Estabelecimento comercial - tipo efeito contrato - cessão fiduciária *IMPORTANTE - APENAS EM UR*
          divisionRule: data.regraDivisao,
          definitionStatus: data.situacaoDefinicao,
          commitmentStatus: data.situacaoComprometimento,
          coveredReceivables: [
            // Fazer um map para fazer o transform de cada item
            {
              registrarCNPJ: data.cnpjRegistradora,
              accreditorCNPJ: data.cnpjCredenciadora,
              contractEffectIdentifier: data.identificadorEfeitoContrato,
              finalRecipientUserDocument: data.documentoUsuarioFinalRecebedor, // EC
              paymentArrangementCode: data.codigoArranjoPagamento,
              constitutionStatus: data.situacaoConstituicao,
              settlementDate: data.dataLiquidacao,
              requestedEffectValue: data.valorEfeitoSolicitado,
              committedEffectValue: data.valorEfeitoComprometido,
              queueValue: data.valorFila,
              commitmentOrder: data.ordemComprometimento,
              totalConstitutedValue: data.valorConstituidoTotal,
              preContractedValue: data.valorPreContratado,
              freeBalance: data.saldoLivre,
              blockedValue: data.valorBloqueado,
            },
          ],
        },
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  async createUR(
    params: CreateURInputDTO,
  ): Promise<CreateUROutputDTO | undefined> {
    try {
      const { data, status } = await this.request.post(
        '/v2/definicao-unidades-recebiveis-detalhada',
        {
          DefinicaoUnidadesRecebiveis: {
            codigoExterno: params.externalCode,
            codigoExternoContrato: params.externalContractCode, // Iguais do contrato
            identificadorContrato: params.contractIdentifier, // Iguais do contrato
            documentoTitular: params.holderDocument, // EC
            recebiveisAbrangidos: params.coveredReceivables, // Fazer um map, importante
            pagamento: {
              documentoTitularDomicilio: params.payment.holderDomicileDocument, // Definir CNPJ ou CPF para receber na criação da UR
              tipoConta: params.payment.accountType,
              compe: params.payment.compe,
              ispb: params.payment.ispb,
              agencia: params.payment.agency,
              numeroConta: params.payment.accountNumber,
            },
          },
        },
      )

      return {
        success: status === 200,
        externalCode: data.codigoExterno,
        externalContractCode: data.codigoExternoContrato,
        contractIdentifier: data.identificadorContrato,
      }
    } catch (error: unknown) {
      console.log('error', error)
    }
  }

  // Atualizar ou deletar uma ou duas URs
  async saveSimplifiedUR(
    params: SaveURSimplifiedInputDTO,
  ): Promise<SaveURSimplifiedOutputDTO | undefined> {
    try {
      const { data, status } = await this.request.put(
        '/V2/definicao-unidades-recebiveis-detalhada/simplificada',
        {
          data: {
            codigoExterno: params.externalCode,
            identificadorContrato: params.externalContractCode,
            codigoExternoContrato: params.externalContractCode,
            tipoAcao: params.actionType,
            recebiveisAbrangidos: params.coveredReceivables, // Aqui passa as alterações
          },
        },
      )

      return {
        success: status === 200,
        externalCode: data.codigoExterno,
        externalContractCode: data.codigoExternoContrato,
        contractIdentifier: data.identificadorContrato,
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  // Atualiza de todas URs do contrato
  async saveDomicileUR(
    params: SaveURDomicileInputDTO,
  ): Promise<SaveURDomicileOutputDTO | undefined> {
    try {
      const { data, status } = await this.request.put(
        '/v2/definicao-unidades-recebiveis-detalhada/domicilio',
        {
          DefinicaoUnidadesRecebiveis: {
            codigoExterno: params.externalCode,
            codigoExternoContrato: params.externalContractCode,
            identificadorContrato: params.externalContractCode, // alterar
            pagamento: {
              documentoTitularDomicilio: params.payment.holderDomicileDocument, // CPF ou CNPJ de quem vai receber
              tipoConta: params.payment.accountType,
              compe: params.payment.compe,
              ispb: params.payment.ispb,
              agencia: params.payment.agency,
              numeroConta: params.payment.accountNumber,
            },
          },
        },
      )

      return {
        success: status === 200,
        externalCode: data.codigoExterno,
        externalContractCode: data.codigoExternoContrato,
        contractIdentifier: data.identificadorContrato,
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  // Atualiza de todas URs do contrato - Quase nunca vai ser usado
  async saveDetailedUR(
    params: SaveURDetailedInputDTO,
  ): Promise<SaveURDetailedOutputDTO | undefined> {
    try {
      const { data, status } = await this.request.put(
        '/v2/definicao-unidades-recebiveis-detalhada',
        {
          DefinicaoUnidadesRecebiveis: {
            codigoExterno: params.extenalCode,
            codigoExternoContrato: params.externalContractCode,
            identificadorContrato: params.externalContractCode,
            recebiveisAbrangidos: params.coveredReceivables,
          },
        },
      )

      return {
        success: status === 200,
        externalCode: data.codigoExterno,
        externalContractCode: data.codigoExternoContrato,
        contractIdentifier: data.identificadorContrato,
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  async removeUR(
    params: RemoveURInputDTO,
  ): Promise<RemoveUROutputDTO | undefined> {
    try {
      const { data, status } = await this.request.delete(
        `/v2/definicao-unidades-recebiveis-detalhada/${params.operationType}/${params.externalContractCode}/${params.contractIdentifier}/${params.externalCode}`,
      )

      return {
        success: status === 200,
        externalCode: data.codigoExterno,
        externalContractCode: data.codigoExternoContrato,
        contractIdentifier: data.identificadorContrato,
      }
    } catch (error) {
      console.log('error', error)
    }
  }
}

// Input /v1.0/consulta-agenda-online
/*
{
  "SolicitacaoConsultaAgenda": {
    "documentoOriginador": "string", - CNPJ ou CPF do EC
    "cnpjFinanciador": "string", - -Agente financeiro
    "cnpjSolicitante": "string", - C2Cards cnpj
    "cnpjCredenciadora": "string", // OPCIONAL
    "codigoArranjoPagamento": "str", // OPCIONAL
    "indicadorAceiteAgendaParcial": "str", "Sim" com S maiúsculo
    "dataInicio": "2020-07-21", // DIA DE HORA PRA FRENTE
    "dataFim": "2020-07-21" Prazo maximo 2 anos
  }
}
*/

// Output
/*
{
  "RetornoRequisicao": {
    "protocoloAgenda": "string", // Buscar no malote
    "situacaoSolicitacao": "string" 
  }
}
*/

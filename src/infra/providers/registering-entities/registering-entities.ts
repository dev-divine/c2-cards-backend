import { Axios } from 'axios'

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
// import {
//   SaveURDetailedInputDTO,
//   SaveURDetailedOutputDTO,
// } from '@infra/providers/registering-entities/dtos/save-ur-detailed-dto'
import {
  SaveURDomicileInputDTO,
  SaveURDomicileOutputDTO,
} from '@infra/providers/registering-entities/dtos/save-ur-domicile-dto'
import {
  SaveURSimplifiedInputDTO,
  SaveURSimplifiedOutputDTO,
} from '@infra/providers/registering-entities/dtos/save-ur-simplified-dto'
import {
  ShowContractInputDTO,
  ShowContractOutputDTO,
} from '@infra/providers/registering-entities/dtos/show-contract-dto'
// import {
//   ShowURInputDTO,
//   ShowUROutputDTO,
// } from '@infra/providers/registering-entities/dtos/show-ur-dto'

export interface RegisteringEntities {
  request: Axios
  // OPT-IN / OPT-OUT
  registerOptIn(params: OptInInputDTO): Promise<OptInOutputDTO | undefined>
  registerOptOut(params: OptOutInputDTO): Promise<OptOutOutputDTO | undefined>
  // CONTRACT
  showContract(
    params: ShowContractInputDTO,
  ): Promise<ShowContractOutputDTO | undefined>
  createContract(
    params: CreateContractInputDTO,
  ): Promise<CreateContractOutputDTO | undefined>
  saveContract(
    params: SaveContractInputDTO,
  ): Promise<SaveContractOutputDTO | undefined>
  removeContract(
    params: RemoveContractInputDTO,
  ): Promise<RemoveContractOutputDTO | undefined>
  // UR
  // showUR(params: ShowURInputDTO): Promise<ShowUROutputDTO | undefined>
  createUR(params: CreateURInputDTO): Promise<CreateUROutputDTO | undefined>
  saveSimplifiedUR(
    params: SaveURSimplifiedInputDTO,
  ): Promise<SaveURSimplifiedOutputDTO | undefined>
  saveDomicileUR(
    params: SaveURDomicileInputDTO,
  ): Promise<SaveURDomicileOutputDTO | undefined>
  // saveDetailedUR(
  //   params: SaveURDetailedInputDTO,
  // ): Promise<SaveURDetailedOutputDTO | undefined>
  removeUR(params: RemoveURInputDTO): Promise<RemoveUROutputDTO | undefined>
}

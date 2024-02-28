export const StatusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,

  INTERNAL_SERVER_ERROR: 500,

  APP_INTERNAL: 500,
}

export const errors = {
  internal: {
    error: '',
    message: '',
    status: StatusCode.APP_INTERNAL,
  },

  'auth.invalid_credentials': {
    error: 'Invalid credentials!',
    message:
      'Credenciais incorretas. Por favor, tente novamente com o documento e senha corretos.',
    status: StatusCode.BAD_REQUEST,
  },

  'auth.invalid_client_authorization': {
    error: 'Authorization failded!',
    message:
      'A validação falhou: o campo "client" é obrigatório. Verifique se o cabeçalho da requisição está correto.',
    status: StatusCode.FORBIDDEN,
  },

  '==========================================================': 'EC Clients',

  'EC_CLIENT.not_found': {
    error: 'ECClient not found!',
    message:
      'O estabelecimento comercial solicitado não foi encontrado. Por favor, verifique se o registro realmente existe.',
    status: StatusCode.BAD_REQUEST,
  },

  'EC_CLIENT.cnpj_alredy_exists': {
    error: 'CNPJ already exists!',
    message:
      'O CNPJ informado já está registrado no sistema. Por favor, verifique e tente com um valor único.',
    status: StatusCode.BAD_REQUEST,
  },

  'EC_CLIENT.company_email_already_exists': {
    error: 'Company Email already exists!',
    message:
      'O e-mail da empresa informado já está registrado no sistema. Por favor, verifique e tente com um valor único.',
    status: StatusCode.BAD_REQUEST,
  },

  'EC_CLIENT.company_phone_already_exists': {
    error: 'Company Phone already exists!',
    message:
      'O telefone da empresa informado já está registrado no sistema. Por favor, verifique e tente com um valor único.',
    status: StatusCode.BAD_REQUEST,
  },

  '=========================================================': '',

  'athlete.email_already_exists': {
    error: 'E-mail already exists!',
    message:
      'O e-mail informado já está registrado no sistema. Por favor, verifique novamente e tente com um valor único.',
    status: StatusCode.BAD_REQUEST,
  },

  'athlete.cpf_already_exists': {
    error: 'CPF already exists!',
    message:
      'O CPF informado já está registrado no sistema. Por favor, verifique novamente e tente com um valor único.',
    status: StatusCode.BAD_REQUEST,
  },

  'athlete.rg_already_exists': {
    error: 'RG already exists!',
    message:
      'O RG informado já está registrado no sistema. Por favor, verifique novamente e tente com um valor único.',
    status: StatusCode.BAD_REQUEST,
  },

  'athlete.phone_already_exists': {
    error: 'Phone already exists!',
    message:
      'O telefone informado já está registrado no sistema. Por favor, verifique novamente e tente com um valor único.',
    status: StatusCode.BAD_REQUEST,
  },

  'athlete.invalid_genre': {
    error: 'Invalid genre!',
    message:
      'Gênero inválido ou inesperado. Por favor, verifique gênero escolhido e tente novamente.',
    status: StatusCode.BAD_REQUEST,
  },

  'athlete.athlete_not_found': {
    error: 'Athlete not found!',
    message:
      'O atleta solicitado não foi encontrado. Por favor, verifique novamente tente com um valor válido.',
    status: StatusCode.BAD_REQUEST,
  },

  'category.category_already_exists': {
    error: 'Category already exists!',
    message:
      'A categoria informada já está registrado no sistema. Por favor, verifique novamente e tente com um valor único.',
    status: StatusCode.BAD_REQUEST,
  },

  'category.category_not_found': {
    error: 'Category not found!',
    message:
      'A categoria solicitada não foi encontrada. Por favor, verifique novamente tente com um valor válido.',
    status: StatusCode.BAD_REQUEST,
  },

  'citizen.cpf_already_exists': {
    error: 'CPF already exists!',
    message:
      'O CPF informado já está registrado no sistema. Por favor, verifique novamente e tente com um valor único.',
    status: StatusCode.BAD_REQUEST,
  },

  'citizen.phone_already_exists': {
    error: 'Phone already exists!',
    message:
      'O telefone informado já está registrado no sistema. Por favor, verifique novamente e tente com um valor único.',
    status: StatusCode.BAD_REQUEST,
  },

  'citizen.citizen_not_found': {
    error: 'Citizen not found!',
    message:
      'O cidadão solicitado não foi encontrado. Por favor, verifique novamente tente com um valor válido.',
    status: StatusCode.BAD_REQUEST,
  },

  'coach.coach_not_found': {
    error: 'Coach not found!',
    message:
      'O treinador solicitado não foi encontrado. Por favor, verifique novamente tente com um valor válido.',
    status: StatusCode.BAD_REQUEST,
  },

  'coach.coach_already_exists': {
    error: 'Coach already exists!',
    message:
      'O treinador informado já está registrado no sistema. Por favor, verifique novamente e tente com um valor único.',
    status: StatusCode.BAD_REQUEST,
  },

  'game.game_not_found': {
    error: 'Game not found!',
    message:
      'O jogo solicitado não foi encontrado. Por favor, verifique novamente tente com um valor válido.',
    status: StatusCode.BAD_REQUEST,
  },

  'group.group_not_found': {
    error: 'Group not found!',
    message:
      'O grupo solicitado não foi encontrado. Por favor, verifique novamente tente com um valor válido.',
    status: StatusCode.BAD_REQUEST,
  },

  'location.location_not_found': {
    error: 'Location not found!',
    message:
      'A localização solicitada não foi encontrada. Por favor, verifique novamente tente com um valor válido.',
    status: StatusCode.BAD_REQUEST,
  },

  'modality.modality_not_found': {
    error: 'Modality not found!',
    message:
      'A modalidade solicitada não foi encontrada. Por favor, verifique novamente tente com um valor válido.',
    status: StatusCode.BAD_REQUEST,
  },

  'sports_facilities.sports_facilities_not_found': {
    error: 'Sports facilities not found!',
    message:
      'O espaço esportivo solicitado não foi encontrado. Por favor, verifique novamente tente com um valor válido.',
    status: StatusCode.BAD_REQUEST,
  },

  'user.user_not_found': {
    error: 'User not found!',
    message:
      'O usuário solicitado não foi encontrado. Por favor, verifique novamente tente com um valor válido.',
    status: StatusCode.BAD_REQUEST,
  },

  'user.email_already_exists': {
    error: 'E-mail already exists!',
    message:
      'O e-mail informado já está registrado no sistema. Por favor, verifique novamente e tente com um valor único.',
    status: StatusCode.BAD_REQUEST,
  },

  'user.cpf_already_exists': {
    error: 'CPF already exists!',
    message:
      'O CPF informado já está registrado no sistema. Por favor, verifique novamente e tente com um valor único.',
    status: StatusCode.BAD_REQUEST,
  },

  'user.phone_already_exists': {
    error: 'Phone already exists!',
    message:
      'O telefone informado já está registrado no sistema. Por favor, verifique novamente e tente com um valor único.',
    status: StatusCode.BAD_REQUEST,
  },

  /* ================================================ */

  'account.password_required': {
    error: 'Password required!',
    message:
      'A senha é obrigatória. Por favor, insira um valor válido e tente novamente.',
    status: StatusCode.BAD_REQUEST,
  },

  'account.token_expired': {
    error: 'Expired token!',
    message:
      'O token fornecido expirou. Por favor, gere um novo e tente novamente.',
    status: StatusCode.BAD_REQUEST,
  },

  'account.token_invalid': {
    error: 'Invalid token!',
    message:
      'O token fornecido é inválido. Por favor, verifique novamente e tente com um valor válido.',
    status: StatusCode.BAD_REQUEST,
  },

  'account.token_not_found': {
    error: 'Token not found!',
    message:
      'O token solicitado não foi encontrado. Por favor, verifique novamente tente com um valor válido.',
    status: StatusCode.BAD_REQUEST,
  },
}

export type ErrorKeys = keyof typeof errors

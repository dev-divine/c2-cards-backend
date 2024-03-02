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

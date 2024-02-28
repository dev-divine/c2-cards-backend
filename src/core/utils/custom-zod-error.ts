export function zodStringParser(field: string) {
  return {
    required_error: `O campo ${field} é obrigatório.`,
    invalid_type_error: `O campo ${field} deve ser preenchido por uma palavra.`,
  }
}

export function zodNumberParser(field: string) {
  return {
    required_error: `O campo ${field} é obrigatório.`,
    invalid_type_error: `O campo ${field} deve ser preenchido por um número.`,
  }
}

export function zodDateParser(field: string) {
  return {
    required_error: `O campo ${field} é obrigatório.`,
    invalid_type_error: `O campo ${field} deve ser preenchido por uma data.`,
  }
}

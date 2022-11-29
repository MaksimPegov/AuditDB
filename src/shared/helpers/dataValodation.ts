export type InputValidatorResponse = {
  status: boolean
  message: string
}
export const inputValidator = (data: string): InputValidatorResponse => {
  let response = {
    status: true,
    message: 'Data is valid',
  }
  if (data.match(/[а-яА-ЯёЁ]/g)) {
    response.status = false
    response.message = 'RU charecters do not supported'
  } else if (data.includes(`'`) || data.includes(`"`)) {
    response.status = false
    response.message = `Brackets are not alowed ( ' and " )`
  }
  return response
}

export const validateEmail = (input: string): boolean => {
  var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  if (input.match(validRegex)) {
    return true
  } else {
    return false
  }
}

export const onlySpaces = (str: string): boolean => {
  return /^\s*$/.test(str)
}


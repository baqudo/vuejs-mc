export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim()
  if (!trimmedEmail) return []

  const errors = []

  const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
  const isValidEmailFormat = emailRegex.test(trimmedEmail)

  if (!isValidEmailFormat) errors.push('Not a valid email format')

  return errors
}

export const validatePassword = (password: string) => {
  if (!password) return []

  const errors = []

  if (password.length <= 6) errors.push('Password must be more than 6 characters')

  return errors
}

export const validateUsername = (username: string) => {
  const trimmedUsername = username.trim()
  if (!trimmedUsername) return []

  const errors = []

  if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
    errors.push('Username must be between 3 and 20 characters')
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/
  const isValidUsernameFormat = usernameRegex.test(trimmedUsername)

  if (!isValidUsernameFormat) {
    errors.push('Username can only contain letters, numbers, and underscores')
  }

  return errors
}

export const validateName = (name: string, fieldName: string) => {
  const trimmedName = name.trim()
  if (!trimmedName) return []

  const errors = []

  if (trimmedName.length < 2 || trimmedName.length > 30) {
    errors.push(`${fieldName} must be between 2 and 30 characters`)
  }

  const nameRegex = /^[a-zA-Z'-\s]+$/
  const isValidNameFormat = nameRegex.test(trimmedName)

  if (!isValidNameFormat) {
    errors.push(`${fieldName} can only contain letters, spaces, apostrophes, and hyphens`)
  }

  return errors
}

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (!confirmPassword) return []

  const errors = []

  if (password !== confirmPassword) {
    errors.push('Passwords do not match')
  }

  return errors
}

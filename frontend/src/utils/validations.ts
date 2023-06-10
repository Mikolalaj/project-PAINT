export function passwordValidation(value: string) {
    const hasLetter = /[a-zA-Z]/.test(value)
    const hasNumber = /[0-9]/.test(value)
    const hasSpecial = /[^a-zA-Z0-9]/.test(value)
    return hasLetter && hasNumber && hasSpecial ? null : 'Password must include at least one letter, number and special character'
}

export function emailValidation(value: string) {
    if (/^\S+@\S+$/.test(value)) {
        return null
    }
    return 'Invalid email'
}

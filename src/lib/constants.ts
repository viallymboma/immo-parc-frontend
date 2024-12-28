
export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_URL

export const passwordRules = {
    minLength: "Au moins 8 caractères",
    uppercase: "Au moins une lettre majuscule",
    lowercase: "Au moins une lettre minuscule",
    digit: "Au moins un chiffre",
    specialChar: "Au moins un caractère spécial (!@#$%^&*())",
};

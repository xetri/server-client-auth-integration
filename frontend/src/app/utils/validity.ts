const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const digitRegex = /^[0-9]$/;

export function isValidEmail(email : string) : boolean {
    return emailRegex.test(email);
}

export function isValidDigit(digit : string) : boolean {
    return digitRegex.test(digit);
}

// Generate a random code verifier (43-128 characters)
export function generateCodeVerifier(): string {
    const array = new Uint8Array(32); // 32 bytes generates ~43 characters after encoding
    window.crypto.getRandomValues(array);
    return base64urlEncode(array);
}

// Base64 URL encode the array
export function base64urlEncode(array: Uint8Array): string {
    return btoa(String.fromCharCode(...array))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// Compute the code challenge from the code verifier
export async function computeCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    return base64urlEncode(new Uint8Array(hash));
}

// Generate a random state for CSRF protection
export function generateState(): string {
    const array = new Uint8Array(16); // 16 bytes for a shorter state
    window.crypto.getRandomValues(array);
    return base64urlEncode(array);
}

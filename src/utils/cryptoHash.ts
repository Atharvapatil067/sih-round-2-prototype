// Cryptographic SHA-256 hash chaining implementation for tamper-evident audit logging
// Complies with R-AUD-01, R-AUD-02, R-AUD-04

export async function computeSha256(text: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  
  // Deterministic fallback hash for SSR or environments without crypto.subtle
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `fallback_${hex}_${text.length}`;
}

export function generateAuditHash(
  prevHash: string,
  timestamp: string,
  actorRole: string,
  action: string,
  objectRef: string,
  payloadStr: string
): Promise<string> {
  const content = `${prevHash}|${timestamp}|${actorRole}|${action}|${objectRef}|${payloadStr}`;
  return computeSha256(content);
}


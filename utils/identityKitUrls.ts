/**
 * Identity Kit URLs for marketing site CTAs.
 *
 * - `VITE_IDENTITY_KIT_START_URL` — full URL to begin the intake app (e.g. same-domain path after Cloudflare routing, or kit subdomain).
 * - `VITE_IDENTITY_KIT_URL` — fallback base when START is unset (default: kit subdomain root).
 */
export function getIdentityKitStartUrl(): string {
  const start = import.meta.env.VITE_IDENTITY_KIT_START_URL as string | undefined
  if (start && start.trim()) return start.trim().replace(/\/$/, '')

  const base = (import.meta.env.VITE_IDENTITY_KIT_URL as string | undefined)?.trim() || 'https://kit.brandalchemyllc.com'
  return base.replace(/\/$/, '')
}

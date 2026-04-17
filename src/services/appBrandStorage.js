const BRAND_KEY = 'agendamiento.brand'

export function readAppBrand() {
  try {
    const stored = JSON.parse(localStorage.getItem(BRAND_KEY) ?? 'null')
    return {
      appName: stored?.appName || 'Mi Agenda',
      logo: stored?.logo || '',
    }
  } catch {
    localStorage.removeItem(BRAND_KEY)
    return { appName: 'Mi Agenda', logo: '' }
  }
}

export function saveAppBrand(brand) {
  localStorage.setItem(BRAND_KEY, JSON.stringify(brand))
}

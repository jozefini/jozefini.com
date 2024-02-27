export const hexToRgb = (hex: string) => {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) {
    return null
  }
  let hexValue = hex.replace(/^#/, '')
  if (hexValue.length === 3) {
    hexValue = hexValue
      .split('')
      .map(char => `${char}${char}`)
      .join('')
  }
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue)
  if (!result) {
    return null
  }
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ]
}

export const hexToHsl = (hex: string) => {
  const rgb = hexToRgb(hex)
  if (!rgb) {
    return null
  }
  let [r, g, b] = rgb
  ;(r /= 255), (g /= 255), (b /= 255)
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h = 0,
    s,
    l = (max + min) / 2

  if (max == min) {
    h = s = 0
  } else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [
    Number((h * 360).toFixed(2)),
    Number((s * 100).toFixed(2)),
    Number((l * 100).toFixed(2)),
  ]
}

export const isDarkerColor = (hexColor: string) => {
  const rgb = hexToRgb(hexColor)
  if (!rgb) {
    return false
  }
  const [r, g, b] = rgb
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness < 164
}

export const adjustColorLight = (hexColor: string, changeValue: number) => {
  const hsl = hexToHsl(hexColor)
  if (!hsl) {
    return hexColor
  }
  const [h, s, l] = hsl
  let adjustedL = l + changeValue
  if (adjustedL > 100) {
    adjustedL = 100
  } else if (adjustedL < 0) {
    adjustedL = 0
  }
  return `hsl(${h},${s}%,${adjustedL}%)`
}

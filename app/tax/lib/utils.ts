export const getValueInPercent = (value: number, percentage: number) => {
  return value * (percentage / 100)
}

export const getPercentInValue = (value: number, percentage: number) => {
  if (percentage < 0) {
    return value - getValueInPercent(value, Math.abs(percentage))
  }
  return value + getValueInPercent(value, percentage)
}

export const valueAsPrice = (value: number, currency: string = '€') => {
  return `${value.toFixed(0)} ${currency}`
}

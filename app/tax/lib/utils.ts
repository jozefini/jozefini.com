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
  const newVal = Number(value.toFixed(0))
  return commaNumber(newVal) + ` ${currency}`
}

export const commaNumber = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

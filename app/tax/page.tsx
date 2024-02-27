'use client'

import { useEffect, useMemo, useState } from 'react'
import { getPercentInValue, getValueInPercent, valueAsPrice } from './lib/utils'
import { Input } from './ui/input'

const css = {
  wrapper: 'fixed inset-0 bg-orange-900/10',
  inner: 'max-w-xl mx-auto px-4 py-8 min-w-0',
  group: 'min-w-0 flex items-center justify-center gap-x-4',
  separator: 'border-t border-orange-800 my-8 border-dashed',
  table: 'grid grid-cols-2 gap-x-14 *:first:text-left *:last:text-right',
  detail: 'flex justify-between items-center',
  detailSeparator: 'border-t border-orange-800 my-2',
  value: 'text-base font-bold text-orange-950',
  label: 'text-xs uppercase font-bold text-orange-800 tracking-widest',
  headline: 'text-xs font-bold text-orange-800 uppercase tracking-widest',
  endResult: 'border border-dashed border-orange-800 p-4 max-w-64 mx-auto',
}

const TAX = 15
const BIG_TAX = 23
const INCOME = 0
const EXPENSES = 0
const MAX_INCOME = 140000

export default function Page() {
  const [tax, setTax] = useState(TAX)
  const [income, setIncome] = useState(INCOME)
  const [expenses, setExpenses] = useState(EXPENSES)

  const hasBigTax = income >= MAX_INCOME
  useEffect(() => {
    setTax(hasBigTax ? BIG_TAX : TAX)
  }, [hasBigTax])

  const {
    incomeWithExpenses,
    taxWithExpenses,
    profitWithExpenses,
    incomeWithoutExpenses,
    taxWithoutExpenses,
    profitWithoutExpenses,
    taxDifference,
    profitDifference,
  } = useMemo(() => {
    const incomeWithExpenses = income - expenses
    const taxWithExpenses = getValueInPercent(incomeWithExpenses, tax)
    const profitWithExpenses = incomeWithExpenses - taxWithExpenses
    const incomeWithoutExpenses = income
    const taxWithoutExpenses = getValueInPercent(incomeWithoutExpenses, tax)
    const profitWithoutExpenses = incomeWithoutExpenses - taxWithoutExpenses
    const taxDifference = taxWithExpenses - taxWithoutExpenses
    const profitDifference = profitWithoutExpenses - profitWithExpenses

    return {
      incomeWithExpenses,
      taxWithExpenses,
      profitWithExpenses,
      incomeWithoutExpenses,
      taxWithoutExpenses,
      profitWithoutExpenses,
      taxDifference,
      profitDifference,
    }
  }, [tax, income, expenses])

  return (
    <div className={css.wrapper}>
      <div className={css.inner}>
        <div className={css.group}>
          <Input label="Tax" value={tax} onChange={() => {}} disabled />
          <Input label="Income" value={income} onChange={setIncome} />
          <Input label="Expenses" value={expenses} onChange={setExpenses} />
        </div>
        <div className={css.separator} />
        <div className={css.table}>
          <div>
            <div className={css.detail}>
              <div className={css.headline}>With Expenses</div>
            </div>
            <div className={css.detailSeparator} />
            <div className={css.detail}>
              <label className={css.label}>Income</label>
              <span className={css.value}>
                {valueAsPrice(incomeWithExpenses)}
              </span>
            </div>
            <div className={css.detail}>
              <label className={css.label}>Tax</label>
              <span className={css.value}>
                {valueAsPrice(-taxWithExpenses)}
              </span>
            </div>
            <div className={css.detailSeparator} />
            <div className={css.detail}>
              <label className={css.label}>Profit</label>
              <span className={css.value}>
                {valueAsPrice(profitWithExpenses)}
              </span>
            </div>
          </div>
          <div>
            <div className={css.detail}>
              <div className={css.headline}>Without Expenses</div>
            </div>
            <div className={css.detailSeparator} />
            <div className={css.detail}>
              <label className={css.label}>Income</label>
              <span className={css.value}>
                {valueAsPrice(incomeWithoutExpenses)}
              </span>
            </div>
            <div className={css.detail}>
              <label className={css.label}>Tax</label>
              <span className={css.value}>
                {valueAsPrice(-taxWithoutExpenses)}
              </span>
            </div>
            <div className={css.detailSeparator} />
            <div className={css.detail}>
              <label className={css.label}>Profit</label>
              <span className={css.value}>
                {valueAsPrice(profitWithoutExpenses)}
              </span>
            </div>
          </div>
        </div>
        {expenses > 0 && (
          <>
            <div className={css.separator} />
            <div className={css.endResult}>
              <div className={css.detail}>
                <label className={css.label}>Tax Off</label>
                <span className={css.value}>{valueAsPrice(taxDifference)}</span>
              </div>
              <div className={css.detail}>
                <label className={css.label}>% Off</label>
                <span className={css.value}>
                  {getValueInPercent(tax, taxDifference)} %
                </span>
              </div>
              <div className={css.detailSeparator} />
              <div className={css.detail}>
                <label className={css.label}>New Tax</label>
                <span className={css.value}>
                  {valueAsPrice(tax - taxDifference)}
                </span>
              </div>
              <div className={css.detail}>
                <label className={css.label}>Expenses ~</label>
                <span className={css.value}>
                  {valueAsPrice(profitDifference)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

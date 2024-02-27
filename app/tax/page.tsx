'use client'

import { useEffect, useMemo, useState } from 'react'
import { getPercentInValue, getValueInPercent, valueAsPrice } from './lib/utils'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

const css = {
  wrapper: 'fixed inset-0 bg-[#fef6f0]',
  inner: 'max-w-96 sm:max-w-xl w-full mx-auto px-8 py-5 sm:py-8 min-w-0',
  group:
    'min-w-0 flex flex-col sm:flex-row gap-y-3 items-center justify-center gap-x-4',
  separatorWrap:
    'relative h-12 sm:h-14 flex items-center justify-center w-full',
  separator: 'absolute left-0 top-1/2 border-t border-orange-800 w-full',
  separatorText:
    'relative inline-flex px-2 bg-[#fef6f0] text-xs uppercase font-bold text-orange-800 tracking-widest',
  table: 'grid gap-y-8 grid-cols-1 gap-x-6 *:first:text-left *:last:text-right',
  doubleCol: 'sm:grid-cols-2',
  detail: 'flex justify-between items-center',
  detailSeparator: 'border-t border-orange-800 my-2',
  value: 'text-base font-bold text-orange-950',
  label: 'text-xs uppercase font-bold text-orange-800 tracking-widest',
  headline: 'text-xs font-bold text-orange-800 uppercase tracking-widest',
  endResult:
    'border bg-white/50 w-full border-dashed border-orange-800 p-4 sm:max-w-64 mx-auto',
}

const TAX = 15
const BIG_TAX = 23
const INCOME = 0
const EXPENSES = 0
const MAX_INCOME = 140000

const Separator = ({ title }: { title: string }) => {
  return (
    <div className={css.separatorWrap}>
      <div className={css.separator} />
      <div className={css.separatorText}>{title}</div>
    </div>
  )
}

export default function Page() {
  const [tax, setTax] = useState(TAX)
  const [income, setIncome] = useState(INCOME)
  const [expenses, setExpenses] = useState(EXPENSES)

  const hasBigTax = income >= MAX_INCOME
  const hasExpenses = expenses > 0

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
  } = useMemo(() => {
    const incomeWithExpenses = income - expenses
    const taxWithExpenses = getValueInPercent(incomeWithExpenses, tax)
    const profitWithExpenses = incomeWithExpenses - taxWithExpenses
    const incomeWithoutExpenses = income
    const taxWithoutExpenses = getValueInPercent(incomeWithoutExpenses, tax)
    const profitWithoutExpenses = Number(
      (incomeWithoutExpenses - taxWithoutExpenses).toFixed(0)
    )
    const taxDifference = Number(
      (taxWithExpenses - taxWithoutExpenses).toFixed(0)
    )

    return {
      incomeWithExpenses,
      taxWithExpenses,
      profitWithExpenses,
      incomeWithoutExpenses,
      taxWithoutExpenses,
      profitWithoutExpenses,
      taxDifference,
    }
  }, [tax, income, expenses])

  return (
    <div className={css.wrapper}>
      <div className={css.inner}>
        <div className={css.group}>
          <Input
            label="Tax"
            value={tax}
            onChange={() => {}}
            disabled
            symbol="%"
          />
          <Input label="Income" value={income} onChange={setIncome} />
          <Input label="Expenses" value={expenses} onChange={setExpenses} />
        </div>
        <Separator title="With / Without Expenses" />
        <div className={cn(css.table, hasExpenses && css.doubleCol)}>
          <div className={css.endResult}>
            <div className={css.detail}>
              <label className={css.label}>Balance</label>
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
          {hasExpenses && (
            <div className={css.endResult}>
              <div className={css.detail}>
                <label className={css.label}>Balance</label>
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
          )}
        </div>
        {hasExpenses && (
          <>
            <Separator title="Tax difference" />
            <div className={css.table}>
              <div className={css.endResult}>
                <div className={css.detail}>
                  <label className={css.label}>Tax</label>
                  <span className={css.value}>
                    {valueAsPrice(taxWithoutExpenses)}
                  </span>
                </div>
                <div className={css.detail}>
                  <label className={css.label}>Tax Off</label>
                  <span className={css.value}>
                    {valueAsPrice(taxDifference)}
                  </span>
                </div>
                <div className={css.detailSeparator} />
                <div className={css.detail}>
                  <label className={css.label}>New Tax</label>
                  <span className={css.value}>
                    {valueAsPrice(taxWithExpenses)}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

'use client'

import { Checkboxes } from '../checkboxes'
import { Input } from '../input'
import { Select } from '../select'
import { Filter } from './filter'
import { Heading } from './heading'

const styles = {
  wrapper: 'w-[18.75rem] h-full bg-white border-e border-black/10',
  group: 'p-6 space-y-8',
}

export function Filters() {
  const onReset = () => {}

  return (
    <div className={styles.wrapper}>
      <Heading />
      <div className={styles.group}>
        <Filter label="Status" onReset={onReset}>
          <Checkboxes
            selected={['active', 'hold']}
            options={[
              {
                label: 'Active',
                value: 'active',
                counter: 12,
                color: '#49C1A0',
              },
              {
                label: 'Hold',
                value: 'hold',
                counter: 3,
                color: '#EFB801',
              },
              {
                label: 'Draft',
                value: 'draft',
                counter: 7,
                color: '#CBD5E1',
              },
              {
                label: 'Closed',
                value: 'closed',
                counter: 5,
                color: '#1E293B',
              },
            ]}
          />
        </Filter>
        <Filter label="Event owner">
          <Select placeholder="Select" />
        </Filter>
        <Filter label="Date range">
          <Select value="All time" />
        </Filter>
        <Filter label="Sales Status" onReset={onReset}>
          <Checkboxes
            selected={[]}
            options={[
              {
                label: 'With sales',
                value: 'with-sales',
                counter: 12,
                color: '#49C1A0',
              },
              {
                label: 'Without sales',
                value: 'without-sales',
                counter: 3,
                color: '#DD4414',
              },
              {
                label: 'Running out',
                value: 'running-out',
                counter: 2,
                color: '#F59E0B',
              },
            ]}
          />
        </Filter>
      </div>
    </div>
  )
}

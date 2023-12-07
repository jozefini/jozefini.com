import { ReactNode } from 'react'
import { SideBrand } from './components/side-brand'
import { SideNav } from './components/side-nav'
import { SideActions } from './components/side-actions'
import {
  DashboardWrapper,
  MainWrapper,
  SidebarWrapper,
} from './components/ui/layout'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardWrapper>
      <SidebarWrapper>
        <SideBrand />
        <SideNav />
        <SideActions />
      </SidebarWrapper>

      <MainWrapper>{children}</MainWrapper>
    </DashboardWrapper>
  )
}

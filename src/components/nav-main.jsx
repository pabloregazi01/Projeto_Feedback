import { NavLink, useLocation } from "react-router-dom"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavMain({ items }) {
  const location = useLocation()
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu principal</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = location.pathname.toLowerCase() === item.url.toLowerCase()
          const Icon = item.icon

          return (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                isActive={isActive}
                tooltip={item.title}
                render={
                  <NavLink
                    to={item.url}
                    onClick={() => isMobile && setOpenMobile(false)}
                  />
                }
              >
                <Icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

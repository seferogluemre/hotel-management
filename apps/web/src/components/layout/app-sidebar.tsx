import { NavGroup } from '#/components/layout/nav-group';
import { NavUser } from '#/components/layout/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '#/components/ui/sidebar';
import { sidebarData } from './data/sidebar-data';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

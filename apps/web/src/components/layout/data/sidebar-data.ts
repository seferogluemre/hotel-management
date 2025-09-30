import {
  IconDoor,
  IconLayoutDashboard,
  IconUsers,
} from '@tabler/icons-react';
import { type SidebarData } from '../types';

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navGroups: [
    {
      title: 'Genel',
      items: [
        {
          title: 'Gösterge Paneli',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Odalar',
          url: '/rooms',
          icon: IconDoor,
        },
        {
          title: 'Takvim',
          url: '/calendar',
          icon: IconUsers,
        },
      ],
    },
  ],
};

import { useNavigate } from '@tanstack/react-router';
import { Main } from '#/components/layout/main';
import { Header } from '#/components/layout/header';
import { TopNav } from '#/components/layout/top-nav';
import { Search } from '#/components/search';
import { ThemeSwitch } from '#/components/theme-switch';
import { ProfileDropdown } from '#/components/profile-dropdown';
import { RoomCard } from './components/room-card';
import { rooms } from './data';

export default function RoomsPage() {
	const navigate = useNavigate();

	return (
		<>
			<Header>
				<TopNav links={[{ title: 'Odalar', href: '/rooms', isActive: true, disabled: false }]} />
				<div className="ml-auto flex items-center space-x-4">
					<Search />
					<ThemeSwitch />
					<ProfileDropdown />
				</div>
			</Header>
			<Main>
				<div className="mb-6">
					<h1 className="text-2xl font-bold tracking-tight">Oda Durumu</h1>
					<p className="text-muted-foreground">
						Oteldeki tüm odaların anlık durumunu görüntüleyin
					</p>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
					{rooms.map((room) => (
						<RoomCard
							key={room.id}
							room={room}
							onView={(roomId) => navigate({ to: '/rooms/$roomId', params: { roomId } })}
						/>
					))}
				</div>
			</Main>
		</>
	);
}

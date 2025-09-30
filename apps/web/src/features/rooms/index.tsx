import { useNavigate } from '@tanstack/react-router';
import { Main } from '#/components/layout/main';
import { Header } from '#/components/layout/header';
import { TopNav } from '#/components/layout/top-nav';
import { Search } from '#/components/search';
import { ThemeSwitch } from '#/components/theme-switch';
import { ProfileDropdown } from '#/components/profile-dropdown';
import { RoomsTable } from './components/rooms-table';
import { rooms } from './data';

export default function RoomsPage() {
	const navigate = useNavigate();

	return (
		<>
			<Header>
				<TopNav links={[{ title: 'Rooms', href: 'rooms', isActive: true, disabled: false }]} />
				<div className="ml-auto flex items-center space-x-4">
					<Search />
					<ThemeSwitch />
					<ProfileDropdown />
				</div>
			</Header>
			<Main>
				<RoomsTable rooms={rooms} onView={(roomId) => navigate({ to: '/rooms/$roomId', params: { roomId } })} />
			</Main>
		</>
	);
}
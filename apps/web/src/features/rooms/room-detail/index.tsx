import { useParams } from '@tanstack/react-router';
import { Main } from '#/components/layout/main';
import { Header } from '#/components/layout/header';
import { TopNav } from '#/components/layout/top-nav';
import { Search as GlobalSearch } from '#/components/search';
import { ThemeSwitch } from '#/components/theme-switch';
import { ProfileDropdown } from '#/components/profile-dropdown';
import { rooms, reservations } from '../data';
import { RoomSummary } from './components/room-summary';
import { ReservationsList } from './components/reservations-list';

	export default function RoomDetail() {
	const { roomId } = useParams({ from: '/_authenticated/rooms/$roomId' });
	const room = rooms.find((r) => r.id === roomId) ?? rooms[0];
	const roomReservations = reservations.filter((r) => r.roomId === room.id);

	return (
		<>
			<Header>
				<TopNav links={[{ title: 'Rooms', href: 'rooms', isActive: false, disabled: false }, { title: 'Room Detail', href: 'rooms/$roomId', isActive: true, disabled: false }]} />
				<div className="ml-auto flex items-center space-x-4">
					<GlobalSearch />
					<ThemeSwitch />
					<ProfileDropdown />
				</div>
			</Header>
			<Main>
				<div className="grid gap-4 lg:grid-cols-3">
					<div className="lg:col-span-1">
						<RoomSummary room={room} />
					</div>
					<div className="lg:col-span-2">
						<ReservationsList reservations={roomReservations} />
					</div>
				</div>
			</Main>
		</>
	);
}
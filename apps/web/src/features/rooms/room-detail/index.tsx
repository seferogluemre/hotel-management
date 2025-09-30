import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '#/components/ui/button';
import { Main } from '#/components/layout/main';
import { Header } from '#/components/layout/header';
import { TopNav } from '#/components/layout/top-nav';
import { Search as GlobalSearch } from '#/components/search';
import { ThemeSwitch } from '#/components/theme-switch';
import { ProfileDropdown } from '#/components/profile-dropdown';
import { rooms, reservations, roomActivities } from '../data';
import { RoomInfoCard } from './components/room-info-card';
import { GuestInfoCard } from './components/guest-info-card';
import { ReservationDetailsCard } from './components/reservation-details-card';
import { ActivityTimeline } from './components/activity-timeline';

export default function RoomDetail() {
	const navigate = useNavigate();
	const { roomId } = useParams({ from: '/_authenticated/rooms/$roomId' });
	const room = rooms.find((r) => r.id === roomId) ?? rooms[0];
	
	// Get current active reservation (checked in or confirmed for today)
	const today = new Date().toISOString().split('T')[0];
	const currentReservation = reservations.find(
		(r) => r.roomId === room.id && r.checkIn <= today && today <= r.checkOut
	);
	
	// Get all activities for this room, sorted by timestamp (newest first)
	const activities = roomActivities
		.filter((a) => a.roomId === room.id)
		.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

	const getRoomTypeLabel = (type: string) => {
		switch (type) {
			case 'single':
				return 'Tek Kişilik';
			case 'double':
				return 'Çift Kişilik';
			case 'suite':
				return 'Suit';
			case 'deluxe':
				return 'Deluxe';
			default:
				return type;
		}
	};

	const handleCleanRoom = () => {
		// TODO: Implement cleaning logic with toast
		console.log('Cleaning room:', room.number);
	};

	return (
		<>
			<Header>
				<TopNav
					links={[
						{ title: 'Odalar', href: '/rooms', isActive: false, disabled: false },
						{ title: `Oda ${room.number}`, href: `/rooms/${roomId}`, isActive: true, disabled: false },
					]}
				/>
				<div className="ml-auto flex items-center space-x-4">
					<GlobalSearch />
					<ThemeSwitch />
					<ProfileDropdown />
				</div>
			</Header>
			<Main>
				{/* Page Header */}
				<div className="mb-6 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Button variant="ghost" size="icon" onClick={() => navigate({ to: '/rooms' })}>
							<ArrowLeft className="h-5 w-5" />
						</Button>
						<div>
							<h1 className="text-2xl font-bold tracking-tight">Oda {room.number}</h1>
							<p className="text-muted-foreground">
								{getRoomTypeLabel(room.type)} • {room.floor}. Kat
							</p>
						</div>
					</div>
					{room.status === 'needs_cleaning' && (
						<Button onClick={handleCleanRoom} className="bg-orange-500 hover:bg-orange-600">
							Temizlenmeli
						</Button>
					)}
				</div>

				{/* Top Section: Room Info + Guest Info */}
				<div className="mb-4 grid gap-4 lg:grid-cols-2">
					<RoomInfoCard room={room} />
					<GuestInfoCard reservation={currentReservation} />
				</div>

				{/* Reservation Details */}
				<div className="mb-4">
					<ReservationDetailsCard reservation={currentReservation} />
				</div>

				{/* Activity Timeline */}
				<ActivityTimeline activities={activities} />
			</Main>
		</>
	);
}

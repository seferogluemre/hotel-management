import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Main } from '#/components/layout/main';
import { Header } from '#/components/layout/header';
import { TopNav } from '#/components/layout/top-nav';
import { Search } from '#/components/search';
import { ThemeSwitch } from '#/components/theme-switch';
import { ProfileDropdown } from '#/components/profile-dropdown';
import { RoomCard } from './components/room-card';
import { rooms as initialRooms } from './data';
import type { Room, RoomStatus } from './types/types';

export default function RoomsPage() {
	const navigate = useNavigate();
	const [rooms, setRooms] = useState<Room[]>(initialRooms);

	// Auto-update room statuses based on check-out dates
	useEffect(() => {
		const today = new Date().toISOString().split('T')[0];
		
		setRooms((prevRooms) =>
			prevRooms.map((room) => {
				// If check-out is today or in the past, and room is occupied, mark as needs cleaning
				if (
					room.checkOut &&
					room.checkOut <= today &&
					(room.status === 'occupied' || room.status === 'available')
				) {
					return { ...room, status: 'needs_cleaning' as RoomStatus };
				}
				return room;
			})
		);
	}, []);

	const handleRoomCleaned = (room: Room) => {
		setRooms((prevRooms) =>
			prevRooms.map((r) =>
				r.id === room.id
					? { ...r, status: 'available' as RoomStatus, guestName: undefined, checkIn: undefined, checkOut: undefined }
					: r
			)
		);
		toast.success(`Oda ${room.number} temizlendi ve müsait duruma getirildi ✨`, {
			description: 'Oda artık yeni misafirler için hazır',
			duration: 3000,
		});
	};

	const handleReservation = (room: Room) => {
		toast.info(`Oda ${room.number} için rezervasyon oluşturuluyor 📅`, {
			description: 'Rezervasyon formu açılıyor...',
			duration: 2000,
		});
		// TODO: Open reservation modal/form
	};

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
							onClean={handleRoomCleaned}
							onReserve={handleReservation}
						/>
					))}
				</div>
			</Main>
		</>
	);
}

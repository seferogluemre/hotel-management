import { useState } from 'react';
import { Main } from '#/components/layout/main';
import { Header } from '#/components/layout/header';
import { TopNav } from '#/components/layout/top-nav';
import { Search } from '#/components/search';
import { ThemeSwitch } from '#/components/theme-switch';
import { ProfileDropdown } from '#/components/profile-dropdown';
import { CalendarGrid } from './components/calendar-grid';
import { rooms, reservations as initialReservations } from '../rooms/data';
import type { Reservation } from '../rooms/types/types';

export default function CalendarPage() {
	const [reservations, setReservations] = useState<Reservation[]>(initialReservations);

	const handleCreateReservation = (newReservation: Omit<Reservation, 'id'>) => {
		// Generate a simple ID (in production, this would come from the backend)
		const id = `bk-${Date.now()}`;
		const reservation: Reservation = {
			...newReservation,
			id,
		};

		setReservations([...reservations, reservation]);
	};

	return (
		<>
			<Header>
				<TopNav links={[{ title: 'Takvim', href: '/calendar', isActive: true, disabled: false }]} />
				<div className="ml-auto flex items-center space-x-4">
					<Search />
					<ThemeSwitch />
					<ProfileDropdown />
				</div>
			</Header>
			<Main>
				<CalendarGrid
					rooms={rooms}
					reservations={reservations}
					onCreateReservation={handleCreateReservation}
				/>
			</Main>
		</>
	);
}

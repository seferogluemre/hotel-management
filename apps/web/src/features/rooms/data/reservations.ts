import type { Reservation } from '../types/types';

export const reservations: Reservation[] = [
	{
		id: 'bk-001',
		roomId: 'r-102',
		guestName: 'Ahmet Yılmaz',
		guestEmail: 'ahmet@example.com',
		checkIn: new Date().toISOString(),
		checkOut: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
		status: 'confirmed',
		notes: 'Late check-in',
	},
	{
		id: 'bk-002',
		roomId: 'r-201',
		guestName: 'Sara Demir',
		guestEmail: 'sara@example.com',
		checkIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
		checkOut: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
		status: 'pending',
	},
	{
		id: 'bk-003',
		roomId: 'r-101',
		guestName: 'John Doe',
		guestEmail: 'john@example.com',
		checkIn: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
		checkOut: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
		status: 'checked_out',
	},
]; 
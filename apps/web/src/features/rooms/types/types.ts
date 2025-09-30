export type RoomStatus = 'available' | 'occupied' | 'cleaning' | 'maintenance' | 'needs_cleaning' | 'blocked';

export interface Room {
	id: string;
	number: string; // e.g., "101"
	type: 'single' | 'double' | 'suite' | 'deluxe';
	pricePerNight: number;
	currency: 'USD' | 'EUR' | 'TRY';
	capacity: number;
	status: RoomStatus;
	amenities: string[];
	floor: number;
	imageUrl?: string;
	// Guest information
	guestName?: string;
	checkIn?: string; // ISO date
	checkOut?: string; // ISO date
}

export type ReservationStatus = 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'pending';

export interface Reservation {
	id: string;
	roomId: string;
	guestName: string;
	guestEmail?: string;
	checkIn: string; // ISO date
	checkOut: string; // ISO date
	status: ReservationStatus;
	notes?: string;
} 
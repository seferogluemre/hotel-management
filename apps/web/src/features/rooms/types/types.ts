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

export interface Guest {
	id: string;
	name: string;
	email?: string;
	phone?: string;
	identityNumber?: string; // TC Kimlik No
}

export interface Reservation {
	id: string;
	roomId: string;
	guestName: string;
	guestEmail?: string;
	guestPhone?: string;
	guestIdentity?: string;
	checkIn: string; // ISO date
	checkOut: string; // ISO date
	status: ReservationStatus;
	notes?: string;
	totalPrice?: number;
	currency?: 'USD' | 'EUR' | 'TRY';
	bookingChannel?: string; // e.g., "Hotels.com", "Booking.com", "Direct"
	numberOfNights?: number;
}

export type ActivityType = 'check_in' | 'check_out' | 'cleaning' | 'maintenance' | 'reservation_created' | 'reservation_cancelled';

export interface RoomActivity {
	id: string;
	roomId: string;
	type: ActivityType;
	title: string;
	description: string;
	timestamp: string; // ISO date
	performedBy?: string; // User who performed the action
} 
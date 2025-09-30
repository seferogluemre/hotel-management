import type { Reservation } from '../../rooms/types/types';

/**
 * Get all days in a month
 */
export function getDaysInMonth(year: number, month: number): Date[] {
	const date = new Date(year, month, 1);
	const days: Date[] = [];
	while (date.getMonth() === month) {
		days.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}
	return days;
}

/**
 * Format date to YYYY-MM-DD
 */
export function formatDateToString(date: Date): string {
	return date.toISOString().split('T')[0];
}

/**
 * Get day name in Turkish (short)
 */
export function getTurkishDayName(date: Date): string {
	const days = ['PAZ', 'PZT', 'SAL', 'ÇAR', 'PER', 'CUM', 'CMT'];
	return days[date.getDay()];
}

/**
 * Get month name in Turkish
 */
export function getTurkishMonthName(month: number): string {
	const months = [
		'Ocak',
		'Şubat',
		'Mart',
		'Nisan',
		'Mayıs',
		'Haziran',
		'Temmuz',
		'Ağustos',
		'Eylül',
		'Ekim',
		'Kasım',
		'Aralık',
	];
	return months[month];
}

/**
 * Check if a reservation occupies a specific date
 */
export function isDateInReservation(date: string, reservation: Reservation): boolean {
	return reservation.checkIn <= date && date <= reservation.checkOut;
}

/**
 * Check if date range conflicts with existing reservations
 */
export function hasDateConflict(
	roomId: string,
	startDate: string,
	endDate: string,
	reservations: Reservation[],
	excludeReservationId?: string
): boolean {
	const roomReservations = reservations.filter(
		(r) => r.roomId === roomId && r.id !== excludeReservationId
	);

	return roomReservations.some((reservation) => {
		// Check if there's any overlap
		return !(endDate < reservation.checkIn || startDate > reservation.checkOut);
	});
}

/**
 * Get all reservations for a room on a specific date
 */
export function getReservationsForRoomAndDate(
	roomId: string,
	date: string,
	reservations: Reservation[]
): Reservation | undefined {
	return reservations.find((r) => r.roomId === roomId && isDateInReservation(date, r));
}

/**
 * Calculate number of days between two dates (inclusive)
 */
export function calculateNumberOfDays(startDate: string, endDate: string): number {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const diffTime = end.getTime() - start.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays + 1; // +1 to include both start and end date
}

/**
 * Get unavailable dates for a room
 */
export function getUnavailableDates(roomId: string, reservations: Reservation[]): string[] {
	const unavailableDates: string[] = [];
	const roomReservations = reservations.filter((r) => r.roomId === roomId);

	roomReservations.forEach((reservation) => {
		const start = new Date(reservation.checkIn);
		const end = new Date(reservation.checkOut);
		const current = new Date(start);

		while (current <= end) {
			unavailableDates.push(formatDateToString(current));
			current.setDate(current.getDate() + 1);
		}
	});

	return unavailableDates;
}


/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayString(): string {
	const today = new Date();
	return today.toISOString().split('T')[0];
}

/**
 * Check if a date is today
 */
export function isToday(dateString: string): boolean {
	return dateString === getTodayString();
}

/**
 * Check if a date is in the past
 */
export function isPast(dateString: string): boolean {
	return dateString < getTodayString();
}

/**
 * Check if a date is in the future
 */
export function isFuture(dateString: string): boolean {
	return dateString > getTodayString();
}

/**
 * Format date to Turkish format (e.g., "31 Ağu")
 */
export function formatDateTurkish(dateString: string): string {
	const date = new Date(dateString);
	const day = date.getDate();
	const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
	return `${day} ${monthNames[date.getMonth()]}`;
}


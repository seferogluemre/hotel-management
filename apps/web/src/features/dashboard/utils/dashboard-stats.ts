import type { Reservation, Room } from '../../rooms/types/types';

export interface DashboardStats {
	totalRevenue: number;
	totalReservations: number;
	occupancyRate: number;
	activeGuests: number;
	revenueChange: string;
	reservationChange: string;
	occupancyChange: string;
}

export interface AgencySale {
	name: string;
	channel: string;
	reservations: number;
	revenue: number;
	trend: 'up' | 'down' | 'neutral';
}

export interface MonthlyRevenue {
	name: string;
	label: string;
	total: number;
}

/**
 * Belirli bir tarih aralığındaki rezervasyonları filtreler
 */
function getReservationsInDateRange(
	reservations: Reservation[],
	startDate: Date,
	endDate: Date
): Reservation[] {
	return reservations.filter((res) => {
		const checkIn = new Date(res.checkIn);
		const checkOut = new Date(res.checkOut);
		return checkIn <= endDate && checkOut >= startDate;
	});
}

/**
 * Dashboard için ana istatistikleri hesaplar
 */
export function calculateDashboardStats(
	reservations: Reservation[],
	rooms: Room[]
): DashboardStats {
	const today = new Date();
	const currentMonth = today.getMonth();
	const currentYear = today.getFullYear();

	// Bu ay
	const currentMonthStart = new Date(currentYear, currentMonth, 1);
	const currentMonthEnd = new Date(currentYear, currentMonth + 1, 0);

	// Geçen ay
	const lastMonthStart = new Date(currentYear, currentMonth - 1, 1);
	const lastMonthEnd = new Date(currentYear, currentMonth, 0);

	// Bu ayki rezervasyonlar
	const currentMonthReservations = getReservationsInDateRange(
		reservations,
		currentMonthStart,
		currentMonthEnd
	);

	// Geçen ayki rezervasyonlar
	const lastMonthReservations = getReservationsInDateRange(
		reservations,
		lastMonthStart,
		lastMonthEnd
	);

	// Toplam gelir (bu ay)
	const totalRevenue = currentMonthReservations.reduce(
		(sum, res) => sum + (res.totalPrice || 0),
		0
	);

	const lastMonthRevenue = lastMonthReservations.reduce(
		(sum, res) => sum + (res.totalPrice || 0),
		0
	);

	// Gelir değişimi
	const revenueChange =
		lastMonthRevenue > 0
			? ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
			: 0;

	// Rezervasyon değişimi
	const reservationChange =
		lastMonthReservations.length > 0
			? ((currentMonthReservations.length - lastMonthReservations.length) /
					lastMonthReservations.length) *
				100
			: 0;

	// Aktif misafirler (bugün konaklayanlar)
	const todayStr = today.toISOString().split('T')[0];
	const activeGuests = reservations.filter((res) => {
		return res.checkIn <= todayStr && res.checkOut >= todayStr && res.status === 'checked_in';
	}).length;

	// Doluluk oranı (bu ay)
	const totalRoomDays = rooms.length * currentMonthEnd.getDate();
	const bookedDays = currentMonthReservations.reduce(
		(sum, res) => sum + (res.numberOfNights || 0),
		0
	);
	const occupancyRate = (bookedDays / totalRoomDays) * 100;

	// Geçen ayın doluluk oranı
	const lastMonthDays = lastMonthEnd.getDate();
	const lastMonthTotalRoomDays = rooms.length * lastMonthDays;
	const lastMonthBookedDays = lastMonthReservations.reduce(
		(sum, res) => sum + (res.numberOfNights || 0),
		0
	);
	const lastMonthOccupancy = (lastMonthBookedDays / lastMonthTotalRoomDays) * 100;
	const occupancyChange = occupancyRate - lastMonthOccupancy;

	return {
		totalRevenue: Math.round(totalRevenue),
		totalReservations: currentMonthReservations.length,
		occupancyRate: Math.round(occupancyRate * 10) / 10,
		activeGuests,
		revenueChange: revenueChange > 0 ? `+${revenueChange.toFixed(1)}%` : `${revenueChange.toFixed(1)}%`,
		reservationChange:
			reservationChange > 0
				? `+${reservationChange.toFixed(1)}%`
				: `${reservationChange.toFixed(1)}%`,
		occupancyChange:
			occupancyChange > 0 ? `+${occupancyChange.toFixed(1)}%` : `${occupancyChange.toFixed(1)}%`,
	};
}

/**
 * Acente bazlı satışları hesaplar
 */
export function calculateAgencySales(reservations: Reservation[]): AgencySale[] {
	const agencyMap = new Map<string, { reservations: number; revenue: number; months: Set<string> }>();

	reservations.forEach((res) => {
		const channel = res.bookingChannel || 'Direct';
		const month = res.checkIn.substring(0, 7); // YYYY-MM

		if (!agencyMap.has(channel)) {
			agencyMap.set(channel, { reservations: 0, revenue: 0, months: new Set() });
		}

		const data = agencyMap.get(channel)!;
		data.reservations += 1;
		data.revenue += res.totalPrice || 0;
		data.months.add(month);
	});

	// Trend hesapla (son 2 ayı karşılaştır)
	const today = new Date();
	const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
	const lastMonth = `${today.getFullYear()}-${String(today.getMonth()).padStart(2, '0')}`;

	const result: AgencySale[] = [];

	agencyMap.forEach((data, channel) => {
		// Bu ay ve geçen ayki rezervasyon sayıları
		const currentMonthCount = reservations.filter(
			(r) => r.bookingChannel === channel && r.checkIn.startsWith(currentMonth)
		).length;

		const lastMonthCount = reservations.filter(
			(r) => r.bookingChannel === channel && r.checkIn.startsWith(lastMonth)
		).length;

		let trend: 'up' | 'down' | 'neutral' = 'neutral';
		if (currentMonthCount > lastMonthCount) trend = 'up';
		else if (currentMonthCount < lastMonthCount) trend = 'down';

		result.push({
			name: channel,
			channel: channel === 'Direct' ? 'Direkt' : 'Online',
			reservations: data.reservations,
			revenue: Math.round(data.revenue),
			trend,
		});
	});

	// Gelire göre sırala
	return result.sort((a, b) => b.revenue - a.revenue);
}

/**
 * Aylık gelir verilerini hesaplar
 */
export function calculateMonthlyRevenue(reservations: Reservation[]): MonthlyRevenue[] {
	const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
	const monthLabels = [
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

	const monthlyData: MonthlyRevenue[] = monthNames.map((name, index) => ({
		name,
		label: monthLabels[index],
		total: 0,
	}));

	reservations.forEach((res) => {
		const date = new Date(res.checkIn);
		const month = date.getMonth();
		monthlyData[month].total += res.totalPrice || 0;
	});

	return monthlyData;
}


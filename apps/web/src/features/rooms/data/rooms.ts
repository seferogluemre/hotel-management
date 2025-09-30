import type { Room } from '../types/types';
import { getTodayString } from '../utils/date-utils';

// Helper to get date strings relative to today
const today = getTodayString();
const getDateOffset = (days: number): string => {
	const date = new Date();
	date.setDate(date.getDate() + days);
	return date.toISOString().split('T')[0];
};

export const rooms: Room[] = [
	{
		id: 'r-101',
		number: '101',
		type: 'suite',
		pricePerNight: 75,
		currency: 'EUR',
		capacity: 1,
		status: 'needs_cleaning',
		amenities: ['WiFi', 'AC', 'TV'],
		floor: 1,
		imageUrl: '/images/rooms/101.jpg',
		guestName: 'Gülşah Koçak',
		checkIn: getDateOffset(-5), // Checked in 5 days ago
		checkOut: today, // Checking out today - should auto move to needs_cleaning
	},
	{
		id: 'r-102',
		number: '102',
		type: 'single',
		pricePerNight: 110,
		currency: 'EUR',
		capacity: 2,
		status: 'needs_cleaning',
		amenities: ['WiFi', 'AC', 'TV', 'Mini Bar'],
		floor: 1,
		imageUrl: '/images/rooms/102.jpg',
		guestName: 'Ahmet Yılmaz',
		checkIn: getDateOffset(-3), // Checked in 3 days ago
		checkOut: getDateOffset(-1), // Checked out yesterday
	},
	{
		id: 'r-103',
		number: '103',
		type: 'single',
		pricePerNight: 220,
		currency: 'EUR',
		capacity: 3,
		status: 'occupied',
		amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Balcony'],
		floor: 1,
		imageUrl: '/images/rooms/103.jpg',
		guestName: 'Ayşe Demir',
		checkIn: getDateOffset(-1), // Checked in yesterday
		checkOut: getDateOffset(10), // Will check out in 10 days
	},
	{
		id: 'r-104',
		number: '104',
		type: 'double',
		pricePerNight: 180,
		currency: 'EUR',
		capacity: 2,
		status: 'occupied',
		amenities: ['WiFi', 'AC', 'TV', 'Sea View'],
		floor: 1,
		imageUrl: '/images/rooms/104.jpg',
		guestName: 'Mehmet Kaya',
		checkIn: today, // Checking in today
		checkOut: getDateOffset(5), // Will check out in 5 days
	},
	{
		id: 'r-105',
		number: '105',
		type: 'single',
		pricePerNight: 95,
		currency: 'EUR',
		capacity: 1,
		status: 'available',
		amenities: ['WiFi', 'AC', 'TV'],
		floor: 1,
		imageUrl: '/images/rooms/105.jpg',
		// Available for today's check-in
	},
	{
		id: 'r-106',
		number: '106',
		type: 'suite',
		pricePerNight: 250,
		currency: 'EUR',
		capacity: 4,
		status: 'needs_cleaning',
		amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Balcony', 'Jacuzzi'],
		floor: 1,
		imageUrl: '/images/rooms/106.jpg',
		guestName: 'Gülşah Koçak',
		checkIn: getDateOffset(-7), // Checked in 7 days ago
		checkOut: getDateOffset(-2), // Checked out 2 days ago
	},
	{
		id: 'r-107',
		number: '107',
		type: 'double',
		pricePerNight: 120,
		currency: 'EUR',
		capacity: 2,
		status: 'available',
		amenities: ['WiFi', 'AC', 'TV'],
		floor: 1,
		imageUrl: '/images/rooms/107.jpg',
		// Future check-in scheduled
		guestName: 'Can Yılmaz',
		checkIn: getDateOffset(2), // Will check in in 2 days
		checkOut: getDateOffset(5), // Will check out in 5 days
	},
	{
		id: 'r-108',
		number: '108',
		type: 'single',
		pricePerNight: 85,
		currency: 'EUR',
		capacity: 1,
		status: 'available',
		amenities: ['WiFi', 'AC', 'TV'],
		floor: 1,
		imageUrl: '/images/rooms/108.jpg',
	},
	{
		id: 'r-109',
		number: '109',
		type: 'single',
		pricePerNight: 85,
		currency: 'EUR',
		capacity: 1,
		status: 'available',
		amenities: ['WiFi', 'AC', 'TV'],
		floor: 1,
		imageUrl: '/images/rooms/109.jpg',
	},
	{
		id: 'r-110',
		number: '110',
		type: 'double',
		pricePerNight: 115,
		currency: 'EUR',
		capacity: 2,
		status: 'available',
		amenities: ['WiFi', 'AC', 'TV', 'Mini Bar'],
		floor: 1,
		imageUrl: '/images/rooms/110.jpg',
		guestName: 'Fatma Şahin',
		checkIn: today, // Checking in today
		checkOut: getDateOffset(2), // Will check out in 2 days
	},
];

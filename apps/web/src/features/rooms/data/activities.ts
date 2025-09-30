import type { RoomActivity } from '../types/types';

export const roomActivities: RoomActivity[] = [
	// Room 102 activities
	{
		id: 'act-001',
		roomId: 'r-102',
		type: 'check_out',
		title: 'Çıkış Yapıldı',
		description: 'Ahmet Yılmaz odadan çıkış yaptı',
		timestamp: '2025-09-07T03:00:00Z',
	},
	{
		id: 'act-002',
		roomId: 'r-102',
		type: 'check_in',
		title: 'Giriş Yapıldı',
		description: 'Ahmet Yılmaz giriş yaptı',
		timestamp: '2025-09-04T14:00:00Z',
	},
	{
		id: 'act-003',
		roomId: 'r-102',
		type: 'reservation_created',
		title: 'Rezervasyon Oluşturuldu',
		description: 'Hotels.com üzerinden 3 gecelik rezervasyon oluşturuldu',
		timestamp: '2025-09-01T10:30:00Z',
	},

	// Room 103 activities
	{
		id: 'act-004',
		roomId: 'r-103',
		type: 'check_in',
		title: 'Giriş Yapıldı',
		description: 'Ayşe Demir giriş yaptı',
		timestamp: '2025-09-02T15:30:00Z',
	},
	{
		id: 'act-005',
		roomId: 'r-103',
		type: 'cleaning',
		title: 'Temizlik Yapıldı',
		description: 'Oda temizliği tamamlandı',
		timestamp: '2025-09-02T11:00:00Z',
	},

	// Room 104 activities
	{
		id: 'act-006',
		roomId: 'r-104',
		type: 'reservation_created',
		title: 'Rezervasyon Oluşturuldu',
		description: 'Doğrudan rezervasyon oluşturuldu',
		timestamp: '2025-09-05T09:15:00Z',
	},

	// Room 101 activities
	{
		id: 'act-007',
		roomId: 'r-101',
		type: 'check_out',
		title: 'Çıkış Yapıldı',
		description: 'Gülşah Koçak odadan çıkış yaptı',
		timestamp: '2025-09-07T11:00:00Z',
	},
	{
		id: 'act-008',
		roomId: 'r-101',
		type: 'check_in',
		title: 'Giriş Yapıldı',
		description: 'Gülşah Koçak giriş yaptı',
		timestamp: '2025-08-31T16:00:00Z',
	},
	{
		id: 'act-009',
		roomId: 'r-101',
		type: 'cleaning',
		title: 'Temizlik Yapıldı',
		description: 'Oda temizliği tamamlandı',
		timestamp: '2025-08-31T13:00:00Z',
	},
];


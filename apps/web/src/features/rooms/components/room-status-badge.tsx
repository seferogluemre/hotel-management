import { Badge } from '#/components/ui/badge';
import type { RoomStatus } from '../types/types';

export function RoomStatusBadge({ status }: { status: RoomStatus }) {
	switch (status) {
		case 'available':
			return <Badge className="bg-green-500 hover:bg-green-600 text-white">Müsait</Badge>;
		case 'occupied':
			return <Badge variant="secondary">Dolu</Badge>;
		case 'cleaning':
			return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Temizleniyor</Badge>;
		case 'needs_cleaning':
			return <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Temizlenmeli</Badge>;
		case 'maintenance':
			return <Badge variant="destructive">Bakım</Badge>;
		case 'blocked':
			return <Badge className="bg-gray-500 hover:bg-gray-600 text-white">Bloklu</Badge>;
		default:
			return <Badge>Bilinmiyor</Badge>;
	}
} 
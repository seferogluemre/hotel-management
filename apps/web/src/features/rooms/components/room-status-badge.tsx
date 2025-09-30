import { Badge } from '#/components/ui/badge';
import type { RoomStatus } from '../types';

export function RoomStatusBadge({ status }: { status: RoomStatus }) {
	switch (status) {
		case 'available':
			return <Badge variant="outline">Available</Badge>;
		case 'occupied':
			return <Badge variant="secondary">Occupied</Badge>;
		case 'cleaning':
			return <Badge>Cleaning</Badge>;
		case 'maintenance':
			return <Badge variant="destructive">Maintenance</Badge>;
		default:
			return <Badge>Unknown</Badge>;
	}
} 
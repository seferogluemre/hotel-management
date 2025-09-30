import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import type { Room } from '../../types/types';
import { RoomStatusBadge } from '../../components/room-status-badge';

export function RoomSummary({ room }: { room: Room }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Room {room.number}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2 sm:grid-cols-2">
					<div>
						<div className="text-sm text-muted-foreground">Type</div>
						<div className="capitalize">{room.type}</div>
					</div>
					<div>
						<div className="text-sm text-muted-foreground">Capacity</div>
						<div>{room.capacity}</div>
					</div>
					<div>
						<div className="text-sm text-muted-foreground">Status</div>
						<div><RoomStatusBadge status={room.status} /></div>
					</div>
					<div>
						<div className="text-sm text-muted-foreground">Price</div>
						<div>{room.pricePerNight} {room.currency} / night</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
} 
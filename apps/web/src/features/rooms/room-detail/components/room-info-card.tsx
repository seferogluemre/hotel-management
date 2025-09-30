import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import { Bed, Building2, CircleDot } from 'lucide-react';
import type { Room } from '../../types/types';
import { RoomStatusBadge } from '../../components/room-status-badge';

export function RoomInfoCard({ room }: { room: Room }) {
	const getRoomTypeLabel = (type: string) => {
		switch (type) {
			case 'single':
				return 'Tek Kişilik';
			case 'double':
				return 'Çift Kişilik';
			case 'suite':
				return 'Suit';
			case 'deluxe':
				return 'Deluxe';
			default:
				return type;
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Oda Bilgileri</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
						<Bed className="h-5 w-5 text-muted-foreground" />
					</div>
					<div className="flex-1">
						<div className="text-sm text-muted-foreground">Oda Tipi</div>
						<div className="font-medium">{getRoomTypeLabel(room.type)}</div>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
						<Building2 className="h-5 w-5 text-muted-foreground" />
					</div>
					<div className="flex-1">
						<div className="text-sm text-muted-foreground">Kat</div>
						<div className="font-medium">{room.floor}. Kat</div>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
						<CircleDot className="h-5 w-5 text-muted-foreground" />
					</div>
					<div className="flex-1">
						<div className="text-sm text-muted-foreground">Durum</div>
						<div className="mt-1">
							<RoomStatusBadge status={room.status} />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}


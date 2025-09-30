import { Card, CardContent, CardHeader } from '#/components/ui/card';
import { Button } from '#/components/ui/button';
import { MoreVertical, ArrowRight } from 'lucide-react';
import { RoomStatusBadge } from './room-status-badge';
import type { Room } from '../types/types';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu';

interface RoomCardProps {
	room: Room;
	onView?: (roomId: string) => void;
}

export function RoomCard({ room, onView }: RoomCardProps) {
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

	const formatDate = (dateString?: string) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		const day = date.getDate();
		const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
		return `${day} ${monthNames[date.getMonth()]}`;
	};

	return (
		<Card className="relative hover:shadow-lg transition-shadow">
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<div className="flex items-start gap-2">
						<h3 className="text-2xl font-bold">{room.number}</h3>
						<RoomStatusBadge status={room.status} />
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="h-8 w-8">
								<MoreVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => onView?.(room.id)}>Detay</DropdownMenuItem>
							<DropdownMenuItem>Düzenle</DropdownMenuItem>
							<DropdownMenuItem>Rezervasyon Yap</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				{room.status === 'blocked' && (
					<div className="mt-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
						10 block
					</div>
				)}
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="text-sm text-muted-foreground">
					{getRoomTypeLabel(room.type)}
				</div>
				{room.guestName && (
					<div className="space-y-2">
						<div className="font-medium">{room.guestName}</div>
						{room.checkIn && room.checkOut && (
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<span>{formatDate(room.checkIn)}</span>
								<ArrowRight className="h-3 w-3" />
								<span>{formatDate(room.checkOut)}</span>
							</div>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}


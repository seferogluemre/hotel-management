import { Card, CardContent, CardHeader } from '#/components/ui/card';
import { Button } from '#/components/ui/button';
import { MoreVertical, ArrowRight, Eye, Edit, Calendar, Sparkles } from 'lucide-react';
import { RoomStatusBadge } from './room-status-badge';
import type { Room } from '../types/types';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu';
import { formatDateTurkish } from '../utils/date-utils';

interface RoomCardProps {
	room: Room;
	onView?: (roomId: string) => void;
	onClean?: (room: Room) => void;
	onReserve?: (room: Room) => void;
}

export function RoomCard({ room, onView, onClean, onReserve }: RoomCardProps) {
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

	// Only show guest info if:
	// 1. Check-in is today or in the past AND check-out is today or in the future (currently staying)
	// 2. Check-in is today (checking in today)
	const shouldShowGuestInfo = () => {
		if (!room.guestName || !room.checkIn || !room.checkOut) return false;
		
		const checkInDate = room.checkIn;
		const checkOutDate = room.checkOut;
		const today = new Date().toISOString().split('T')[0];
		
		// Show if currently staying (check-in <= today AND check-out >= today)
		if (checkInDate <= today && checkOutDate >= today) return true;
		
		return false;
	};

	const showCleaningOption = room.status === 'needs_cleaning';

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
						<DropdownMenuContent align="end" className="w-48">
							<DropdownMenuItem onClick={() => onView?.(room.id)}>
								<Eye className="mr-2 h-4 w-4" />
								Detay
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Edit className="mr-2 h-4 w-4" />
								Düzenle
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => onReserve?.(room)}>
								<Calendar className="mr-2 h-4 w-4" />
								Rezervasyon Yap
							</DropdownMenuItem>
							{showCleaningOption && (
								<>
									<DropdownMenuSeparator />
									<DropdownMenuItem 
										onClick={() => onClean?.(room)}
										className="text-green-600 dark:text-green-400 focus:text-green-600 dark:focus:text-green-400"
									>
										<Sparkles className="mr-2 h-4 w-4" />
										Temizlik Yapıldı
									</DropdownMenuItem>
								</>
							)}
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
				{shouldShowGuestInfo() && room.guestName && (
					<div className="space-y-2">
						<div className="font-medium">{room.guestName}</div>
						{room.checkIn && room.checkOut && (
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<span>{formatDateTurkish(room.checkIn)}</span>
								<ArrowRight className="h-3 w-3" />
								<span>{formatDateTurkish(room.checkOut)}</span>
							</div>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}


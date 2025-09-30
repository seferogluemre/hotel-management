import { Eye, Calendar, User, Mail, Phone, Building, Banknote } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '#/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '#/components/ui/popover';
import { Separator } from '#/components/ui/separator';
import type { Reservation, Room } from '../../rooms/types/types';

interface ReservationPopoverProps {
	reservation: Reservation;
	room: Room;
	children: React.ReactNode;
}

export function ReservationPopover({ reservation, room, children }: ReservationPopoverProps) {
	const navigate = useNavigate();

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const day = date.getDate();
		const monthNames = [
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
		const year = date.getFullYear();
		return `${day} ${monthNames[date.getMonth()]} ${year}`;
	};

	const handleViewDetails = () => {
		navigate({ to: '/rooms/$roomId', params: { roomId: room.id } });
	};

	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent className="w-80" side="bottom" align="start">
				<div className="space-y-3">
					{/* Header */}
					<div className="flex items-start justify-between">
						<div>
							<h4 className="font-semibold">Oda {room.number}</h4>
							<p className="text-sm text-muted-foreground">Rezervasyon Detayları</p>
						</div>
						<Button
							size="sm"
							variant="ghost"
							className="h-8 w-8 p-0"
							onClick={handleViewDetails}
							title="Oda detaylarını görüntüle"
						>
							<Eye className="h-4 w-4" />
						</Button>
					</div>

					<Separator />

					{/* Guest Info */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-sm">
							<User className="h-4 w-4 text-muted-foreground" />
							<span className="font-medium">{reservation.guestName}</span>
						</div>

						{reservation.guestEmail && (
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Mail className="h-4 w-4" />
								<span className="truncate">{reservation.guestEmail}</span>
							</div>
						)}

						{reservation.guestPhone && (
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Phone className="h-4 w-4" />
								<span>{reservation.guestPhone}</span>
							</div>
						)}
					</div>

					<Separator />

					{/* Reservation Details */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-sm">
							<Calendar className="h-4 w-4 text-muted-foreground" />
							<div className="flex-1">
								<div className="font-medium">
									{formatDate(reservation.checkIn)} - {formatDate(reservation.checkOut)}
								</div>
								{reservation.numberOfNights && (
									<div className="text-xs text-muted-foreground">{reservation.numberOfNights} gece</div>
								)}
							</div>
						</div>

						{reservation.bookingChannel && (
							<div className="flex items-center gap-2 text-sm">
								<Building className="h-4 w-4 text-muted-foreground" />
								<span className="text-muted-foreground">{reservation.bookingChannel}</span>
							</div>
						)}

						{reservation.totalPrice && (
							<div className="flex items-center gap-2 text-sm">
								<Banknote className="h-4 w-4 text-muted-foreground" />
								<span className="font-medium">
									{reservation.totalPrice} {reservation.currency === 'TRY' ? '₺' : reservation.currency}
								</span>
							</div>
						)}
					</div>

					<Separator />

					{/* Footer */}
					<Button onClick={handleViewDetails} size="sm" className="w-full">
						<Eye className="mr-2 h-4 w-4" />
						Oda Detaylarını Gör
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}


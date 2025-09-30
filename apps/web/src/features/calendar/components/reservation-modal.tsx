import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '#/components/ui/dialog';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '#/components/ui/select';
import { Calendar } from '#/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '#/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import type { Room, Reservation } from '../../rooms/types/types';
import { hasDateConflict, calculateNumberOfDays, getUnavailableDates } from '../utils/calendar-helpers';
import { cn } from '#/lib/utils';

interface ReservationModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	room: Room | null;
	selectedDate?: string;
	reservations: Reservation[];
	onCreateReservation: (reservation: Omit<Reservation, 'id'>) => void;
}

export function ReservationModal({
	open,
	onOpenChange,
	room,
	selectedDate,
	reservations,
	onCreateReservation,
}: ReservationModalProps) {
	const [checkIn, setCheckIn] = useState<Date | undefined>(selectedDate ? new Date(selectedDate) : undefined);
	const [checkOut, setCheckOut] = useState<Date | undefined>();
	const [guestName, setGuestName] = useState('');
	const [guestEmail, setGuestEmail] = useState('');
	const [guestPhone, setGuestPhone] = useState('');
	const [guestIdentity, setGuestIdentity] = useState('');
	const [bookingChannel, setBookingChannel] = useState('');
	const [totalPrice, setTotalPrice] = useState('');

	// Reset form when modal opens/closes
	useEffect(() => {
		if (open && selectedDate) {
			setCheckIn(new Date(selectedDate));
		} else if (!open) {
			setCheckIn(undefined);
			setCheckOut(undefined);
			setGuestName('');
			setGuestEmail('');
			setGuestPhone('');
			setGuestIdentity('');
			setBookingChannel('');
			setTotalPrice('');
		}
	}, [open, selectedDate]);

	const unavailableDates = room ? getUnavailableDates(room.id, reservations) : [];

	const isDateDisabled = (date: Date) => {
		const dateString = date.toISOString().split('T')[0];
		return unavailableDates.includes(dateString);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!room || !checkIn || !checkOut || !guestName || !bookingChannel) {
			toast.error('Lütfen tüm zorunlu alanları doldurun');
			return;
		}

		const checkInStr = checkIn.toISOString().split('T')[0];
		const checkOutStr = checkOut.toISOString().split('T')[0];

		if (checkInStr >= checkOutStr) {
			toast.error('Çıkış tarihi, giriş tarihinden sonra olmalıdır');
			return;
		}

		if (hasDateConflict(room.id, checkInStr, checkOutStr, reservations)) {
			toast.error('Seçilen tarihler mevcut rezervasyonlarla çakışıyor');
			return;
		}

		const numberOfNights = calculateNumberOfDays(checkInStr, checkOutStr) - 1;

		const newReservation: Omit<Reservation, 'id'> = {
			roomId: room.id,
			guestName,
			guestEmail: guestEmail || undefined,
			guestPhone: guestPhone || undefined,
			guestIdentity: guestIdentity || undefined,
			checkIn: checkInStr,
			checkOut: checkOutStr,
			status: 'confirmed',
			totalPrice: totalPrice ? parseFloat(totalPrice) : undefined,
			currency: 'TRY',
			bookingChannel,
			numberOfNights,
		};

		onCreateReservation(newReservation);
		onOpenChange(false);
		toast.success(`Oda ${room.number} için rezervasyon oluşturuldu 🎉`);
	};

	if (!room) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Yeni Rezervasyon - Oda {room.number}</DialogTitle>
					<DialogDescription>
						Oda için yeni bir rezervasyon oluşturun. Mevcut rezervasyonlarla çakışan tarihler seçilemez.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Date Selection */}
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="checkIn">Giriş Tarihi *</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										id="checkIn"
										variant="outline"
										className={cn(
											'w-full justify-start text-left font-normal',
											!checkIn && 'text-muted-foreground'
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{checkIn ? format(checkIn, 'PPP', { locale: tr }) : 'Tarih seçin'}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={checkIn}
										onSelect={setCheckIn}
										disabled={isDateDisabled}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className="space-y-2">
							<Label htmlFor="checkOut">Çıkış Tarihi *</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										id="checkOut"
										variant="outline"
										className={cn(
											'w-full justify-start text-left font-normal',
											!checkOut && 'text-muted-foreground'
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{checkOut ? format(checkOut, 'PPP', { locale: tr }) : 'Tarih seçin'}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={checkOut}
										onSelect={setCheckOut}
										disabled={isDateDisabled}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>

					{/* Guest Information */}
					<div className="space-y-2">
						<Label htmlFor="guestName">Misafir Adı *</Label>
						<Input
							id="guestName"
							value={guestName}
							onChange={(e) => setGuestName(e.target.value)}
							placeholder="Ahmet Yılmaz"
							required
						/>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="guestEmail">E-posta</Label>
							<Input
								id="guestEmail"
								type="email"
								value={guestEmail}
								onChange={(e) => setGuestEmail(e.target.value)}
								placeholder="ahmet@example.com"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="guestPhone">Telefon</Label>
							<Input
								id="guestPhone"
								type="tel"
								value={guestPhone}
								onChange={(e) => setGuestPhone(e.target.value)}
								placeholder="+90 555 123 4567"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="guestIdentity">TC Kimlik No</Label>
						<Input
							id="guestIdentity"
							value={guestIdentity}
							onChange={(e) => setGuestIdentity(e.target.value)}
							placeholder="12345678901"
							maxLength={11}
						/>
					</div>

					{/* Booking Details */}
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="bookingChannel">Rezervasyon Kanalı *</Label>
							<Select value={bookingChannel} onValueChange={setBookingChannel} required>
								<SelectTrigger id="bookingChannel">
									<SelectValue placeholder="Kanal seçin" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Direct">Direkt</SelectItem>
									<SelectItem value="Booking.com">Booking.com</SelectItem>
									<SelectItem value="Hotels.com">Hotels.com</SelectItem>
									<SelectItem value="Airbnb">Airbnb</SelectItem>
									<SelectItem value="Expedia">Expedia</SelectItem>
									<SelectItem value="Agoda">Agoda</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="totalPrice">Toplam Ücret (₺)</Label>
							<Input
								id="totalPrice"
								type="number"
								value={totalPrice}
								onChange={(e) => setTotalPrice(e.target.value)}
								placeholder="1500"
								min="0"
								step="0.01"
							/>
						</div>
					</div>

					<DialogFooter>
						<Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
							İptal
						</Button>
						<Button type="submit">Rezervasyon Oluştur</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}


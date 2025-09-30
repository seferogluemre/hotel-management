import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import { Calendar, CalendarCheck, Banknote, Moon, Building } from 'lucide-react';
import type { Reservation } from '../../types/types';

interface ReservationDetailsCardProps {
	reservation?: Reservation;
}

export function ReservationDetailsCard({ reservation }: ReservationDetailsCardProps) {
	if (!reservation) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Rezervasyon Detayları</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">Bu oda için aktif rezervasyon bulunmuyor.</p>
				</CardContent>
			</Card>
		);
	}

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

	return (
		<Card>
			<CardHeader>
				<CardTitle>Rezervasyon Detayları</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
							<Calendar className="h-5 w-5 text-muted-foreground" />
						</div>
						<div className="flex-1">
							<div className="text-sm text-muted-foreground">Giriş Tarihi</div>
							<div className="font-medium">{formatDate(reservation.checkIn)}</div>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
							<CalendarCheck className="h-5 w-5 text-muted-foreground" />
						</div>
						<div className="flex-1">
							<div className="text-sm text-muted-foreground">Çıkış Tarihi</div>
							<div className="font-medium">{formatDate(reservation.checkOut)}</div>
						</div>
					</div>

					{reservation.totalPrice && (
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
								<Banknote className="h-5 w-5 text-muted-foreground" />
							</div>
							<div className="flex-1">
								<div className="text-sm text-muted-foreground">Toplam Ücret</div>
								<div className="font-medium">
									{reservation.totalPrice} {reservation.currency === 'TRY' ? '₺' : reservation.currency}
								</div>
							</div>
						</div>
					)}

					{reservation.numberOfNights && (
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
								<Moon className="h-5 w-5 text-muted-foreground" />
							</div>
							<div className="flex-1">
								<div className="text-sm text-muted-foreground">Konaklama Süresi</div>
								<div className="font-medium">{reservation.numberOfNights} gece</div>
							</div>
						</div>
					)}

					{reservation.bookingChannel && (
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
								<Building className="h-5 w-5 text-muted-foreground" />
							</div>
							<div className="flex-1">
								<div className="text-sm text-muted-foreground">Rezervasyon Kanalı</div>
								<div className="font-medium">{reservation.bookingChannel}</div>
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}


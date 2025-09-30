import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import { User, Mail, Phone, CreditCard } from 'lucide-react';
import type { Reservation } from '../../types/types';

interface GuestInfoCardProps {
	reservation?: Reservation;
}

export function GuestInfoCard({ reservation }: GuestInfoCardProps) {
	if (!reservation) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Misafir Bilgileri</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">Şu anda bu odada misafir bulunmuyor.</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Misafir Bilgileri</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
						<User className="h-5 w-5 text-muted-foreground" />
					</div>
					<div className="flex-1">
						<div className="text-sm text-muted-foreground">İsim</div>
						<div className="font-medium">{reservation.guestName}</div>
					</div>
				</div>

				{reservation.guestEmail && (
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
							<Mail className="h-5 w-5 text-muted-foreground" />
						</div>
						<div className="flex-1">
							<div className="text-sm text-muted-foreground">E-posta</div>
							<div className="font-medium">{reservation.guestEmail}</div>
						</div>
					</div>
				)}

				{reservation.guestPhone && (
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
							<Phone className="h-5 w-5 text-muted-foreground" />
						</div>
						<div className="flex-1">
							<div className="text-sm text-muted-foreground">Telefon</div>
							<div className="font-medium">{reservation.guestPhone}</div>
						</div>
					</div>
				)}

				{reservation.guestIdentity && (
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
							<CreditCard className="h-5 w-5 text-muted-foreground" />
						</div>
						<div className="flex-1">
							<div className="text-sm text-muted-foreground">TC Kimlik No</div>
							<div className="font-medium">{reservation.guestIdentity}</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}


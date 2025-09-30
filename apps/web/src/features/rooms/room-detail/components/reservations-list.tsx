import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table';
import type { Reservation } from '../../types';

export function ReservationsList({ reservations }: { reservations: Reservation[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Reservations</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="w-full overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Guest</TableHead>
								<TableHead>Check-in</TableHead>
								<TableHead>Check-out</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{reservations.map((r) => (
								<TableRow key={r.id}>
									<TableCell className="font-medium">{r.guestName}</TableCell>
									<TableCell>{new Date(r.checkIn).toLocaleDateString()}</TableCell>
									<TableCell>{new Date(r.checkOut).toLocaleDateString()}</TableCell>
									<TableCell className="capitalize">{r.status.replace('_', ' ')}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
} 
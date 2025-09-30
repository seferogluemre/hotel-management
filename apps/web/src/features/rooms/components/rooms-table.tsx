import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table';
import { Button } from '#/components/ui/button';
import type { Room } from '../types';
import { RoomStatusBadge } from './room-status-badge';

export function RoomsTable({ rooms, onView }: { rooms: Room[]; onView?: (roomId: string) => void }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Rooms</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="w-full overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[80px]">Number</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Capacity</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Price</TableHead>
								<TableHead className="text-right">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{rooms.map((room) => (
								<TableRow key={room.id}>
									<TableCell className="font-medium">{room.number}</TableCell>
									<TableCell className="capitalize">{room.type}</TableCell>
									<TableCell>{room.capacity}</TableCell>
									<TableCell><RoomStatusBadge status={room.status} /></TableCell>
									<TableCell>
										{room.pricePerNight} {room.currency} / night
									</TableCell>
									<TableCell className="text-right">
										<Button size="sm" onClick={() => onView?.(room.id)}>View</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
} 
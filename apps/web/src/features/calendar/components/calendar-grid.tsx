import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '#/components/ui/button';
import { Card, CardContent, CardHeader } from '#/components/ui/card';
import type { Room, Reservation } from '../../rooms/types/types';
import { CalendarCell } from './calendar-cell';
import { ReservationModal } from './reservation-modal';
import { ReservationPopover } from './reservation-popover';
import {
	getDaysInMonth,
	getTurkishDayName,
	getTurkishMonthName,
	getReservationsForRoomAndDate,
	formatDateToString,
} from '../utils/calendar-helpers';
import { cn } from '#/lib/utils';

interface CalendarGridProps {
	rooms: Room[];
	reservations: Reservation[];
	onCreateReservation: (reservation: Omit<Reservation, 'id'>) => void;
}

export function CalendarGrid({ rooms, reservations, onCreateReservation }: CalendarGridProps) {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
	const [selectedDate, setSelectedDate] = useState<string | undefined>();

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const daysInMonth = getDaysInMonth(year, month);

	const handlePreviousMonth = () => {
		setCurrentDate(new Date(year, month - 1, 1));
	};

	const handleNextMonth = () => {
		setCurrentDate(new Date(year, month + 1, 1));
	};

	const handleCellClick = (room: Room, date: string) => {
		setSelectedRoom(room);
		setSelectedDate(date);
		setModalOpen(true);
	};

	// Calculate grid template columns
	const gridTemplateColumns = `200px repeat(${daysInMonth.length}, minmax(80px, 1fr))`;

	return (
		<>
			<Card>
				<CardHeader className="pb-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-bold">
							{getTurkishMonthName(month)} {year}
						</h2>
						<div className="flex gap-2">
							<Button variant="outline" size="icon" onClick={handlePreviousMonth}>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<Button variant="outline" size="icon" onClick={handleNextMonth}>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent className="p-0">
					<div className="overflow-x-auto">
						<div className="inline-block min-w-full">
							{/* Calendar Grid */}
							<div
								className="grid"
								style={{
									gridTemplateColumns,
								}}
							>
								{/* Header Row */}
								<div className="sticky left-0 z-20 flex items-center justify-center border-b-2 border-r bg-muted px-4 py-3 font-semibold">
									Oda
								</div>
								{daysInMonth.map((day) => (
									<div
										key={day.toISOString()}
										className={cn(
											'flex flex-col items-center justify-center border-b-2 border-r border-border bg-muted px-2 py-2 text-center',
											'sticky top-0 z-10'
										)}
									>
										<div className="text-lg font-bold">{day.getDate()}</div>
										<div className="text-[10px] text-muted-foreground uppercase">
											{getTurkishDayName(day)}
										</div>
									</div>
								))}

								{/* Room Rows */}
								{rooms.map((room) => (
									<>
										{/* Room Label */}
										<div
											key={`${room.id}-label`}
											className="sticky left-0 z-10 flex items-center border-b border-r bg-background px-4 py-3 font-medium"
										>
											Oda {room.number}
										</div>

										{/* Room Cells */}
										{daysInMonth.map((day) => {
											const dateStr = formatDateToString(day);
											const reservation = getReservationsForRoomAndDate(room.id, dateStr, reservations);

											// Check if this is the first day of a reservation
											const isFirstDay = reservation && reservation.checkIn === dateStr;
											const isLastDay = reservation && reservation.checkOut === dateStr;

											// Calculate span for multi-day reservations
											let spanDays = 1;
											if (reservation && isFirstDay) {
												const checkInDate = new Date(reservation.checkIn);
												const checkOutDate = new Date(reservation.checkOut);
												const remainingDays = daysInMonth.filter((d) => {
													const dStr = formatDateToString(d);
													return dStr >= reservation.checkIn && dStr <= reservation.checkOut;
												});
												spanDays = remainingDays.length;
											}

											// Render with popover if it's a reservation
											if (reservation && isFirstDay) {
												return (
													<ReservationPopover key={`${room.id}-${dateStr}`} reservation={reservation} room={room}>
														<CalendarCell
															reservation={reservation}
															isAvailable={false}
															isFirstDay={isFirstDay}
															isLastDay={isLastDay}
															spanDays={spanDays}
														/>
													</ReservationPopover>
												);
											}

											return (
												<CalendarCell
													key={`${room.id}-${dateStr}`}
													reservation={reservation}
													isAvailable={!reservation}
													isFirstDay={isFirstDay}
													isLastDay={isLastDay}
													spanDays={spanDays}
													onClick={() => !reservation && handleCellClick(room, dateStr)}
												/>
											);
										})}
									</>
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Reservation Modal */}
			<ReservationModal
				open={modalOpen}
				onOpenChange={setModalOpen}
				room={selectedRoom}
				selectedDate={selectedDate}
				reservations={reservations}
				onCreateReservation={onCreateReservation}
			/>
		</>
	);
}


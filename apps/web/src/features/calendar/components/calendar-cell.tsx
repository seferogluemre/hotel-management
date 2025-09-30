import { cn } from '#/lib/utils';
import type { Reservation } from '../../rooms/types/types';

interface CalendarCellProps {
	reservation?: Reservation;
	isAvailable: boolean;
	isFirstDay?: boolean;
	isLastDay?: boolean;
	spanDays?: number;
	onClick?: () => void;
}

export function CalendarCell({
	reservation,
	isAvailable,
	isFirstDay,
	isLastDay,
	spanDays = 1,
	onClick,
}: CalendarCellProps) {
	// If there's a reservation but it's not the first day, don't render anything (colspan handles it)
	if (reservation && !isFirstDay) {
		return null;
	}

	// Available cell
	if (isAvailable) {
		return (
			<div
				onClick={onClick}
				className={cn(
					'flex items-center justify-center px-2 py-3 text-xs font-medium transition-colors cursor-pointer',
					'bg-green-50 text-green-600 hover:bg-green-100',
					'dark:bg-green-950/50 dark:text-green-400 dark:hover:bg-green-950/70',
					'border-r border-b border-border'
				)}
			>
				Müsait
			</div>
		);
	}

	// Reservation cell
	if (reservation) {
		return (
			<div
				className={cn(
					'flex flex-col justify-center px-3 py-3 text-xs transition-colors cursor-pointer',
					'bg-blue-500 text-white hover:bg-blue-600',
					'dark:bg-blue-600 dark:hover:bg-blue-700',
					'border-r border-b border-blue-600 dark:border-blue-700',
					isFirstDay && 'rounded-l-md',
					isLastDay && 'rounded-r-md'
				)}
				style={{
					gridColumn: spanDays > 1 ? `span ${spanDays}` : undefined,
				}}
			>
				<div className="font-semibold truncate">{reservation.guestName}</div>
				{reservation.bookingChannel && (
					<div className="text-[10px] opacity-90 truncate">{reservation.bookingChannel}</div>
				)}
			</div>
		);
	}

	// Empty cell (should not happen, but just in case)
	return (
		<div className="border-r border-b border-border bg-background" />
	);
}


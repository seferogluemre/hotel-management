import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import { LogIn, LogOut, Sparkles, Wrench, Calendar, XCircle } from 'lucide-react';
import type { RoomActivity } from '../../types/types';
import { cn } from '#/lib/utils';

interface ActivityTimelineProps {
	activities: RoomActivity[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
	const getActivityIcon = (type: RoomActivity['type']) => {
		switch (type) {
			case 'check_in':
				return <LogIn className="h-4 w-4" />;
			case 'check_out':
				return <LogOut className="h-4 w-4" />;
			case 'cleaning':
				return <Sparkles className="h-4 w-4" />;
			case 'maintenance':
				return <Wrench className="h-4 w-4" />;
			case 'reservation_created':
				return <Calendar className="h-4 w-4" />;
			case 'reservation_cancelled':
				return <XCircle className="h-4 w-4" />;
			default:
				return null;
		}
	};

	const getActivityColor = (type: RoomActivity['type']) => {
		switch (type) {
			case 'check_in':
				return 'bg-green-500';
			case 'check_out':
				return 'bg-blue-500';
			case 'cleaning':
				return 'bg-purple-500';
			case 'maintenance':
				return 'bg-orange-500';
			case 'reservation_created':
				return 'bg-cyan-500';
			case 'reservation_cancelled':
				return 'bg-red-500';
			default:
				return 'bg-gray-500';
		}
	};

	const formatTimestamp = (timestamp: string) => {
		const date = new Date(timestamp);
		const day = date.getDate();
		const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
		const year = date.getFullYear();
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		
		return {
			date: `${day} ${monthNames[date.getMonth()]} ${year}`,
			time: `${hours}:${minutes}`,
		};
	};

	if (activities.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>İşlem Geçmişi</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">Henüz işlem geçmişi bulunmuyor.</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>İşlem Geçmişi</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="relative space-y-4">
					{/* Timeline line */}
					<div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-border" />

					{activities.map((activity, index) => {
						const { date, time } = formatTimestamp(activity.timestamp);
						const isLast = index === activities.length - 1;

						return (
							<div key={activity.id} className="relative flex gap-4">
								{/* Icon circle */}
								<div
									className={cn(
										'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white',
										getActivityColor(activity.type)
									)}
								>
									{getActivityIcon(activity.type)}
								</div>

								{/* Content */}
								<div className={cn('flex-1 pb-4', !isLast && 'border-b')}>
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1">
											<h4 className="font-medium">{activity.title}</h4>
											<p className="mt-1 text-sm text-muted-foreground">{activity.description}</p>
										</div>
										<div className="text-right text-sm text-muted-foreground">
											<div>{date}</div>
											<div className="mt-0.5">{time}</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}


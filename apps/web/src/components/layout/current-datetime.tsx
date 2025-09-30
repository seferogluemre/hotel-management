import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

export function CurrentDateTime() {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000); // Update every second

		return () => clearInterval(timer);
	}, []);

	const formatDate = (date: Date) => {
		const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
		const months = [
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

		const dayName = days[date.getDay()];
		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();

		return `${dayName}, ${day} ${month} ${year}`;
	};

	const formatTime = (date: Date) => {
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		const seconds = date.getSeconds().toString().padStart(2, '0');

		return `${hours}:${minutes}:${seconds}`;
	};

	return (
		<div className="hidden items-center gap-4 md:flex">
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Calendar className="h-4 w-4" />
				<span>{formatDate(currentTime)}</span>
			</div>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Clock className="h-4 w-4" />
				<span className="font-mono">{formatTime(currentTime)}</span>
			</div>
		</div>
	);
}


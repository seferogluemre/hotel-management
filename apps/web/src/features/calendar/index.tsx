import { Main } from '#/components/layout/main';
import { Header } from '#/components/layout/header';
import { TopNav } from '#/components/layout/top-nav';
import { Search } from '#/components/search';
import { ThemeSwitch } from '#/components/theme-switch';
import { ProfileDropdown } from '#/components/profile-dropdown';
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { reservations } from '../rooms/data';
import { rooms } from '../rooms/data';

const locales = { 'en-US': enUS } as const;
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
	getDay,
	locales,
});

export default function CalendarPage() {
	const events = reservations.map((r) => {
		const room = rooms.find((room) => room.id === r.roomId);
		return {
			title: `${room ? `#${room.number} · ` : ''}${r.guestName}`,
			start: new Date(r.checkIn),
			end: new Date(r.checkOut),
			resource: r,
		};
	});

	return (
		<>
			<Header>
				<TopNav links={[{ title: 'Calendar', href: 'calender', isActive: true, disabled: false }]} />
				<div className="ml-auto flex items-center space-x-4">
					<Search />
					<ThemeSwitch />
					<ProfileDropdown />
				</div>
			</Header>
			<Main>
				<Card>
					<CardHeader>
						<CardTitle>Reservations Calendar</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-[70vh]">
							<Calendar
								localizer={localizer}
								events={events}
								defaultView={Views.WEEK}
								startAccessor="start"
								endAccessor="end"
								style={{ height: '100%' }}
							/>
						</div>
					</CardContent>
				</Card>
			</Main>
		</>
	);
}

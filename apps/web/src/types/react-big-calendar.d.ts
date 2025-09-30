declare module 'react-big-calendar' {
	import type { ComponentType } from 'react';
	export interface Event {
		start: Date;
		end: Date;
		title?: string;
		allDay?: boolean;
		resource?: unknown;
	}
	export type View = 'month' | 'week' | 'work_week' | 'day' | 'agenda';
	export const Views: Record<string, View>;
	export const Calendar: ComponentType<{
		events: Event[];
		localizer: unknown;
		defaultView?: View;
		startAccessor?: string | ((event: Event) => Date);
		endAccessor?: string | ((event: Event) => Date);
		style?: any;
	}>;
	export function dateFnsLocalizer(config: any): unknown;
} 
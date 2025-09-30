import { createFileRoute } from '@tanstack/react-router'
import CalendarPage from '#features/calendar/index.tsx'

export const Route = createFileRoute('/_authenticated/calendar/')({
  component: CalendarPage,
})



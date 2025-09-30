import RoomsPage from '#features/rooms/index.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/rooms/')({
  component: RoomsPage,
})
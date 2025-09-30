import { createFileRoute } from '@tanstack/react-router'
import RoomDetail from '#features/rooms/room-detail'

export const Route = createFileRoute('/_authenticated/rooms/$roomId')({
  component: RoomDetail,
})



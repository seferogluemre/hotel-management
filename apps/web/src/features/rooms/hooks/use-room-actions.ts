import { useState } from 'react';
import { toast } from 'sonner';
import type { Room, RoomStatus } from '../types/types';

export function useRoomActions() {
	const [rooms, setRooms] = useState<Room[]>([]);

	const updateRoomStatus = (roomId: string, newStatus: RoomStatus, message: string) => {
		setRooms((prevRooms) =>
			prevRooms.map((room) =>
				room.id === roomId
					? { ...room, status: newStatus }
					: room
			)
		);
		toast.success(message);
	};

	const markRoomAsCleaned = (room: Room) => {
		updateRoomStatus(
			room.id,
			'available',
			`Oda ${room.number} temizlendi ve müsait duruma getirildi ✨`
		);
	};

	const createReservation = (room: Room) => {
		toast.info(`Oda ${room.number} için rezervasyon oluşturuluyor 📅`);
		// TODO: Implement reservation logic
	};

	return {
		rooms,
		setRooms,
		markRoomAsCleaned,
		createReservation,
	};
}


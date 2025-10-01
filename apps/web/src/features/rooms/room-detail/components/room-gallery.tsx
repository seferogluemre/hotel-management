import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { Card, CardContent } from '#/components/ui/card';
import { Button } from '#/components/ui/button';
import { Dialog, DialogContent } from '#/components/ui/dialog';
import { cn } from '#/lib/utils';

interface RoomGalleryProps {
	roomType: string;
	roomNumber: string;
	roomId: string;
}

// Hotel room images from Unsplash (high quality, free to use)
const getGalleryImages = (roomType: string, roomId: string) => {
	// All available images by room type
	const allImages: Record<string, any[]> = {
		suite: [
			{
				url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
				alt: 'Suit oda geniş alan',
			},
			{
				url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80',
				alt: 'Suit oda lüks detaylar',
			},
			{
				url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
				alt: 'Lüks yatak odası',
			},
			{
				url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
				alt: 'Premium banyo',
			},
			{
				url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
				alt: 'Suit oturma alanı',
			},
			{
				url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80',
				alt: 'Suit pencere manzarası',
			},
		],
		deluxe: [
			{
				url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80',
				alt: 'Deluxe oda premium yatak',
			},
			{
				url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80',
				alt: 'Deluxe oda modern tasarım',
			},
			{
				url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
				alt: 'Modern deluxe oda',
			},
			{
				url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80',
				alt: 'Deluxe yatak görünümü',
			},
			{
				url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
				alt: 'Deluxe oda detayları',
			},
			{
				url: 'https://images.unsplash.com/photo-1571508601936-63cae62ddeeb?w=1200&q=80',
				alt: 'Deluxe pencere görünümü',
			},
		],
		single: [
			{
				url: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80',
				alt: 'Tek kişilik oda yatak',
			},
			{
				url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80',
				alt: 'Tek kişilik oda görünümü',
			},
			{
				url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
				alt: 'Tek kişilik oda banyosu',
			},
			{
				url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80',
				alt: 'Tek kişilik oda penceresi',
			},
			{
				url: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=1200&q=80',
				alt: 'Konforlu tek kişilik oda',
			},
			{
				url: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200&q=80',
				alt: 'Modern tek kişilik oda',
			},
		],
		double: [
			{
				url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
				alt: 'Çift kişilik yatak',
			},
			{
				url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
				alt: 'Modern çift kişilik oda',
			},
			{
				url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
				alt: 'Çift kişilik oda oturma alanı',
			},
			{
				url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
				alt: 'Çift kişilik oda banyosu',
			},
			{
				url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
				alt: 'Konforlu çift kişilik yatak',
			},
			{
				url: 'https://images.unsplash.com/photo-1559508551-44bff1de756b?w=1200&q=80',
				alt: 'Çift kişilik oda dekorasyon',
			},
		],
	};

	// Get images for this room type
	const typeImages = allImages[roomType] || allImages['double'];

	// Use roomId as seed to shuffle images uniquely for each room
	const seed = roomId.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
	const shuffled = [...typeImages].sort((a, b) => {
		const hashA = (a.url + seed).split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
		const hashB = (b.url + seed).split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
		return hashA - hashB;
	});

	return shuffled.slice(0, 6); // Max 6 images
};

export function RoomGallery({ roomType, roomNumber, roomId }: RoomGalleryProps) {
	const images = getGalleryImages(roomType, roomId);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [lightboxIndex, setLightboxIndex] = useState(0);

	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const goToNext = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	const openLightbox = (index: number) => {
		setLightboxIndex(index);
		setLightboxOpen(true);
	};

	const goToPreviousLightbox = () => {
		setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const goToNextLightbox = () => {
		setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	return (
		<>
			<Card>
				<CardContent className="p-0 ">
					<div className="relative bg-white h-[400px] w-full overflow-hidden rounded-lg">
						{/* Main Image */}
						<img
							src={images[currentIndex].url}
							alt={images[currentIndex].alt}
							className="h-full w-full object-cover transition-opacity duration-500"
						/>

						{/* Gradient Overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

						{/* Navigation Arrows */}
						<Button
							variant="ghost"
							size="icon"
							className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 hover:text-white"
							onClick={goToPrevious}
						>
							<ChevronLeft className="h-6 w-6" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 hover:text-white"
							onClick={goToNext}
						>
							<ChevronRight className="h-6 w-6" />
						</Button>

						{/* Fullscreen Button */}
						<Button
							variant="ghost"
							size="icon"
							className="absolute right-4 top-4  text-white hover:bg-black/70 hover:text-white"
							onClick={() => openLightbox(currentIndex)}
						>
							<Maximize2 className="h-5 w-5" />
						</Button>

						{/* Image Counter */}
						<div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
							{currentIndex + 1} / {images.length}
						</div>

						{/* Dots Navigation */}
						<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
							{images.map((_, index) => (
								<button
									key={index}
									onClick={() => setCurrentIndex(index)}
									className={cn(
										'h-2 rounded-full transition-all',
										index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
									)}
									aria-label={`Görsel ${index + 1}'e git`}
								/>
							))}
						</div>
					</div>

					{/* Thumbnail Strip */}
					<div className="grid grid-cols-6 gap-2 p-4">
						{images.map((image, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={cn(
									'group relative aspect-video overflow-hidden rounded-md transition-all',
									index === currentIndex
										? 'ring-2 ring-primary ring-offset-2'
										: 'opacity-60 hover:opacity-100'
								)}
							>
								<img
									src={image.url}
									alt={image.alt}
									className="h-full w-full object-cover transition-transform group-hover:scale-110"
								/>
								<div
									className={cn(
										'absolute inset-0 bg-black/20 transition-opacity',
										index === currentIndex ? 'opacity-0' : 'group-hover:opacity-0'
									)}
								/>
							</button>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Lightbox Dialog */}
			<Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
				<DialogContent className="max-w-[100vw] w-[100vw] max-h-[100vh] h-[100vh] p-0 bg-black/95 rounded-none border-none flex items-center justify-center">
					<div className="relative bg-white/60 w-full h-full flex items-center justify-center">
						{/* Image */}
						<img
							src={images[lightboxIndex].url}
							alt={images[lightboxIndex].alt}
							className="max-h-[85vh] max-w-[85vw] object-contain"
						/>

						{/* Navigation Arrows */}
						<Button
							variant="ghost"
							size="icon"
							className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-white/20 hover:text-white"
							onClick={goToPreviousLightbox}
						>
							<ChevronLeft className="h-8 w-8" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-white/20 hover:text-white"
							onClick={goToNextLightbox}
						>
							<ChevronRight className="h-8 w-8" />
						</Button>

						{/* Image Info */}
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-white">
							<div className="text-center">
								<div className="text-sm font-medium">
									Oda {roomNumber} • {images[lightboxIndex].alt}
								</div>
								<div className="text-xs opacity-75">
									{lightboxIndex + 1} / {images.length}
								</div>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
import { useMemo } from 'react';
import { Header } from '#/components/layout/header';
import { Main } from '#/components/layout/main';
import { TopNav } from '#/components/layout/top-nav';
import { ProfileDropdown } from '#/components/profile-dropdown';
import { Search } from '#/components/search';
import { ThemeSwitch } from '#/components/theme-switch';
import { Button } from '#/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs';
import { Overview } from './components/overview';
import { RecentSales } from './components/recent-sales';
import { rooms, reservations } from '../rooms/data';
import {
	calculateDashboardStats,
	calculateAgencySales,
	calculateMonthlyRevenue,
} from './utils/dashboard-stats';

export default function Dashboard() {
	// Dinamik istatistikleri hesapla
	const stats = useMemo(() => calculateDashboardStats(reservations, rooms), []);
	const agencySales = useMemo(() => calculateAgencySales(reservations), []);
	const monthlyRevenue = useMemo(() => calculateMonthlyRevenue(reservations), []);

	return (
		<>
			{/* ===== Top Heading ===== */}
			<Header>
				<TopNav links={topNav} />
				<div className="ml-auto flex items-center space-x-4">
					<Search />
					<ThemeSwitch />
					<ProfileDropdown />
				</div>
			</Header>

			{/* ===== Main ===== */}
			<Main>
				<div className="mb-2 flex items-center justify-between space-y-2">
					<h1 className="text-2xl font-bold tracking-tight">Gösterge Paneli</h1>
					<div className="flex items-center space-x-2">
						<Button>Rapor İndir</Button>
					</div>
				</div>
				<Tabs orientation="vertical" defaultValue="overview" className="space-y-4">
					<div className="w-full overflow-x-auto pb-2">
						<TabsList>
							<TabsTrigger value="overview">Genel Bakış</TabsTrigger>
							<TabsTrigger value="analytics" disabled>
								Analitik
							</TabsTrigger>
							<TabsTrigger value="reports" disabled>
								Raporlar
							</TabsTrigger>
							<TabsTrigger value="notifications" disabled>
								Bildirimler
							</TabsTrigger>
						</TabsList>
					</div>
					<TabsContent value="overview" className="space-y-4">
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="text-muted-foreground h-4 w-4"
									>
										<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
									</svg>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">₺{stats.totalRevenue.toLocaleString('tr-TR')}</div>
									<p className="text-muted-foreground text-xs">Geçen aya göre {stats.revenueChange}</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Toplam Rezervasyon</CardTitle>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="text-muted-foreground h-4 w-4"
									>
										<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
										<circle cx="9" cy="7" r="4" />
										<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
									</svg>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{stats.totalReservations}</div>
									<p className="text-muted-foreground text-xs">Geçen aya göre {stats.reservationChange}</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Doluluk Oranı</CardTitle>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="text-muted-foreground h-4 w-4"
									>
										<rect width="20" height="14" x="2" y="5" rx="2" />
										<path d="M2 10h20" />
									</svg>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">%{stats.occupancyRate}</div>
									<p className="text-muted-foreground text-xs">Geçen aya göre {stats.occupancyChange}</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Aktif Misafirler</CardTitle>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="text-muted-foreground h-4 w-4"
									>
										<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
									</svg>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">{stats.activeGuests}</div>
									<p className="text-muted-foreground text-xs">Şu anda konaklamakta</p>
								</CardContent>
							</Card>
						</div>
						<div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
							<Card className="col-span-1 lg:col-span-4">
								<CardHeader>
									<CardTitle>Aylık Gelir Grafiği</CardTitle>
									<CardDescription>2025 yılı rezervasyon gelirleri (Türk Lirası)</CardDescription>
								</CardHeader>
								<CardContent className="pl-2">
									<Overview monthlyData={monthlyRevenue} />
								</CardContent>
							</Card>
							<Card className="col-span-1 lg:col-span-3">
								<CardHeader>
									<CardTitle>Acente Satışları</CardTitle>
									<CardDescription>
										Bu ay {stats.totalReservations} rezervasyon gerçekleştirildi.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<RecentSales agencySales={agencySales} />
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</Main>
		</>
	);
}

const topNav = [
	{
		title: 'Gösterge Paneli',
		href: '/',
		isActive: true,
	},
	{
		title: 'Odalar',
		href: 'rooms',
		isActive: false,
	},
	{
		title: 'Takvim',
		href: 'calendar',
		isActive: false,
	},
];
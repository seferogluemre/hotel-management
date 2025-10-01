import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { Badge } from '#/components/ui/badge';
import type { AgencySale } from '../utils/dashboard-stats';

const getInitials = (name: string) => {
	return name
		.split(' ')
		.map((word) => word[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
};

const getTrendColor = (trend: string) => {
	switch (trend) {
		case 'up':
			return 'text-green-600 dark:text-green-400';
		case 'down':
			return 'text-red-600 dark:text-red-400';
		default:
			return 'text-muted-foreground';
	}
};

interface RecentSalesProps {
	agencySales: AgencySale[];
}

export function RecentSales({ agencySales }: RecentSalesProps) {
	return (
		<div className="space-y-6">
			{agencySales.slice(0, 6).map((sale) => (
				<div key={sale.name} className="flex items-center gap-4">
					<Avatar className="flex h-10 w-10 items-center justify-center bg-primary/10">
						<AvatarFallback className="bg-transparent font-semibold text-primary">
							{getInitials(sale.name)}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-1 flex-wrap items-center justify-between gap-2">
						<div className="space-y-1 min-w-0 flex-1">
							<div className="flex items-center gap-2">
								<p className="text-sm leading-none font-medium">{sale.name}</p>
								<Badge variant="secondary" className="text-xs">
									{sale.channel}
								</Badge>
							</div>
							<p className="text-muted-foreground text-xs">
								{sale.reservations} rezervasyon
							</p>
						</div>
						<div className="text-right">
							<div className="font-semibold text-sm">
								₺{sale.revenue.toLocaleString('tr-TR')}
							</div>
							<div className={`text-xs ${getTrendColor(sale.trend)}`}>
								{sale.trend === 'up' && '↗ Artan'}
								{sale.trend === 'down' && '↘ Azalan'}
								{sale.trend === 'neutral' && '→ Sabit'}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

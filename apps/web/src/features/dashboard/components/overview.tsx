import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import type { MonthlyRevenue } from '../utils/dashboard-stats';

interface OverviewProps {
	monthlyData: MonthlyRevenue[];
}

export function Overview({ monthlyData }: OverviewProps) {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart data={monthlyData}>
				<XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `₺${(value / 1000).toFixed(0)}k`}
				/>
				<Tooltip
					content={({ active, payload }) => {
						if (active && payload && payload.length) {
							return (
								<div className="rounded-lg border bg-background p-2 shadow-sm">
									<div className="grid grid-cols-2 gap-2">
										<div className="flex flex-col">
											<span className="text-[0.70rem] uppercase text-muted-foreground">
												{payload[0].payload.label}
											</span>
											<span className="font-bold text-muted-foreground">
												₺{Number(payload[0].value).toLocaleString('tr-TR')}
											</span>
										</div>
									</div>
								</div>
							);
						}
						return null;
					}}
				/>
				<Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
			</BarChart>
		</ResponsiveContainer>
	);
}

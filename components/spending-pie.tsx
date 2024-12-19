import { FileSearch, Loader2, PieChart, Radar, Target } from 'lucide-react'
import { useState } from 'react'

import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectValue,
	SelectItem,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { RadarVariant } from '@/components/radar-variant'
import { PieVariant } from '@/components/pie-variant'
import { RadialVariant } from '@/components/radial-variant'

type Props = {
	data?: {
		value: number
		name: string
	}[]
}

export const SpendingPie = ({ data = [] }: Props) => {
	const [chartTpe, setChartTpe] = useState('pie')

	const onTypeChange = (type: string) => {
		// TODO: Add paywall
		setChartTpe(type)
	}

	return (
		<Card className='border-none drop-shadow-sm'>
			<CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
				<CardTitle className='text-xl line-clamp-1'>Categories</CardTitle>
				<Select defaultValue={chartTpe} onValueChange={onTypeChange}>
					<SelectTrigger className='lg:w-auto h-9 rounded-md px-3'>
						<SelectValue placeholder='Chart type' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='pie'>
							<div className='flex items-center'>
								<PieChart className='size-4 mr-2 shrink-0' />
								<p className='line-clamp-1'>Pie chart</p>
							</div>
						</SelectItem>
						<SelectItem value='radar'>
							<div className='flex items-center'>
								<Radar className='size-4 mr-2 shrink-0' />
								<p className='line-clamp-1'>Radar chart</p>
							</div>
						</SelectItem>
						<SelectItem value='radial'>
							<div className='flex items-center'>
								<Target className='size-4 mr-2 shrink-0' />
								<p className='line-clamp-1'>Radial chart</p>
							</div>
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent>
				{data.length === 0 ? (
					<div className='flex flex-col gap-y-4 items-center justify-center h-[350px] w-full'>
						<FileSearch className='size-6 text-muted-foreground' />
						<p className='text-muted-foreground text-sm'>
							No data for this period.
						</p>
					</div>
				) : (
					<>
						{chartTpe === 'pie' && <PieVariant data={data} />}
						{chartTpe === 'radar' && <RadarVariant data={data} />}
						{chartTpe === 'radial' && <RadialVariant data={data} />}
					</>
				)}
			</CardContent>
		</Card>
	)
}

export const SpendingPieLoading = () => {
	return (
		<Card className='border-none drop-shadow-sm'>
			<CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
				<Skeleton className='h-8 w-48' />
				<Skeleton className='h-8 lg:w-[120px] w-full' />
			</CardHeader>
			<CardContent>
				<div className='h-[350px] w-full flex items-center justify-center'>
					<Loader2 className='size-6 text-slate-300 animate-spin' />
				</div>
			</CardContent>
		</Card>
	)
}
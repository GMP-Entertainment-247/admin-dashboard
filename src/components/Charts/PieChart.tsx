import clsx from 'clsx';
import { PieChart, Pie, Cell } from 'recharts';
import { formatNumber } from '../../utils/helpers';


export const PieChartComponent = ({ data, totalValue=0, layout = "horizontal" }:{
    data: any[],
    totalValue?: number,
    layout?: "vertical" | "horizontal"
}) => (
    <div>
        <p className='text-[32px] font-medium'>{formatNumber(totalValue)}</p>
        <div 
            className={clsx(
                'flex -my-5 ',
                layout==="horizontal" ? "justify-center items-center gap-10":"flex-col justify-center items-center"
            )}
        >
            <div 
                className={clsx(
                    'flex flex-col gap-1.5',
                    layout==="vertical" && "order-last"
                )}
            >
                {
                    data.map((key, index)=>(
                        <div key={index} className='flex items-center gap-1.5'>
                            <div className='w-2.5 h-2.5 rounded-full' style={{background: key.color}}/>
                            <p className='text-sm text-[#212121]'>{key.name}</p>
                        </div>
                    ))
                }
            </div>
            <PieChart 
                style={{ width: '50%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1 }}
                responsive
            >
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    isAnimationActive={true}
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    </div>
);

export default PieChartComponent;
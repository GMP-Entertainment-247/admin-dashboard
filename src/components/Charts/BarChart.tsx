import ReactSwitch from 'react-switch';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import { formatNumber } from '../../utils/helpers';

const BarChartComponent = ({ data, dataKeys, isAnimationActive = true }:{
  data: any[],
  dataKeys: {
    label: string, 
    color: string, 
    isActive?: boolean, 
    handleChange?: (key: string)=>void
  }[],
  isAnimationActive?: boolean
}) => {
  const CustomTooltip = ({ active, payload, label }:{
    active?: boolean,
    payload?: any[],
    label?: string
  }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div
        className='flex flex-col gap-1'
        style={{
          background: "white",
          border: "1px solid #e5e7eb",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        {/* <p className='text-xs'>{label}</p> */}
        {
          payload.map((entry, index) => (
            <div className='flex items-center gap-1'  key={`item-${index}`}>
              <div className='w-2 h-2' style={{background: entry.color}}/>
              <p className='text-xs'>
                <span className='capitalize text-[#737373]'>{entry.name}:</span> <span className='font-semibold'>{formatNumber(entry.value)}</span>
              </p>
            </div>
          ))
        }
      </div>
    );
  };

  return (
    <div>
      <BarChart
        style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 2 }}
        responsive
        data={data}
      >
        <CartesianGrid vertical={false} stroke="#E9E9E9" strokeWidth={0.5} style={{borderColor: "red"}}  />
        <XAxis tickLine={false} tick={{fontSize: "12px", fill: "#737373"}} stroke='#E9E9E9' strokeWidth={0.5} dataKey="name" />
        <YAxis axisLine={false} tickLine={false} tick={{fontSize: "14px", fill: "#737373"}} width="auto" tickFormatter={(value) => formatNumber(value, true)} />
        <Tooltip cursor={false} content={<CustomTooltip />} />
        {
          dataKeys.map((key, index) => {
            const isActive = key.isActive;
            if (!isActive) return null;
            return (
              <Bar 
                key={index}
                type="monotone" 
                dataKey={key.label} 
                fill={key.color}
                isAnimationActive={isAnimationActive} 
                barSize={8}
                maxBarSize={8}
                radius={10}
              />
            )
          }
          )
        }
      </BarChart>
      <div className='flex justify-center gap-4 flex-wrap my-2.5'>
        {dataKeys.map((key, index) => (
          <div key={index} className='flex items-center gap-1'>
            <ReactSwitch 
                onChange={() => key?.handleChange?.(key.label)}
                checked={key.isActive || false}
                width={30}
                height={16}
                checkedIcon={false}
                uncheckedIcon={false}
                handleDiameter={14}
                onColor={key.color}
                offColor="#C1C2C3"
            />
            <p className='text-xs capitalize' style={{color: `${key.color}`}}>{key.label}</p>
          </div>
        ))} 
      </div>
    </div>
  )
};

export default BarChartComponent;
import { Card, CardBody } from "@nextui-org/react"

interface WeatherCardProps {
  weather: {
    city: string
    time: string
    weatherIcon: string
    temperature: string
  }
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <Card 
      className="bg-default-50/50 backdrop-blur-xl border border-divider"
    >
      <CardBody>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">{weather.city}</h3>
          <p className="text-foreground/80 text-sm">{weather.time}</p>
          
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-bold">{weather.temperature}</p>
            <span className="text-xl">°C</span>
          </div>
          
          <p className="text-foreground/90">{weather.weatherIcon}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default WeatherCard 
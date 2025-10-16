"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Weather = { temp: number; wind: number; code: number } | null

export function WeatherApp() {
  const [city, setCity] = useState("London")
  const [weather, setWeather] = useState<Weather>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchWeather() {
    setLoading(true)
    setError(null)
    try {
      const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`,
      ).then((r) => r.json())
      const loc = geo?.results?.[0]
      if (!loc) throw new Error("City not found")
      const data = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`,
      ).then((r) => r.json())
      setWeather({
        temp: data?.current?.temperature_2m,
        wind: data?.current?.wind_speed_10m,
        code: data?.current?.weather_code,
      })
    } catch (e: any) {
      setError(e?.message ?? "Failed to fetch weather")
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
        <Button onClick={fetchWeather} disabled={loading}>
          {loading ? "Loading…" : "Get"}
        </Button>
      </div>
      {error && <div className="text-sm text-destructive">{error}</div>}
      {weather && (
        <div className="rounded-md border border-border bg-card/60 p-3">
          <div className="text-lg font-semibold">{city}</div>
          <div className="text-sm opacity-80">Temp: {Math.round(weather.temp)}°C</div>
          <div className="text-sm opacity-80">Wind: {Math.round(weather.wind)} km/h</div>
          <div className="text-xs opacity-60">Code: {weather.code}</div>
        </div>
      )}
    </div>
  )
}

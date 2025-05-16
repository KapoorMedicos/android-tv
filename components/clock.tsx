"use client"

import { useState, useEffect, useRef } from "react"

export default function Clock() {
  const [dateTime, setDateTime] = useState({
    time: "",
    date: "",
  })
  const clockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Update time immediately
    updateDateTime()

    // Set up interval to update time every second
    const interval = setInterval(updateDateTime, 1000)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [])

  const updateDateTime = () => {
    const now = new Date()

    // Format time as HH:MM AM/PM
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }

    // Format date as Day, Month DD, YYYY
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }

    setDateTime({
      time: now.toLocaleTimeString("en-US", timeOptions),
      date: now.toLocaleDateString("en-US", dateOptions),
    })
  }

  return (
    <div ref={clockRef} className="text-right text-white transition-colors duration-800">
      <div className="text-2xl font-semibold">{dateTime.time}</div>
      <div className="text-sm opacity-80">{dateTime.date}</div>
    </div>
  )
}

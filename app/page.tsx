'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

import { CopyButton } from '@/components/copy-button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

function buildOptions(field: any) {
  return Object.fromEntries(
    Object.entries(field).map(([key, value]: [string, string]) => [
      key,
      (typeof value === 'string' && value.trim() === '') || value === 'none'
        ? undefined
        : value,
    ]),
  )
}

export default function App() {
  const [presets, setPresets] = React.useState('')
  const [year, setYear] = React.useState('none')
  const [month, setMonth] = React.useState('none')
  const [day, setDay] = React.useState('none')
  const [hour, setHour] = React.useState('none')
  const [minute, setMinute] = React.useState('none')
  const [second, setSecond] = React.useState('none')
  const [hour12, setHour12] = React.useState(true)

  const date = React.useMemo(() => new Date(), [])

  const preview = React.useMemo(() => {
    const options = {
      year,
      month,
      day,
      hour,
      minute,
      second,
      hour12,
    }

    return {
      format: buildOptions(options),
    }
  }, [year, month, day, hour, minute, second, hour12])

  const handlePreset = (e: string) => {
    setPresets(e)

    if (e === 'date-only') {
      setYear('2-digit')
      setMonth('2-digit')
      setDay('2-digit')
      setHour('none')
      setMinute('none')
      setSecond('none')
    }

    if (e === 'time-only') {
      setYear('none')
      setMonth('none')
      setDay('none')
      setHour('2-digit')
      setMinute('2-digit')
      setSecond('2-digit')
    }
  }

  return (
    <div className="container flex flex-1 flex-col">
      <div className="mx-auto flex w-full flex-col items-center justify-center">
        <div className="relative w-full">
          <motion.div
            className="my-6 text-2xl font-black sm:text-center md:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {Intl.DateTimeFormat(
              'en-US',
              buildOptions({
                year,
                month,
                day,
                hour,
                minute,
                second,
                hour12,
              }),
            ).format(date)}
          </motion.div>

          <div className="right-2 top-5 sm:absolute">
            <div className="space-y-1 max-sm:mb-2">
              <Label htmlFor="presets" className="text-xl font-bold sm:hidden">
                Preset
              </Label>

              <Select value={presets} onValueChange={handlePreset}>
                <SelectTrigger id="presets" className="sm:min-w-[120px]">
                  <SelectValue placeholder="Preset" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="custom">custom</SelectItem>
                    <SelectItem value="date-only">date-only</SelectItem>
                    <SelectItem value="time-only">time-only</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="w-full max-w-xl">
          <div className="space-y-2">
            <div className="text-xl font-bold">Date</div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div className="space-y-1">
                <Label htmlFor="year">Year</Label>

                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="none">none</SelectItem>
                      <SelectItem value="numeric">numeric</SelectItem>
                      <SelectItem value="2-digit">2-digit</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="month">Month</Label>

                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger id="month">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="none">none</SelectItem>
                      <SelectItem value="numeric">numeric</SelectItem>
                      <SelectItem value="2-digit">2-digit</SelectItem>
                      <SelectItem value="long">long</SelectItem>
                      <SelectItem value="short">short</SelectItem>
                      <SelectItem value="narrow">narrow</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="day">Day</Label>

                <Select value={day} onValueChange={setDay}>
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="none">none</SelectItem>
                      <SelectItem value="numeric">numeric</SelectItem>
                      <SelectItem value="2-digit">2-digit</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold">Time</div>

                <div className="flex items-center space-x-2">
                  <Label htmlFor="hour-12" className="text-xs">
                    24h
                  </Label>

                  <Switch
                    id="hour-12"
                    checked={hour12}
                    onCheckedChange={setHour12}
                  />
                  <Label htmlFor="hour-12" className="text-xs">
                    AM/PM
                  </Label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div className="space-y-1">
                  <Label htmlFor="hour">Hour</Label>

                  <Select value={hour} onValueChange={setHour}>
                    <SelectTrigger id="hour">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="none">none</SelectItem>
                        <SelectItem value="numeric">numeric</SelectItem>
                        <SelectItem value="2-digit">2-digit</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="minute">Minute</Label>

                  <Select value={minute} onValueChange={setMinute}>
                    <SelectTrigger id="minute">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="none">none</SelectItem>
                        <SelectItem value="numeric">numeric</SelectItem>
                        <SelectItem value="2-digit">2-digit</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="second">Second</Label>

                  <Select value={second} onValueChange={setSecond}>
                    <SelectTrigger id="second">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="none">none</SelectItem>
                        <SelectItem value="numeric">numeric</SelectItem>
                        <SelectItem value="2-digit">2-digit</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full space-y-2 py-4">
            <div className="text-xl font-bold">Command</div>

            <pre className="relative items-center justify-between space-x-2 overflow-x-auto rounded-lg border border-neutral-100 bg-neutral-100 py-4 pl-6 pr-2 dark:border-neutral-700 dark:bg-black md:flex">
              <code className="font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                {`Intl.DateTimeFormat('en-US', ${JSON.stringify(
                  preview.format,
                  null,
                  2,
                )}.format(date)`}
              </code>

              <CopyButton
                value={`Intl.DateTimeFormat('en-US', ${JSON.stringify(
                  preview.format,
                  null,
                  2,
                )}.format(date)`}
                className="absolute right-2 top-2 border-none text-neutral-900 dark:text-neutral-50"
              />
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

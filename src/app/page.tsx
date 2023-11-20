"use client"
import * as React from "react"
import Image from 'next/image'
import { Moon, Sun } from "lucide-react"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useTheme } from "next-themes"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()
 
  return (
    <MaxWidthWrapper>
    <nav className="flex items-center justify-between flex-1 mx-auto mt-4 border-white/70 w-[95%] sticky h-14 top-3 rounded-full inset-x-0 z-30 border-gray-200 bg-black/80 dark:bg-white/95 dark:text-black background-blur-lg transition-all px-5">
      <h1 className="border-b border-zinc-200 m-4 text-white dark:text-black font-mono font-semibold col-span-1 col-start-1">
        Le/-\rn
      </h1>
      <span id="Toggle-btn" className="flex items-center gap-2 justify-between col-span-1 col-start-2 dark:text-white">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-[2.0rem] w-[2.0rem] transition">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
           <NavigationMenu className="grid grid-col-8 gap-3 justify-items-end -center justify-space-between grid-flow-col-dense grid-rows-1 basis-1/2">
      <NavigationMenuList className=" dark:text-white">
        <NavigationMenuItem className="">
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 bg-transparent p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex flex-col justify-start rounded-md bg-black dark-bg-white text-white dark:text-black p-2 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Sign In
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
      </span>
    </nav>
    </MaxWidthWrapper>
  )
}

export default ModeToggle;
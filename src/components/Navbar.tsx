import React from 'react'
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Moon, Sun, ArrowRight } from "lucide-react"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs"
import { buttonVariants } from "@/components/ui/button"

 
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

export function Navbar() {
  const { setTheme } = useTheme()
  return (
    <>
    <nav className="flex items-center justify-between flex-1 mx-auto mt-4 border-white/70 w-[95%] sticky h-14 top-3 rounded-full inset-x-0 z-30 border-gray-200 bg-black/80 dark:bg-white/95 dark:text-black background-blur-lg transition-all px-5">
      <h1 className="border-b border-zinc-200 m-4 text-white dark:text-black font-mono font-semibold col-span-1 col-start-1">
        Le/-\rn
      </h1>
      <span id="Toggle-btn" className="flex items-center gap-2 justify-between col-span-1 col-start-2 dark:text-white">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="dark:bg-stone-800 h-[2.5rem] w-[2.5rem] transition">
                <Sun className="h-[1.2rem] w-[1.rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
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
          <NavigationMenuTrigger className='my-2 dark:bg-stone-800'>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent className="dark:bg-zinc-900">
            <ul className="flex flex-col gap-4 m-2 rounded bg-transparent p-5 items-center md:w-[100px] lg:w-[150px] lg:grid-cols-[.75fr_1fr]">
              <li className="">
                  <LoginLink
                    className={buttonVariants({
                      variant: "secondary",
                      size: "lg",
                    })}>
                    Sign In
                  </LoginLink>
              </li>
              <li className="">
                <RegisterLink
                  className={cn(buttonVariants({
                    variant: "secondary",
                    size: "sm",
                  }),"bg-gray-800", "hover:bg-stone-500", "text-semibold", "text-white" ,"transition-all")}>
                    Sign Up <ArrowRight className="m-2 h-5 w-5" />
                  </RegisterLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
      </span>
    </nav>
    </>
  )
}

export default Navbar
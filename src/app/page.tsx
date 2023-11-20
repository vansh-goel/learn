"use client"
import * as React from "react"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Navbar from "@/components/Navbar"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function Home() {
  return (
    <div className="bg-gradient-to-r from-rose-100/50 to-teal-100/50 p-0 m-0 w-screen h-screen overflow-auto top-0 inset-0 dark:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] dark:from-black dark:via-black dark:to-black">
    <MaxWidthWrapper className="">
      <Navbar />
      <div id="Project-Brief" className="p-5 m-10 top-5 text-center font-bold font-mono flex gap-5 items-center flex-col justify-center">
        <h1 className="text-3xl bg-gray-200/50 w-fit px-10 py-2 rounded-lg">
          le/-\rn
        </h1>
        <h1 className="mt-10 max-w-4xl text-5xl font-bold md:text-6xl sm:text-7xl">
          Keep Log of your <span className="text-stone-600 dark:text-stone-300">Courses</span>
        </h1>
        <p className="mt-10 max-w-prose text-black sm:text-lg dark:text-white">
          "With learn, you can keep track of your courses, and keep a log of your progress. We help you collect all your favourite Youtube Playlists at one place, keep track of how much you have studied, and also reward a badge on course completion."
        </p>
      <Link className={buttonVariants({
          size: "lg",
          className: "mt-8"
        })} href="/dashboard" target="_blank">
          Get Started <ArrowRight className="ml-2 h-5 w-5" size={20} />
      </Link>
      </div>
       <div>
              <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <div className="mt-16 flow-root sm:mt-24">
                  <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:bg-white/25 dark:ring-gray-100/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                    <Image 
                      src="/le4rn.png"
                      alt="architecture"
                      width={1064}
                      height={400}
                      quality={100}
                      className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                    />
                  </div>
                </div>
              </div>
            </div>
    </MaxWidthWrapper>
    </div>
  )
}

export default Home;
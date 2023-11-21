"use client"
import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog"
import { Button } from "./ui/button"

const UploadButton = () => {
    const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
        <Dialog open={isOpen} onOpenChange={(v) => {
            if(!v) {
                setIsOpen(v)
            }
        }} >
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button>Add Playlist</Button>
            </DialogTrigger>

            <DialogContent>
                example content
            </DialogContent>

        </ Dialog>
    </div>
  )
}

export default UploadButton
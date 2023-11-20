import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import Navbar from '@/components/Navbar'

const Page = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || !user.id) redirect('/auth-callback?origin=/dashboard')

    return (
      <>
        <Navbar />
      </>
    )
}

export default Page
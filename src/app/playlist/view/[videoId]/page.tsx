'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useParams } from 'next/navigation';
import { Switch } from '@/components/ui/switch';

interface PlaylistData {
  title: string;
  description: string;
}

const Page = ({ params }: {params : { videoId: string }}) => {
  params = useParams()
  const { videoId } = params

  return (
    <MaxWidthWrapper>
      <Navbar />
      <div className="grid place-content-center w-full h-full mt-12">
        <iframe
          id="ivplayer"
          width="860"
          height="480"
          className="border-2 border-black dark:border-white p-4 rounded-lg"
          src={`https://youtube.com/embed/${videoId}`}
          allowFullScreen
        ></iframe>
        <h2 className='p-2 text-xl font-semibold font-mono m-4 grid place-self-center'>Watched? 
          <Switch className='m-2 place-self-center border-2 border-black dark:border-white' />
        </h2>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
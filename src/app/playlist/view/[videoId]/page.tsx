'use client'
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useParams } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import axios from 'axios';
import { trpc } from '@/app/_trpc/client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface VideoData {
  title: string;
  description: string;
}

const Page = ({ params }: {params : { videoId: string }}) => {
  params = useParams()
  const searchParams = useSearchParams()
  const playlistId = searchParams.get('playlistId') || ''
  const { videoId } = params
  const [id, setId] = useState(videoId)
  const videoMutation = trpc.createVideo.useMutation();
  const watchVideoMutation = trpc.watchVideo.useMutation();
  const [watch, setWatch] = useState(false)

  const handleOnChange = () => {
    setWatch(!watch)
    console.log(!watch)
    watchVideoMutation.mutateAsync({
      videoId: id,
      playlistId: playlistId,
      watched: !watch,
    })
  }
  
  const { data: video } = trpc.getWatchedVideos.useQuery({ id });

  const fetchVideoInfo = async () => {
    const playlistInfoURL = `https://vid.puffyan.us/api/v1/videos/${id}`;
    try {
      const response = await axios.get<VideoData>(playlistInfoURL);
      console.log(response.data)
      const createVideo = await videoMutation.mutateAsync({
        videoId: id,
        title: response.data.title,
        playlistId: playlistId,
        watched: false,
      })
    } catch (error) {
      console.error(error);
    }
  }

useEffect(() => {
  if (videoId) {
    fetchVideoInfo();
    // Check if the video exists and if it's watched
    if (video && video.watched) {
      setWatch(true);
    }
  }
}, [videoId, video]);


  return (
    <MaxWidthWrapper>
      <Navbar />
      <div className="grid place-content-center w-full h-full mt-12">
        <iframe
          id="ivplayer"
          className="border-2 border-black dark:border-white p-4 rounded-lg w-[250px] h-[160px] sm:w-[300px] sm:h-[180px] md:w-[500px] md:h-[300px] lg:w-[700px] lg:h-[400px]"
          src={`https://youtube.com/embed/${videoId}`}
          allowFullScreen
        ></iframe>
        <h2 className='p-2 text-xl font-semibold font-mono m-4 grid place-self-center'>Watched? 
          <Switch className='m-2 place-self-center border-2 border-black dark:border-white' 
            onClick={() => handleOnChange()}
            checked={watch}
          />
        </h2>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
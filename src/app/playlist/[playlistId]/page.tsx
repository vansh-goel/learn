"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

interface PlaylistItem {
  videoId: string;
  title: string;
}

interface YouTubePlaylistAppProps {
  params: {
    playlistId: string;
  };
}

interface VideoDetails {
  videoId: string;
  thumbnailURL: string;
  // Add other properties as needed
}

interface PlaylistData {
  title: string;
  description: string;
  // Add other properties as needed
}


const YouTubePlaylistApp: React.FC<YouTubePlaylistAppProps> = ({ params }) => {
  const { playlistId } = params;
  const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);
  const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);
  const [videoDetailsMap, setVideoDetailsMap] = useState<Record<string, VideoDetails>>({});

  useEffect(() => {
    if (playlistId) {
      // Clear existing playlist data
      setPlaylistData(null);
      setPlaylistItems([]);
      setVideoDetailsMap({});

      // Fetch new playlist information
      fetchPlaylistInfo();
    }
  }, [playlistId]);

  const fetchPlaylistInfo = async () => {
    const playlistInfoURL = `https://inv.in.projectsegfau.lt/api/v1/playlists/${playlistId}/`;

    try {
      const response = await axios.get<PlaylistData>(playlistInfoURL);
      const playlistData = response.data;

      setPlaylistData(playlistData);
      fetchPlaylistItems();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlaylistItems = async () => {
    const playlistItemsURL = `https://onion.tube/api/v1/playlists/${playlistId}?videos=all`;

    try {
      const response = await axios.get<{ videos: PlaylistItem[] }>(playlistItemsURL);
      const playlistItemsData = response.data.videos;

      setPlaylistItems(playlistItemsData);

      const videoIDs = playlistItemsData.map(item => item.videoId);
      fetchVideoDetails(videoIDs);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVideoDetails = async (videoIDs: string[]) => {
    const videoDetailsURLs = videoIDs.map(videoID => `https://inv.in.projectsegfau.lt/api/v1/videos/${videoID}/`);

    try {
      const responses = await Promise.all(videoDetailsURLs.map(url => axios.get<VideoDetails>(url)));
      const videoDetailsData = responses.map(response => response.data);

      const updatedVideoDetailsMap: Record<string, VideoDetails> = { ...videoDetailsMap };
      videoDetailsData.forEach(videoDetails => {
        const thumbnailURL = `https://inv.in.projectsegfau.lt/vi/${videoDetails.videoId}/hqdefault.jpg`;
        updatedVideoDetailsMap[videoDetails.videoId] = { ...videoDetails, thumbnailURL };
      });

      setVideoDetailsMap(updatedVideoDetailsMap);
    } catch (error) {
      console.error(error);
    }
  };

  if (!playlistData || !playlistItems) {
    return <div>Loading...</div>;
  }

  return (
    <MaxWidthWrapper>
    <Navbar />
    <div className='grid gap-4 p-2 m-2 grid-flow-row lg:grid-flow-col sm:grid-flow-row lg:grid-cols-8 lg:divide-x lg:divide-gray-600 grid-cols-1 divide-y lg:divide-y-0 grid-rows-8 w-fit text-center content-center'>
    <div id='box-1' className='col-span-1 row-span-2 lg:col-span-2 p-2 m-2 divide-y-2 divide-black/50 content'>
        <h1 className='mb-2 text-xl font-semibold'>{playlistData.title}</h1>
        <p className='mt-4 pt-4'>{playlistData.description}</p>
        
    </div>

      <ul id='box-2' className='ml-2 lg:grid lg:col-span-6 flex-wrap flex-col px-4 mx-4 sm:row-span-6 text-center'>
        {playlistItems.map(item => (
            <li key={item.videoId} className='grid wrap grid-row-2 grid-flow-row md:grid-col-8 md:grid-flow-col content-center py-2'>
            {videoDetailsMap[item.videoId] ? (
                <div className='grid wrap grid-col-1 grid-rows-2 grid-flow-row md:grid-col-8 md:grid-flow-col lg:grid-col-8 content-center py-2 lg:grid-rows-1 md:grid-rows-1'>
                <img
                    className='w-48 h-36 col-span-1 row-span-1 md:col-span-3 md:row-auto md:order-1 rounded-lg border-2 border-black/50 p-2 place-self-center lg:place-self-start md:place-self-start'
                  src={videoDetailsMap[item.videoId].thumbnailURL}
                  alt="Video thumbnail"
                />
                <a
                    className='p-2 col-span-1 row-span-1 md:col-span-5 md:order-2 content-center grid md:w-[100%] sm:w-[60%] text-center align-self-center place-self-center lg:place-self-center'
                  href={`https://www.youtube.com/watch?v=${item.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>
              </div>
            ) : (
              <div>Loading video details...</div>
              )}
          </li>
        ))}
      </ul>
    </div>
    </MaxWidthWrapper>
  );
};

export default YouTubePlaylistApp;
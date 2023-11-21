"use client"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Form from './Form'
import { useEffect } from 'react'
import React, { useState } from 'react';

const Dashboard = () => {
  const [playlistTitle, setPlaylistTitle] = useState<string>('');
  const [playlistLink, setPlaylistLink] = useState('');
  const [playlistID, setPlaylistID] = useState('');
  const [playlistIDs, setPlaylistIDs] = useState<string[]>([]);
  const [playlistTitles, setPlaylistTitles] = useState<Record<string, string>>({});

  useEffect(() => {
    if (playlistLink) {
      fetchPlaylistInfo();
    }
  }, [playlistLink]);

  const handlePlaylistLinkChange = (newPlaylistLink: string) => {
    setPlaylistLink(newPlaylistLink);
  };

  const fetchPlaylistInfo = async () => {
    // Extract playlist ID from the playlist link
    const match = playlistLink.match(/\/playlist\?list=(.*)/);
    if (match) {
      const newPlaylistID = match[1];
      const playlistInfoURL = `https://inv.in.projectsegfau.lt/api/v1/playlists/${newPlaylistID}/`;
      const response = await fetch(playlistInfoURL);
      const playlistData = await response.json();
      setPlaylistTitle(playlistData.title);

      // Update the state to store the mapping of ID to title
      setPlaylistTitles((prevTitles) => ({
        ...prevTitles,
        [newPlaylistID]: playlistData.title,
      }));

      setPlaylistID(newPlaylistID);
      setPlaylistIDs([...playlistIDs, newPlaylistID]);
    } else {
      console.error('Invalid playlist link');
    }
  };

  return (
    <MaxWidthWrapper className='mx-auto max-w-7xl md:p-10 '>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='font-bold text-5xl text-gray-900 mb-3 dark:text-white'>My Courses</h1>
      </div>
      <Form playlistLink={playlistLink} setPlaylistLink={setPlaylistLink} />
      <ul className='flex gap-4 py-2 my-2'>
        {playlistIDs.map((id) => (
          <li key={id} className='flex dark:border-gray-100 justify-center flex-col border-2 border-black w-48 p-2 text-center wrap'>
            <a href={`/playlist/${id}`}>{playlistTitles[id]}</a>
          </li>
        ))}
      </ul>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
"use client"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Form from './Form'
import { useEffect } from 'react'
import React, { useState } from 'react';
import { trpc } from '@/app/_trpc/client';
import axios from 'axios';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Button, buttonVariants } from './ui/button';


const Dashboard = () => {
  
  const createPlaylistMutation = trpc.createPlaylist.useMutation();
  const deletePlaylistMutation = trpc.deletePlaylist.useMutation();
  interface PlaylistInput {
    playlistId: string;
    title: string;
    description: string;
  }


  const [newPlaylistData, setNewPlaylistData] = useState<PlaylistInput | null>(null);
  const [playlistTitle, setPlaylistTitle] = useState<string>('');
  const [playlistTitles, setPlaylistTitles] = useState<Record<string, string>>({});
  const [playlistID, setPlaylistID] = useState('');
  const [playlistIDs, setPlaylistIDs] = useState<string[]>([]);
  const [playlistLink, setPlaylistLink] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState<string>('');

    trpc.getPlaylists.useQuery(undefined, {
    onSuccess: (data) => {
      const playlistIDs = data.map((playlist) => playlist.playlistId);
      setPlaylistIDs(playlistIDs);
      const newPlaylistTitles = data.reduce((acc, playlist) => {
        acc[playlist.playlistId] = playlist.title;
        return acc;
      }, {} as Record<string, string>);
      setPlaylistTitles(newPlaylistTitles);
    },
  })

  useEffect(() => {
    if (playlistLink) {
      fetchPlaylistInfo();
    }
  }, [playlistLink]);

  useEffect(() => {
    if (newPlaylistData) {
      handleCreatePlaylist();
    }
  }, [newPlaylistData])


  const handlePlaylistLinkChange = (newPlaylistLink: string) => {
    setPlaylistLink(newPlaylistLink);
  };

  const fetchPlaylistInfo = async () => {
    // Extract playlist ID from the playlist link
    const match = playlistLink.match(/\/playlist\?list=(.*)/);
    if (match) {
      const newPlaylistID = match[1];
      const playlistInfoURL = `https://vid.puffyan.us/api/v1/playlists/${newPlaylistID}/`;
      const response = await axios.get(playlistInfoURL);
      const playlistData = response.data;
      setPlaylistTitle(playlistData.title);
      setPlaylistDescription(playlistData.description);
      setPlaylistID(newPlaylistID);

      setNewPlaylistData({
        playlistId: newPlaylistID,
        title: playlistData.title,
        description: playlistData.description,
      })
      // Update the state to store the mapping of ID to title
      setPlaylistTitles((prevTitles) => ({
        ...prevTitles,
        [newPlaylistID]: playlistData.title,
      }));

    setPlaylistIDs([...playlistIDs, newPlaylistID]);
    } else {
      console.error('Invalid playlist link');
    }
  };


  const  handleCreatePlaylist = () => { createPlaylistMutation.mutate({
    playlistId: playlistID,
    description: playlistDescription,
    title: playlistTitle,
  });
  }

  const handleDeletePlaylist = async (playlistID: string) => {
    try {
      await deletePlaylistMutation.mutateAsync({ playlistId: playlistID });
      setPlaylistIDs((prevIDs) => prevIDs.filter((id) => id !== playlistID));
      setPlaylistTitles((prevTitles) => {
        const newTitles = { ...prevTitles };
        delete newTitles[playlistID];
        return newTitles;
      });
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  return (
    <MaxWidthWrapper className='mx-auto max-w-7xl md:p-10 '>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='font-bold text-5xl text-gray-900 mb-3 dark:text-white'>My Courses</h1>
      </div>
      <Form playlistLink={playlistLink} setPlaylistLink={setPlaylistLink} />
      <ul className='grid gap-4 py-2 my-2 wrap grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 grid-flow-row'>
        {playlistIDs.map((id) => (
        <ContextMenu>
          <ContextMenuTrigger className='grid dark:border-gray-100 justify-center grid-flow-col border-2 border-black w-48 p-2 text-center content-center col-span-1 place-self-center md:place-self-auto'>
          <li key={id} className='grid justify-center grid-flow-col w-48 p-2 text-center content-center col-span-1 place-self-center md:place-self-auto'>
          <a href={`/playlist/${id}`}>{playlistTitles[id]}</a>
          </li>
          </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem className='p-2 m-2'>
                  <Button variant="secondary" size="lg" className="bg-red-800 hover:bg-red-500 text-semibold text-white transition-all" onClick={() => handleDeletePlaylist(id)}>
                    Delete
                  </Button>
                </ContextMenuItem>
              </ContextMenuContent>
          </ContextMenu>
        ))}
      </ul>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
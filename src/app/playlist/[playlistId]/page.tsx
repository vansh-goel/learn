"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h1>{playlistData.title}</h1>
      <p>{playlistData.description}</p>

      <ul>
        {playlistItems.map(item => (
          <li key={item.videoId}>
            {videoDetailsMap[item.videoId] ? (
              <>
                <img
                  src={videoDetailsMap[item.videoId].thumbnailURL}
                  alt="Video thumbnail"
                />
                <a
                  href={`https://www.youtube.com/watch?v=${item.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>
              </>
            ) : (
              <div>Loading video details...</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YouTubePlaylistApp;
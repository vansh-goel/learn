import React, { useState, FormEvent } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { useRouter } from 'next/navigation';

interface FormProps {
  playlistLink: string;
  setPlaylistLink: React.Dispatch<React.SetStateAction<string>>;
}

const Form: React.FC<FormProps> = ({ playlistLink, setPlaylistLink }) => {
  let playlistID = '';
  const [link, setLink] = useState<string>('');
  const router = useRouter();
const match = link.match(/\/playlist\?list=([^&]+)/);
if (match) {
   playlistID = match[1];
}
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPlaylistLink(link);
    // router.push(`/playlist/${playlistID}`);
    setLink("");
  };

  return (
    <div className='form-box'>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block' }} className='w-full'>
        <input
          className='border border-gray-700 rounded-md p-2 my-5 w-full font-mono text-lg dark:text-gray-800 dark:border-gray-400 dark:bg-slate-50'
          placeholder='Enter Playlist Link'
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Form;

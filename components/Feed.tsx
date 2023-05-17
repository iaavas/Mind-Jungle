'use client';
import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';
import { clearTimeout } from 'timers';
import { useSession } from 'next-auth/react';
// @ts-ignore
const PromptCardList = ({ data, handleTagClick }) => {
  const { data: session } = useSession();
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post: any) => {
        return (
          <PromptCard
            key={post._id}
            // @ts-ignore
            liked={post.likedBy.includes(session.user.id)}
            post={post}
            handleTagClick={handleTagClick}
            handleEdit
            handleDelete
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setsearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [posts, setPosts] = useState([]);

  const filterPrompts = (searchtext: any) => {
    const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
    return posts.filter(
      // @ts-ignore
      (item) =>
        // @ts-ignore
        regex.test(item.creator.username) ||
        // @ts-ignore
        regex.test(item.tag) ||
        // @ts-ignore
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: any) => {
    setsearchText(e.target.value);

    setSearchTimeout(
      // @ts-ignore
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  // @ts-ignore
  const handleTagClick = (tagName) => {
    setsearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setSearchedResults(data);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;

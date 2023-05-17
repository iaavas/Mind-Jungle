'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';
// @ts-ignore
const MyProfile = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [info, setInfo] = useState({});

  const searchParams = useSearchParams();
  const userName = searchParams.get('name');

  useEffect(() => {
    const fetchPosts = async () => {
      // @ts-ignore
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    // @ts-ignore

    fetchPosts();

    // @ts-ignore
  }, [params.id]);

  const handleEdit = (post: any) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt');

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE',
        });
        //@ts-ignore
        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      // @ts-ignore
      name={userName}
      //   @ts-ignore
      desc={`Welcome to ${userName}'s profile page`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;

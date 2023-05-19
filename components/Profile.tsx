import React from 'react';
import PromptCard from './PromptCard';
import { useSession } from 'next-auth/react';
// @ts-ignore
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>

      <p className='desc text-left'>{desc}</p>

      <div className='mt-16 prompt_layout'>
        {data.map((post: any) => {
          return (
            // @ts-ignore
            <PromptCard
              key={post._id}
              post={post}
              // @ts-ignore
              liked={post.likedBy.includes(session?.user?.id) || false}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Profile;

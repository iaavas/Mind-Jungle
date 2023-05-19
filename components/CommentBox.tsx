'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineCloseCircle,
} from 'react-icons/ai';
import { BiCommentAdd, BiCommentDetail } from 'react-icons/bi';

import NewComment from './NewComment';
const PromptCard = ({
  //@ts-ignore
  post,
  //@ts-ignore
}) => {
  const [likes, setLikes] = useState(post.likes);
  const [comment, setComment] = useState({});
  const [myLiked, setMyLiked] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  const [copied, setCopied] = useState('');
  const pathName = usePathname();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [viewComment, setViewComment] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCopy = () => {
    setCopied(post.prompt);

    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000);
  };

  const handleProfileClick = () => {
    // @ts-ignore
    if (post.user._id === session?.user.id) return router.push('/profile');

    router.push(`/profile/${post.user._id}?name=${post.user.username}`);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.user.image}
            alt={post.user.username}
            width={40}
            height={40}
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.user.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.user.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt={'Copy btn'}
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.comment}</p>

      {/* @ts-ignore */}
      {/* {session?.user?.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t  border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>

          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )} */}
    </div>
  );
};

export default PromptCard;

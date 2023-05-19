'use client';

import { useState, useEffect } from 'react';
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
import CommentBox from './CommentBox';

// @ts-ignore
const CommentCardList = ({ postComment }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {postComment.map((post: any) => {
        return (
          <CommentBox
            key={post._id}
            // @ts-ignore

            post={post}
          />
        );
      })}
    </div>
  );
};

const PromptCard = ({
  //@ts-ignore
  post,
  //@ts-ignore
  handleTagClick,
  //@ts-ignore
  liked,
  //@ts-ignore
  handleEdit,
  //@ts-ignore
  handleDelete,
}) => {
  const pathname = usePathname();

  const promptClass = pathname.includes('profile')
    ? 'mt-16 profile_layout'
    : 'mt-16 prompt_layout';

  console.log(pathname.includes('profile'));

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
  const [comments, setComments] = useState([]);
  // @ts-ignore

  // @ts-ignore

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/comment/${post.id}`);
      const data = await response.json();

      setComments(data);
    };
    fetchPosts();
  }, [post.id]);

  // @ts-ignore
  const createComment = async (e) => {
    e.preventDefault();

    try {
      // @ts-ignore

      const response = await fetch(`/api/comment/${post.id}`, {
        method: 'POST',
        body: JSON.stringify({
          // @ts-ignore
          userId: session?.user?.id,
          // @ts-ignore
          myComment: comment.comment,
        }),
      });
      if (response.ok) {
        toast.success('Commented!');
        setIsPopupOpen(false);

        router.push('/');
      }
    } catch (error) {}
  };

  const handleOpenPopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const handleViewComments = () => {
    setViewComment((prev) => !prev);
  };

  const handleProfileClick = () => {
    // @ts-ignore
    if (post.creator._id === session?.user.id) return router.push('/profile');

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);

    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000);
  };

  const handleLike = async () => {
    // @ts-ignore

    // @ts-ignore
    const response = await fetch(`/api/like/${post._id}/${session?.user?.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status == 200) {
      setLikes(likes + 1);
      setMyLiked(true);
      liked = true;
    }
    if (response.status == 201) {
      setLikes(likes - 1);
      setMyLiked(false);
      liked = false;
    }
  };

  return (
    <div className={promptClass}>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt={post.creator.username}
            width={40}
            height={40}
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
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
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className=' font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      <div className='mt-5 flex items-center gap-4 border-t  border-gray-100 pt-3 text-lg	'>
        <p
          // className='font-inter text-sm green_gradient cursor-pointer'
          onClick={() => session?.user && handleLike()}
          className='text-2xl cursor-pointer'
        >
          {liked || myLiked ? (
            <AiFillHeart color='red' />
          ) : (
            <AiOutlineHeart color='red' />
          )}
        </p>

        <p className='font-inter  cursor-pointer text-lg '>{likes}</p>
        {/* @ts-ignore */}
        {viewComment && session?.user && (
          // @ts-ignore
          <CommentCardList postComment={comments.comments} />
        )}
        <button
          onClick={handleViewComments}
          className=' gap-4 border-t  border-gray-100  text-lg	'
          style={{ display: session?.user ? 'block' : 'none' }}
        >
          {!isPopupOpen ? <BiCommentDetail /> : <AiOutlineCloseCircle />}
        </button>

        {isPopupOpen && session?.user && (
          <NewComment
            handleSubmit={createComment}
            comment={comment}
            setComment={setComment}
            submitting={submitting}
          />
        )}
        <button
          onClick={handleOpenPopup}
          className=' gap-4 border-t  border-gray-100  text-lg	'
          style={{ display: session?.user ? 'block' : 'none' }}
        >
          {!isPopupOpen ? <BiCommentAdd /> : <AiOutlineCloseCircle />}
        </button>
      </div>

      {/* @ts-ignore */}
      {session?.user?.id === post.creator._id && pathName === '/profile' && (
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
      )}
    </div>
  );
};

export default PromptCard;

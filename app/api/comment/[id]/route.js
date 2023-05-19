import { connectToDB } from '@utils/database';
import Comment from '@models/comment';
import Prompt from '@models/prompt';
export const POST = async (req, { params }) => {
  const { userId, myComment } = await req.json();

  try {
    await connectToDB();

    const postId = params.id.toString();

    const post = await Prompt.findById(postId);
    console.log(post);

    if (!post) {
      return new Response('Post Not Found', { status: 400 });
    }

    if (!userId) {
      return new Response('User ID required', { status: 400 });
    }

    const comment = await Comment.create({
      user: userId,
      prompt: postId,
      comment: myComment,
    });

    await comment.save();

    return new Response(
      JSON.stringify({
        message: 'Commented Successfully',
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response('Failed to fetch prompt', { status: 500 });
  }
};
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const postId = params.id.toString();

    const comments = await Comment.find({ prompt: postId }).populate(['user']);
    console.log(comments);

    return new Response(
      JSON.stringify({
        comments,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response('Failed to fetch prompt', { status: 500 });
  }
};

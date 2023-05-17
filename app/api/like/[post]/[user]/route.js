import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const postId = params.post.toString();
    const userId = params.user.toString();

    const post = await Prompt.findById(postId);

    if (!post) {
      return new Response('Post Not Found', { status: 400 });
    }

    if (!userId) {
      return new Response('User ID required', { status: 400 });
    }

    if (post.likedBy.includes(userId)) {
      await Prompt.findByIdAndUpdate(
        postId,
        { $inc: { likes: -1 }, $pull: { likedBy: userId } },
        { new: true }
      );
      console.log('here');
      return new Response(
        JSON.stringify({
          message: 'UnLiked Successfully',
        }),
        { status: 201 }
      );
    }

    await Prompt.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 }, $push: { likedBy: userId } },
      { new: true }
    );

    return new Response(
      JSON.stringify({
        message: 'Liked Successfully',
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response('Failed to fetch prompt', { status: 500 });
  }
};

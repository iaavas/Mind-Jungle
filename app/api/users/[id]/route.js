import { connectToDB } from '@utils/database';
// @ts-ignore
import User from '@models/User';
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const user = await User.findOne({ creator: params.id });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch prompt', { status: 500 });
  }
};

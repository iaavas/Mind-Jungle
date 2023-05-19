import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
export const POST = async (req, res) => {
  const { userId, prompt, tag, likes } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response('Failed to create prompt', { status: 500 });
  }
};

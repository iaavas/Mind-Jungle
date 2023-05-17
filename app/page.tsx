import Image from 'next/image';
import Feed from '@/components/Feed';
export default function Home() {
  return (
    <>
      <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>
          Mind Jungle
          <br className='max-md:hidden' />
          <span className='blue_gradient text-center mt-5'>
            Share your exciting ideas
          </span>
        </h1>

        <p className='desc text-center'>
          Roam freely and share the wildest of your ideas in our vibrant
          community
        </p>

        <Feed />

        {/*  Feed component here */}
      </section>
    </>
  );
}

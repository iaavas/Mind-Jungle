import Image from 'next/image';
import Feed from '@/components/Feed';
export default function Home() {
  return (
    <>
      <section className='w-full flex-center flex-col'>
        <Feed />

        {/*  Feed component here */}
      </section>
    </>
  );
}

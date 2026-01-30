import Link from "next/link";

export default function Home() {
  return (
    <div className='py-10 text-xl'>
      <p>A collection of some commonly used utilities of mine.</p>
      <p>
        Previously I would just search for these tools online whenever I needed
        them, which was fine.
      </p>
      <p>
        But I thought I could just build them myself and put them all together
        in one place for ease of use.
      </p>
      <br></br>
      <p>
        I don&apos;t think this is mobile responsive sorry, it will be if I can
        ever be bothered.
      </p>
      <br></br>
      <div className='flex gap-2 items-center text-sm'>
        <Link
          className='hover:font-semibold transition-all duration-200'
          href='https://github.com/rayhackshaw'
          target='_blank'
        >
          Github
        </Link>
        <Link
          className='hover:font-semibold transition-all duration-200'
          href='https://rayhackshaw.com'
          target='_blank'
        >
          Website
        </Link>
      </div>
    </div>
  );
}

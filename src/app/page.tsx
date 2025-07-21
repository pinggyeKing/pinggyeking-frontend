import Image from 'next/image';

export default function Home() {
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen"
      role="main"
      aria-label="홈 배경"
      tabIndex={0}
    >
      <main className="flex flex-col items-center">
        <Image src="/Logo.svg" alt="logo" width={245} height={234} priority />
      </main>
    </div>
  );
}

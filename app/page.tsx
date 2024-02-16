import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Image
          src="/night_view.jpg"
          width={322}
          height={100}
          className="hidden md:block"
          alt="Night View from Hokkaido"
      />
      <h1>hello World</h1>
    </main>
  );
}

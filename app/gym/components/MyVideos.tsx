'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { lusitana } from "@/app/ui/fonts";
import { useEffect } from "react";
import { io } from "socket.io-client";


async function getMyVideos (date:string) {
  console.log({ date })
  const res = await axios.get('http://localhost:9001/api/v1/videos', { params: { date } });
  return res.data;
}

export default function MyVideos({
  date,
}: Readonly<{
  date: string
}>) {

  const { data, isLoading, isError, isSuccess } = useQuery<any, Error>({
    queryKey: ['myVideos', date],
    queryFn: () => getMyVideos(date)
  });

  useEffect(() => {
    const socket = io("http://localhost:9001/api/v1");
    console.log('hi')

    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    
    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });

    socket.on("connect_error", () => {
      setTimeout(() => {
        console.log("reconnecting")
        socket.connect();
      }, 1000);
    });

    return () => { socket.disconnect(); console.log('bye'); };
  }, [])

  return (
    <div>
      <h1 className={lusitana.className}> My Videos </h1>
      {
        data === undefined || data.length === 0
        ? (<div>empty</div>)
        : data.map((video) => (
          <section className="bg-cover bg-slate-800 w-full max-h-lvh flex flex-col items-center justify-center">
            <video
              src={`https://d3tzq0axgoep76.cloudfront.net/${video.Key}`}
              controls
              className="h-[600px]"
            />
          </section>
        ))
      }

    </div>
  )

}
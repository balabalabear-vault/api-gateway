'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { lusitana } from "@/app/ui/fonts";
import { useCallback, useEffect, useState } from "react";
import { Manager, Socket, io } from "socket.io-client";


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

  const [manager, setManager] = useState<Manager>();
  const [socket, setSocket] = useState<Socket>();
  
  useEffect(() => {
    if (manager) return;
    console.log('.')
    setManager(new Manager("http://localhost:9001/api/v1"))
  }, [])

  useEffect(() => {
    if (!manager) return;
    setSocket(manager.socket("/"));
    return () => { if (socket) socket.disconnect(); };
  }, [manager])

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log(socket.id);
    });
    
    socket.on("disconnect", () => {
      console.log(socket.id);
    });

    socket.on("connect_error", () => {
      setTimeout(() => {
        socket.connect();
      }, 1000)
    });
  }, [socket])

  const handleOnClick = () => socket.emit("ping", "hello", "world");

  return (
    <div>
      <h1 className={lusitana.className}> My Videos </h1>
      <button onClick={handleOnClick}>Emit</button>
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
'use client'

import { Button, Input } from "@nextui-org/react";
import { lusitana } from "../..//ui/fonts";
import { ChangeEvent, MouseEvent, ReactNode, useEffect, useState, useTransition } from "react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';


type FileWithObjectUrl = File & { objectUrl: string };

export default function Page() {
  const [videos, setVideos] = useState<FileWithObjectUrl[]>([]);
  const [videoElements, setVideoElements] = useState<ReactNode[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    const uploaded = event.target.files;
    if (uploaded === null || uploaded.length === 0) return;
    else {
      startTransition(() => {
        const files = Object.values(uploaded).map((file) => ({ ...file, objectUrl: URL.createObjectURL(file) }))
        setVideos([...videos, ...files]);
      })
    }
  }

  const handleOnClick = async (event: MouseEvent<HTMLElement>) => {
    const res = await fetch('/profiles/videos/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hi: "hi" }),
    })
    console.log(res)
  }

  useEffect(() => {
    if (videos.length === 0) return;
    startTransition(() => {
      setVideoElements(videos.map((video, index) => (
        <video key={index} width="300" controls src={video.objectUrl} />
      )))
    })
  }, [videos]);

  console.log(isPending)

  return (
    <>
      <h1 className={lusitana.className}> My videos </h1>
      <input
        type="file"
        accept="video/*"
        placeholder="Uploads"
        onChange={handleOnChange}
        multiple
      />
      {
        <AliceCarousel mouseTracking items={videoElements} />
      }
      <Button
        color="primary"
        isDisabled={videos.length === 0}
        onClick={handleOnClick}
      > 
        Upload
      </Button>

    </>
  )
}
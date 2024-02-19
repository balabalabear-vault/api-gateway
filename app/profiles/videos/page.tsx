'use client'

import { Button, Input } from "@nextui-org/react";
import { lusitana } from "../..//ui/fonts";
import { ChangeEvent, useEffect, useState } from "react";


export default function Page() {
  const [videos, setVideos] = useState<File[]>([]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    const uploaded = event.target.files;
    if (uploaded === null || uploaded.length === 0) return;
    else setVideos([...videos, ...Object.values(uploaded)]);
  }

  const handleOnClick = async (event) => {
    console.log(videos)
    const res = await fetch('/profiles/videos/api/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hi: "hi" }),
    })
    console.log(res)
  }

  return (
    <>
      <h1 className={lusitana.className}>
        My videos
      </h1>
      <input
        // size="sm"
        // variant="faded"
        // radius="sm"
        // label="Videos"
        type="file"
        accept="video/*"
        placeholder="Uploads"
        // labelPlacement="outside"
        onChange={handleOnChange}
        multiple
      />
      {
        videos.map((video, i) => (
          <div key={i}>{video.name}</div>
        ))
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
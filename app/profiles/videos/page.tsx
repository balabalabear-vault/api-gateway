'use client'

import { Button, Input } from "@nextui-org/react";
import { lusitana } from "../..//ui/fonts";
import { ChangeEvent, MouseEvent, ReactNode, useEffect, useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import VideoListing from "./VideoListing";
import RemoveModal from "./RemoveModal";

export type FileWithObjectUrl = File & { objectUrl: string };

function getMuscleGroups () {
  return fetch(`http://localhost:9001/api/v1/muscle-groups`)
    .then((res) => res.json())
}

function postVideos (video: FormData) {
  return fetch("http://localhost:9001/api/v1/media/videos", {
    method: "POST",
    body: video,
  })
    .then((res) => res.json())
}

export default function Page() {
  const [videos, setVideos] = useState<FileWithObjectUrl[]>([]);
  const [targetVideoId, setTargetVideoId] = useState<null | number>(null);
  const [isPending, startTransition] = useTransition();

  const { data, isLoading, isError, isSuccess } = useQuery<any, Error>({
    queryKey: ['muscleGroups'],
    queryFn: () => getMuscleGroups()
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    const uploaded = event.target.files;
    if (uploaded === null || uploaded.length === 0) return;
    else {
      startTransition(() => {
        const files = Object.values(uploaded).map((file) => {
          const fileWithUrl = file as FileWithObjectUrl;
          fileWithUrl.objectUrl = URL.createObjectURL(file);
          return fileWithUrl;
        })
        console.log(files)
        setVideos([...videos, ...files]);
      })
    }
  }

  const handleOnClick = (event: MouseEvent<HTMLElement>) => {
    const res = fetch('/profiles/videos/api', {
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
      <h1 className={lusitana.className}> My videos </h1>
      <div>
        <label
          className="border-solid border-2 rounded border-slate-300"
          htmlFor="video_uploads"
        >
          Choose video to upload
        </label>
        <input
          id="video_uploads"
          name="video_uploads"
          type="file"
          accept="video/*"
          multiple
          style={{ opacity: 0 }}
          onChange={handleOnChange}
        />
      </div>
      <div className="flex flex-col">
        {
          videos.map((video, index) => (
            <VideoListing key={index} tempId={index} video={video} setTargetVideoId={setTargetVideoId} />
          ))
        }
      </div>
      {
        typeof targetVideoId==='number' && (
          <RemoveModal
            targetVideoId={targetVideoId}
            setTargetVideoId={setTargetVideoId}
            setVideos={setVideos}
          />
        )
      }

      {/* <Button
        color="primary"
        isDisabled={videos.length === 0}
        onClick={handleOnClick}
      > 
        Upload
      </Button> */}

    </>
  )
}

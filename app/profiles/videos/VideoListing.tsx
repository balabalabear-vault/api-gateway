'use client'

import BinIcon from "@/app/ui/icons/Bin";
import DetailsIcon from "@/app/ui/icons/Details";
import { Button, Progress } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ETargetVideoAction, TTargetVideoAction } from "./page";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosProgressEvent } from "axios";

export default function VideoListing({
	tempId,
	video,
	setTargetVideoAction,
}:Readonly<{
	tempId: number;
  video: File;
	setTargetVideoAction: Dispatch<SetStateAction<null | TTargetVideoAction>>
}>) {
  const [progress, setProgress] = useState<number | undefined>(undefined);

	const postVideo = useMutation<any, Error, File>({
    mutationFn: async (video: File) => {
			const formData = new FormData();
			formData.append('videos', video);
      const res = await axios.postForm("http://localhost:9001/api/v1/videos", {
          videos: video,
        }, {
          onUploadProgress: (progressEvent: AxiosProgressEvent) => (
            setProgress(
              progressEvent.progress ? Number((progressEvent.progress * 100).toPrecision(2)) : undefined
            )
          )
        }
      )
			return res;
    },
  })

useEffect(() => { postVideo.mutate(video) }, [])

	return (
    <div className="grid grid-cols-4 justify-start items-center my-4 relative">
      <div>{progress}</div>
      <div className="col-span-2">
        {video.name}
      </div>
      <div className="justify-self-end">
        <Button
          isIconOnly
          color="warning"
          variant="faded"
          onClick={() => setTargetVideoAction({id: tempId, action: ETargetVideoAction.DELETE})
        }>
          <BinIcon />
        </Button>
        <Button
          isIconOnly
          color="warning"
          variant="faded"
          onClick={() => setTargetVideoAction({id: tempId, action: ETargetVideoAction.EDIT})}
        >
          <DetailsIcon />
        </Button>
      </div>
      <div className="absolute bottom-0 w-full">
        <Progress
          isStriped
          size="sm"
          value={progress}
          color="success"
          className="max-w-md"
        />
      </div>
    </div>
	)

}
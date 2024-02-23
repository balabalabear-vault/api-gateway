'use client'

import BinIcon from "@/app/ui/icons/Bin";
import DetailsIcon from "@/app/ui/icons/Details";
import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ETargetVideoAction, TTargetVideoAction } from "./page";
import { useMutation } from "@tanstack/react-query";

export default function VideoListing({
	tempId,
	video,
	setTargetVideoAction,
}:Readonly<{
	tempId: number;
  video: File;
	setTargetVideoAction: Dispatch<SetStateAction<null | TTargetVideoAction>>
}>) {

	const postVideo = useMutation<any, Error, File>({
    mutationFn: async (video: File) => {
			const formData = new FormData();
			formData.append('videos', video);
      const res = await fetch("http://localhost:9001/api/v1/videos", {
				method: "POST",
				body: formData,
			})
			return res;
    },
  })

	useEffect(() => { postVideo.mutate(video) }, [])

	return (
		<div className="grid grid-cols-4 justify-start items-center my-4">
			<div>1</div>
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
		</div>
	)

}
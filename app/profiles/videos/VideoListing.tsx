'use client'

import BinIcon from "@/app/ui/icons/Bin";
import DetailsIcon from "@/app/ui/icons/Details";
import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

export default function VideoListing({
	tempId,
	video,
	setTargetVideoId,
}:Readonly<{
	tempId: number;
  video: File;
	setTargetVideoId: Dispatch<SetStateAction<number | null>>
}>) {
	return (
		<div className="grid grid-cols-4 justify-start items-center my-4">
			<div>1</div>
			<div className="col-span-2">
				{video.name}
			</div>
			<div className="justify-self-end">
				<Button isIconOnly color="warning" variant="faded" onClick={() => setTargetVideoId(tempId)}>
					<BinIcon />
				</Button>
				<Button isIconOnly color="warning" variant="faded" onClick={() => setTargetVideoId(tempId)}>
					<DetailsIcon />
				</Button>
			</div>
		</div>
	)

}
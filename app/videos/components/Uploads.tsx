import { lusitana } from "@/app/ui/fonts";
import { Button } from "@nextui-org/react";
import { ChangeEvent, useState, useTransition } from "react";
import RemoveModal from "../RemoveModal";
import VideoListing from "../VideoListing";
import { TFileWithObjectUrl, ETargetVideoAction, TTargetVideoAction } from "../page";

export default function Uploads() {
  const [videos, setVideos] = useState<TFileWithObjectUrl[]>([]);
  const [targetVideoAction, setTargetVideoAction] = useState<null | TTargetVideoAction>(null);
  const [isPending, startTransition] = useTransition();
  
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    const uploaded = event.target.files;
    if (uploaded === null || uploaded.length === 0) return;
    else {
      startTransition(async () => {
        const files = Object.values(uploaded).map((file) => {
          const fileWithUrl = file as TFileWithObjectUrl;
          fileWithUrl.objectUrl = URL.createObjectURL(file);
          return fileWithUrl;
        })
        setVideos([...videos, ...files]);
      })
    }
  }
  return (
    <div>
      <h1 className={lusitana.className}> Uploads </h1>
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
            <VideoListing key={index} tempId={index} video={video} setTargetVideoAction={setTargetVideoAction} />
          ))
        }
      </div>
      {
        targetVideoAction
        && (
          targetVideoAction.action === ETargetVideoAction.DELETE
          ? (
            <RemoveModal
              targetVideoAction={targetVideoAction}
              setTargetVideoAction={setTargetVideoAction}
              setVideos={setVideos}
            />
          ):(
            <div>edit</div>
          )
        )
      }
      {/* <Button
        color="primary"
        isDisabled={videos.length === 0}
        onClick={handleOnClick}
      > 
        Upload
      </Button> */}
    </div>     
  )
}
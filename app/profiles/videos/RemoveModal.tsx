'use client'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { FileWithObjectUrl } from "./page";

export default function RemoveModal({
  targetVideoId,
  setTargetVideoId,
  setVideos,
}: Readonly<{
  targetVideoId: number,
	setTargetVideoId: Dispatch<SetStateAction<number | null>>,
	setVideos: Dispatch<SetStateAction<FileWithObjectUrl[]>>,
}>) {

  const handleConfirmation = () => {
    console.log('logic here')
    setVideos((prev) => prev.filter((video, index) => index !== targetVideoId));
    setTargetVideoId(null)
  }

  return (
    <Modal backdrop="blur" placement="center" isOpen={true} onClose={() => setTargetVideoId(null)}>
      <ModalContent className="text-black">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Cancel Upload</ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to cancel uploading the video ?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="danger" onPress={handleConfirmation}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )

}
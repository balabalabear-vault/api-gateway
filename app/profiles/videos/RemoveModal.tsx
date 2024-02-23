'use client'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { TFileWithObjectUrl, TTargetVideoAction } from "./page";

export default function RemoveModal({
  targetVideoAction,
  setTargetVideoAction,
  setVideos,
}: Readonly<{
  targetVideoAction: TTargetVideoAction,
	setTargetVideoAction: Dispatch<SetStateAction<null | TTargetVideoAction>>,
	setVideos: Dispatch<SetStateAction<TFileWithObjectUrl[]>>,
}>) {

  const handleConfirmation = () => {
    console.log('logic here')
    setVideos((prev) => prev.filter((video, index) => index !== targetVideoAction.id));
    setTargetVideoAction(null)
  }

  return (
    <Modal backdrop="blur" placement="center" isOpen={true} onClose={() => setTargetVideoAction(null)}>
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
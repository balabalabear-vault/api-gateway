'use client'

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "./components/DatePicker";
import MyVideos from "../gym/components/MyVideos";


export type TFileWithObjectUrl = File & { objectUrl: string };

export enum ETargetVideoAction {
  EDIT = 'EDIT',
  DELETE = 'DELETE'
}

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type TTargetVideoAction = {
  id: number;
  action: ETargetVideoAction
}

function getMuscleGroups () {
  return fetch(`http://localhost:9001/api/v1/muscle-groups`)
    .then((res) => res.json())
}

export default function Page() {
  const [date, setDate] = useState<Value>(null)

  console.log((date as Date)?.toUTCString())

  const { data, isLoading, isError, isSuccess } = useQuery<any, Error>({
    queryKey: ['muscleGroups'],
    queryFn: () => getMuscleGroups()
  });


  useEffect(() => { setDate(new Date()); }, [])

  return (
    <>
      <DatePicker value={date} onChange={setDate}/>
      <MyVideos date={(date as Date)?.toISOString().split('T')[0]}/>
    </>
  )
}
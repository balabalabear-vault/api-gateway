'use client'

import { Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "../gym/components/DatePicker";
import {Key} from '@react-types/shared';
import Uploads from "./components/Uploads";
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

  const tabs = [{
    name: "My Videos",
    component: <MyVideos date={date?.toISOString().split('T')[0]}/>,
  },{
    name: "Uploads",
    component: <Uploads />,
  }];

  const [currentTab, setCurrentTab] = useState<Key>(tabs[0].name);

  const { data, isLoading, isError, isSuccess } = useQuery<any, Error>({
    queryKey: ['muscleGroups'],
    queryFn: () => getMuscleGroups()
  });


  useEffect(() => { setDate(new Date()); }, [])

  return (
    <>
      <DatePicker value={date} onChange={setDate}/>
      <Tabs
        radius="md"
        aria-label="Tabs radius"
        selectedKey={currentTab}
        onSelectionChange={setCurrentTab}
      >
        {
          tabs.map((tab) => (
            <Tab key={tab.name} title={tab.name} />
          ))
        }
      </Tabs>
      {
        tabs.find((tab) => tab.name === currentTab)?.component
      }
    </>
  )
}

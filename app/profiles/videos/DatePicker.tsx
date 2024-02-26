'use client'
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import Calendar from "react-calendar";
import { Value } from "./page";

export default function DatePicker({
  value,
  onChange,
}: Readonly<{
  value: Value,
  onChange: Dispatch<SetStateAction<Value>>,
}>) {
  const [dummy, setOpen] = useState(true);


  const displayingDate = value?.toLocaleString().split(',')[0]
    ?? new Date().toLocaleString().split(',')[0];

  const handleOnChange = (event: any) => {
    onChange(event);
    setOpen(false);
  }

  return (
    <Accordion
      variant="splitted"
      isCompact
    >
      <AccordionItem
        key={"date"}
        aria-label={displayingDate}
        title={displayingDate}
        className="text-center text-white"
        classNames={{
          title: "text-center",
          trigger: "color-red"
        }}
      >
        <Calendar className="text-black" onChange={handleOnChange} value={value} />
      </AccordionItem>
    </Accordion>
  )
}
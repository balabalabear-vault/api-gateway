'use client'
import { Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";

export function MyNavbar() {
  return (
    <div className="absolute top-5 w-full flex justify-center items-center">
      <Tabs color="default" radius="full" className="w-full justify-center">
        <Tab
          key="work"
          title={
            <Link href="/">
              <div className="flex items-center space-x-2">
                <span>General</span>
                <span>🏠</span>
              </div>
            </Link>
          }
        />
        <Tab
          key="gym"
          title={
            <Link href="/gym">
              <div className="flex items-center space-x-2">
                <span>Gym</span>
                <span>🏋🏿‍♂️</span>
              </div>
            </Link>
          }
        />
      </Tabs>
    </div>
  )
}
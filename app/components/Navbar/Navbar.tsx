'use client'
import { Tab, Tabs } from "@nextui-org/react";

export function MyNavbar() {
  return (
    <div className="absolute top-5 w-full flex justify-center items-center">
      <Tabs color="default" radius="full" className="w-full justify-center">
        <Tab
          key="work"
          title={
            <div className="flex items-center space-x-2">
              <span>General</span>
              <span>🏠</span>
            </div>
          }
        />
        <Tab
          key="gym"
          title={
            <div className="flex items-center space-x-2">
              <span>Gym</span>
              <span>🏋🏿‍♂️</span>
            </div>
          }
        />
      </Tabs>
    </div>
  )
}
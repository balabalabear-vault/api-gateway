'use client'

import { lusitana } from "@/app/ui/fonts";
import { motion, useIsPresent } from "framer-motion";
import Image from "next/image";

export default function Concept4Section() {
  const isPresent = useIsPresent();
  console.log({isPresent})

  return (
    <article>
      <section className="w-full min-h-lvh p-24 flex flex-col justify-center items-center bg-concept4-pink">
        <Image 
          src="/concept4_logo.png"
          alt="Concept4"
          width={1600}
          height={400}
          className="grow-0 shrink-0 mb-3"
        />
        <div>
          <p className={`${lusitana.className} my-2 text-sm leading-7`}>
            Concept 4 is a leading design, manufacturing and logistic company in Hong Kong which has its branches established across Asia, Europe and North America.
            I worked here from Feb 2022 to Feb 2024 as a full stack developer mainly focus on new feature development and code maintenance.
            This is definitely one of my most precious experience as the team I worked with help me build a strong grasp of knowledge in web developemnt and CI/CD.
          </p>
        </div>
      </section>

    </article>
  )
}
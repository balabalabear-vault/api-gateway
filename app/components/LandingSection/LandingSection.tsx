'use client'
import { motion, useAnimate } from "framer-motion";
import { elven, medieval } from "../../ui/fonts";
import { useMemo } from "react";
import { CLOUD_FRONT_URL } from "@/app/constants/assets";

const getRandomDelay = () => -(Math.random() * 0.7 + 0.05);

const randomDuration = () => Math.random() * 0.07 + 0.23;

export default function LandingSection() {
  const animation = useMemo(() => ({
    rotate: Math.random() > 0.5 ? [-1, 1.3, 0] : [1, -1.4, 0],
    transition: {
      delay: getRandomDelay(),
      repeat: 5,
      duration: randomDuration()
    }
  }), [])
  return(
    <section
      className="bg-cover bg-slate-800 w-full h-lvh flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${CLOUD_FRONT_URL}/elf_house.jpg)`,
        boxShadow: 'inset 0 0 0 1000px rgba(200,200,200,.7)',
      }}
    >
      <motion.div
        whileHover={animation}
        whileTap={animation}
      >
        <h1 className={`${medieval.className} text-center`}>Hello World</h1>
        <p className={`${elven.className} text-center`}>welcome to my vault</p>
        <p className={`${elven.className} text-center`}>hope you will have a nice experience here</p>
      </motion.div>
  </section>
  )
}

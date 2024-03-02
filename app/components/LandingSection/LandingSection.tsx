'use client'
import { motion, useAnimate } from "framer-motion";
import { elven } from "../../ui/fonts";
import elfHouse from '../../../public/elf_house.jpg'
import { useMemo } from "react";

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
        backgroundImage: `url(${elfHouse.src})`,
        boxShadow: 'inset 0 0 0 1000px rgba(200,200,200,.7)',
      }}
    >
      <motion.div
        whileHover={animation}
        whileTap={animation}
      >
        <h1 className={`${elven.className} text-center`}>Hello World</h1>
        <p className={`${elven.className} text-center`}>welcome to my vault</p>
        <p className={`${elven.className} text-center`}>hope you will have a nice experience here</p>
      </motion.div>
  </section>
  )
}

'use client'
import { lusitana } from "@/app/ui/fonts";
import { easeOut, motion, useAnimate, useTransform } from "framer-motion";
import Image from "next/image";
import { useScroll } from "framer-motion"
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { MediaContext } from "@/app/providers/Responsive/ResponsiveProvider";
import Summary from "./Summary";

export default function SelfIntroSection() {
  const media = useContext(MediaContext);
  const [isDesktop, setIsDesktop] = useState(media.isDesktop);
  useEffect(() => { if (media.isDesktop !== isDesktop) setIsDesktop(media.isDesktop); }, [media, isDesktop])
  
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.2, 0.6, 1]);
  const y = useTransform(scrollYProgress, [0, 0.7], [200, 0]);

  const detailText = useMemo(() => (
    <>
      <p className={`my-2 leading-7`}>I have a broad range of interests from astronomy to meditation. The world is full of excitement that I am eager to learn. Yet, coding will always be my prime enjoyment as the sense of satisfaction when I built something that can help people is irreplaceable.</p>
      <p className={`my-2 leading-7`}>Sports is probably my second life. I cannot live without it. Water sports and racket sports are all welcomed. Winter sports is something I want to master when I moved to Toronto xD</p>
      <p className={`my-2 leading-7`}>I would love to share more about myself, but maybe you only want to take a fast grasp of my website. So ... Let&apos;s Scroll!</p>
    </>
  ), []);

  const briefText = useMemo(() => (
      <p className={`my-2 leading-7 text-justify`}>I am sharing more in Desktop view, but maybe you only want a fast grasp of my website. So ... Let&apos;s Scroll!</p>
  ), []);


  return (
    <motion.section
      className="bg-cover bg-slate-800"
      ref={sectionRef}
    >
      <motion.div style={{ opacity, y }} className="w-full min-h-lvh p-24 grid grid-cols-1 md:grid-cols-3 items-center justify-around gap-4 relative">
        <div className="flex justify-center items-center">
          <Image
            src="/myself.jpg"
            alt="Profil Picture"
            width={448}
            height={672}
            />
        </div>
        <div className={`${lusitana.className} col-span-2 text-white`}>
          <Summary />
          {isDesktop ? detailText : briefText}
        </div>
      </motion.div>
    </motion.section>
  )
}
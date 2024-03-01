import { lusitana } from "@/app/ui/fonts";
import { useTransform, motion, useScroll, easeInOut } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function LandingPart() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "start center"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 180], { ease: easeInOut });
  const backgroundColor = useTransform(scrollYProgress, [0, 1], ["#D50B86", "rgb(30 41 59)"], { ease: easeInOut });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0], { ease: easeInOut });

  return (
    <motion.section
      className="w-full min-h-lvh p-24 flex flex-col justify-center items-center"
      ref={sectionRef}
      style={{ rotateY, backgroundColor }}
    >
      <motion.div style={{ opacity }}>
        <Image
          src="/concept4_logo.png"
          alt="Concept4"
          width={1600}
          height={400}
          className="grow-0 shrink-0 mb-3"
        />
      </motion.div>
      <motion.div className="max-w-3xl flex justify-center items-center" style={{ opacity }}>
        <p className={`${lusitana.className} my-2 text-sm leading-7 text-center`}>
          Concept 4 is a leading design, manufacturing and logistic company in Hong Kong which has its branch established across Asia, Europe and North America.
          I worked here from Feb 2022 to Feb 2024 as a full stack developer mainly focus on new feature development and code maintenance.
          This is definitely one of my most precious experience as the team I worked with help me build a strong grasp of knowledge in web developemnt and CI/CD.
        </p>
      </motion.div>
    </motion.section>

  )
}
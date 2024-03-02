import { easeIn, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function EndingSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const backgroundColor = useTransform(scrollYProgress, [0.8, 0.9, 1], ['#D50B86', 'rgb(30 41 59)', 'rgb(30 41 59)'], { ease: easeIn})

  useMotionValueEvent(scrollYProgress, 'change', () => {
    // console.log(scrollYProgress.get())
  })


  return (
    <motion.section
      className="w-full min-h-lvh flex flex-col justify-center items-center bg-slate-800"
        ref={sectionRef}
        // style={{ backgroundColor }}
      >

      <section className="w-full h-[50vh] m-[-50vh] bg-red-400">
        <h1>CONTACT</h1>

      </section>
    </motion.section>
  )
}
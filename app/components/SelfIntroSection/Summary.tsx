import { lusitana } from "@/app/ui/fonts"
import { useAnimate } from "framer-motion"
import { useEffect } from "react"

export default function Summary() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    void animate(
      [
        [scope.current, { y: '0%' }, { duration: 0 }],
        [scope.current, { y: '-100%' }, { duration: 0.3, at: '+1.3' }],
        [scope.current, { y: '-200%' }, { duration: 0.3, at: '+1.3' }],
        [scope.current, { y: '-300%' }, { duration: 0.3, at: '+1.3' }],
        [scope.current, { y: '-200%' }, { duration: 0.3, at: '+1.3' }],
        [scope.current, { y: '-100%' }, { duration: 0.3, at: '+1.3' }],
        [scope.current, { y: '0%' }, { duration: 0.3, at: '+1.3' }],
      ],
      {
        repeat: Number.POSITIVE_INFINITY,
      }
    )
  }, [animate, scope])

  const descriptions = [
    'agile',
    'earnest',
    'enthusiastic',
    'independent',
  ]

  const colorGenerator = (num: number) => num % 2 === 0 ? 'from-[#ff1835] to-[#ffc900]' : 'from-[#0077ff] to-[#00e7df]'

  return (
    <h1 className="text-xl font-bold my-1 mb-1">
      Hi, I am Jack, an{' '}
      <span className={`inline-grid h-7 overflow-hidden ${lusitana.className} my-2 leading-7`}>
        <div className="inline-grid h-7" ref={scope}>
          {
            descriptions.map((description, index) => (
              <span
                key={index}
                className={`font-bold bg-clip-text flex justify-center align-center text-transparent bg-gradient-to-r ${colorGenerator(index)}`}
              >
                {description}
              </span>
            ))
          }
        </div>
      </span>
      {' '}Full Stack Developer with 3 years of experience mainly working on Reactjs, Nodejs and AWS service .
    </h1>
  )
}
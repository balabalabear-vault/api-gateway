import { lusitana, medieval } from "@/app/ui/fonts";
import Link from "next/link";
import ContactMeForm from "./ContactMeForm";
import { createMessage } from "@/app/server-actions/createMessage";

export default function EndingSection() {

  return (
    <section className="w-full sm:h-lvh p-24 flex flex-col items-center justify-center text-neutral-400">
        <h1 className={`${medieval.className} my-2 leading-7 text-center`}>That&apos;s It !</h1>
        <p className={`${lusitana.className}} text-center`}>The content is not much yet, but I promise as my career develops, I will fill it and share with you.</p>
        <p className={`${lusitana.className}} leading-7 text-center`}>I hope you still enjoy the website. Drop me a notes if you want :p</p>
        
        <div className="w-full">
          <ContactMeForm createMessage={createMessage}/>
        </div>
        
        <div className={`my-4  ${lusitana.className} flex flex-col md:flex-row justify-center items-center sm:gap-2 md:gap-4`}>
          <span>© 2024 Jack Kwok</span>
          <Link
            href="https://www.linkedin.com/in/yui-kuen-kwok"
            target="_blank"
          >
            <b>LinkedIn</b>
          </Link>
          <span className="whitespace-nowrap">
            <a href="mailto:kuenyuikwok1106@outlook.com">Email: kuenyuikwok1106@outlook.com</a>
          </span>
        </div>
    </section>
  )
}
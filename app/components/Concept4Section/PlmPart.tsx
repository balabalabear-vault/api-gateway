import { MediaContext } from "@/app/providers/Responsive/ResponsiveProvider";
import { medieval, lusitana } from "@/app/ui/fonts";
import { Card, CardHeader, Divider, CardBody } from "@nextui-org/react";
import { AnimationPlaybackControls, MotionValue, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect, useMemo, useRef, useState } from "react";

function PartTemplate({
  heading, imgSource, y, opacity, isDesktop, detailText, briefText, css
}:Readonly<{
  heading: string,
  imgSource: string,
  y: MotionValue,
  opacity: MotionValue,
  isDesktop: boolean,
  detailText: JSX.Element,
  briefText: JSX.Element
  css: string,
}>) {
  return (
    <motion.div style={{ y, opacity }} className={css}>
      <Card className="lg:max-w-screen-lg max-w-[80%] p-3">
        <CardHeader>
          <h1 className={`${medieval.className} text-center`}>{heading}</h1>
        </CardHeader>
        <Divider />
        <CardBody className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="flex justify-center items-center">
            <Image
              alt={heading}
              height={212 * 1.2}
              src={imgSource}
              width={332 * 1.2}
              priority
            />
          </div>
          <div className="col-span-2 hyphens-auto">
            {isDesktop ? detailText : briefText}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )  
}

export default function PlmPart() {
  const media = useContext(MediaContext);
  const [isDesktop, setIsDesktop] = useState(media.isDesktop);
  useEffect(() => { if (media.isDesktop !== isDesktop) setIsDesktop(media.isDesktop); }, [media, isDesktop])

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  // **********************************
  // ********** Introduction **********
  // **********************************
  const introductionY = useTransform(scrollYProgress, [0, 0.1, 0.2], [500, 500, 0]);
  const introductionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 0, 1]);

  const IntroductionDetailText = useMemo(() => (
    <>
      <p className={`${lusitana.className} my-2 leading-7`}>
        PLM is the product I have been handling most. It uses React as the frontend framework and Material UI as the component library together with Redux and Redux Saga to handle global state and side effects.
      </p>
      <p className={`${lusitana.className} my-2 leading-7`}>
        Express is our backend. Yet, we started adopting NestJS in later microservice. Redis is used for caching and both MongoDB and PostgreSQL are used to handle data storage under different use cases.
      </p>
      <p className={`${lusitana.className} my-2 leading-7`}>
        After we merged our branch to dev and main branch, we start our CI flow which we use Jest as our testing framework and keep pushing to various Kubernetes Node Pods in GCP through CircleCi and Voilà! Our sprint basically ends!
      </p>
    </>
  ), []);

  const IntroductionBriefText = useMemo(() => (
    <>
      <p className={`${lusitana.className} my-2 leading-7`}>
        PLM is the product I have been handling most.
      </p>
      <p className={`${lusitana.className} my-2 leading-7`}>
        It uses React as the frontend framework and Express as the backend framework. NestJS is introduced to our recent new microservice in 2003.
      </p>
      <p className={`${lusitana.className} my-2 leading-7`}>
        After merging our branch to dev and main branch, we will go through our test cases through Jest and push the new image to various Kubernetes Node Pods in Azure through CircleCi.
      </p>
    </>
  ), []);

  // **********************************
  // ********** Exclusivness **********
  // **********************************
  const exclusivenessY = useTransform(scrollYProgress, [0, 0.3, 0.4], [500, 500, 0]);
  const exclusivenessYOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [0, 0, 1]);

  const ExclusivenessDetailText = useMemo(() => (
    <>
      <p className={`${lusitana.className} my-2 leading-7`}>
        By leveraging the power of Nestjs decorator, role and permission control is the first feature we implemented and also my first time as a lead developer.
      </p>
      <p className={`${lusitana.className} my-2 leading-7`}>
        Building upon the role and permission system, we enhanced our current user register flow and allow admins to invite external users to our platform.
      </p>
      <p className={`${lusitana.className} my-2 leading-7`}>
        It is a remarkable milestone to PLM as this indicates the start of our online collaboration with clients to get access with our exclusive contents.
      </p>
      <p className={`${lusitana.className} my-2 leading-7`}>
        Dedicated set of products with outstanding vibes are grouped and shared to specific clients which improved the efficiency of the entire flow by at least half.
      </p>
    </>
  ), []);

  const ExclusivenessBriefText = useMemo(() => (
    <>
      <p className={`${lusitana.className} my-2 leading-7`}>
        The first feature I implemented as a lead developer was the permission system using Nestjs decorators.
      </p>
      <p className={`${lusitana.className} my-2 leading-7`}>
        We are able to enhance our user register flow afterwards and achieved inviting external users to our platform, indicating the start of our online collaboration.
      </p>
      <p className={`${lusitana.className} my-2 leading-7`}>
        Dedicated products are shared to clients which improved the efficiency of the entire flow by at least half.
      </p>
    </>
  ), []);

  // **********************************
  // ********** Personalized **********
  // **********************************
  const personalizedY = useTransform(scrollYProgress, [0, 0.5, 0.6], [500, 500, 0]);
  const personalizedOpacity = useTransform(scrollYProgress, [0, 0.5, 0.6], [0, 0, 1]);

  const PersonalizedDetailText = useMemo(() => (
    <>
      <p className={`${lusitana.className} my-2 leading-7 shrink-0`}>
        Getting product information is important, but being able to pick whatever clients like is also important. Therefore, a shopping cart is provided!
      </p>
      <p className={`${lusitana.className} my-2 leading-7 shrink-0`}>
        Clients can either add products to their shopping cart which can be access at any place within the platform and perform certain types of enquiry or let our staff to remotely handle your pick.
      </p>
      <p className={`${lusitana.className} my-2 leading-7 grow-1`}>
        Not only our system will assign a person to follow up, a web socket server is also built to allow instant communication between two parties. A progress email will be sent daily by our Google Cloud Functions to all related personnel so that you can always be up to date without a hassle.
      </p>
    </>
  ), []);

  const PersonalizedBriefText = useMemo(() => (
    <>
      <p className={`${lusitana.className} my-2 leading-7 shrink-0`}>
        Getting information is important, but picking your favourite is also important. Therefore, a shopping cart is provided!
      </p>
      <p className={`${lusitana.className} my-2 leading-7 shrink-0`}>
        Clients can either add products and perform certain enquires or let our staff to handle remotely.
      </p>
      <p className={`${lusitana.className} my-2 leading-7 grow-1`}>
        Not only we will assign an individual, a web socket server is also built for instant communication. A progress email will be sent daily by our Google Cloud Functions to all related personnel.
      </p>
    </>
  ), []);

  // **********************************
  // *********** Permanent ************
  // **********************************
  const permanentY = useTransform(scrollYProgress, [0, 0.7, 0.8], [500, 500, 0]);
  const permanentOpacity = useTransform(scrollYProgress, [0, 0.7, 0.8], [0, 0, 1]);

  const PermanentDetailText = useMemo(() => (
    <>
      <p className={`${lusitana.className} my-2 leading-7`}>
        Having our work accountable is essential for making management decisions and avoiding potential legal disputes. Hence, listing of users&apos; past activities are common all around our website which can only be accessible under management role.
      </p>
      <p className={`${lusitana.className} my-2 leading-7`}>
        This is how MongoDB steps into our architecture. If a user is exporting or sending something out from PLM, we will have a new entry in Mongo and a pdf of its content.
      </p>
      <p className={`${lusitana.className} my-2 leading-7`}>
        There were debates about not mixing RMDB and NoSql in our team before such implementation. But we do agreed on MongoDB has its value if the data has complex structure or is foreseeable that it will have multiple versions of change.
      </p>
      <p className={`${lusitana.className} my-2 leading-7`}>
        So, after several fierce discussions ... TA-DA! Here is MongoDB :p
      </p>
    </>
  ), []);

  const PermanentBriefText = useMemo(() => (
    <>
      <p className={`${lusitana.className} my-2 leading-7 shrink-0`}>
      List of users&apos; past activities are kept and viewable under management role to ensure accountability.
      </p>
      <p className={`${lusitana.className} my-2 leading-7 shrink-0`}>
        MongoDB is introduced to provide versions of change.
      </p>
      <p className={`${lusitana.className} my-2 leading-7 grow-1`}>
        However, mixing RMDB and NoSql does bring some debates on our team but we agreed NoSql has its value when we need flexibility on data.
      </p>
      <p className={`${lusitana.className} my-2 leading-7`}>
        So ... TA-DA! Here is MongoDB :p
      </p>
    </>
  ), []);

  const parts = useMemo(() => ([
    {
      heading: "Product Lifecycle Management - PLM",
      imgSource: "/PLM/homepage.png",
      css: "relative flex justify-center items-start sticky top-4 grow-1",
      y: introductionY,
      opacity: introductionOpacity,
      detailText: IntroductionDetailText,
      briefText: IntroductionBriefText,
    }, {
      css: "relative flex justify-center items-start sticky top-16 grow-1",
      heading: "Permissions and Collaborations",
      imgSource: "/PLM/collection_list.png",
      y: exclusivenessY,
      opacity: exclusivenessYOpacity,
      detailText: ExclusivenessDetailText,
      briefText: ExclusivenessBriefText,
    }, {
      css: "relative flex justify-center items-start sticky top-28 grow-1",
      heading: "Personal Product Enquiry",
      imgSource: "/PLM/shopping_cart.jpg",
      y: personalizedY,
      opacity: personalizedOpacity,
      detailText: PersonalizedDetailText,
      briefText: PersonalizedBriefText,
    }, {
      css: "relative flex justify-center items-start sticky top-40 grow-1",
      heading: "Permanent Record for Accountability",
      imgSource: "/PLM/export_collection.png",
      y: permanentY,
      opacity: permanentOpacity,
      detailText: PermanentDetailText,
      briefText: PermanentBriefText,
    }
  ]), [
    introductionY,
    introductionOpacity,
    IntroductionDetailText,
    IntroductionBriefText,
    exclusivenessY,
    exclusivenessYOpacity,
    ExclusivenessDetailText,
    ExclusivenessBriefText,
    personalizedY,
    personalizedOpacity,
    PersonalizedDetailText,
    PersonalizedBriefText,
    permanentY,
    permanentOpacity,
    PermanentDetailText,
    PermanentBriefText,
  ]);

  return (
    <motion.section
      className="relative w-full min-h-[500vh] bg-concept4-pink grid grid-cols-1 justify-center items-start p-4 lg:p-24"
      ref={sectionRef}
    >
      {
        parts.map((part, index) => (
          <PartTemplate { ...part } isDesktop={isDesktop} key={index} />
        ))
      }
    </motion.section>
  )
}
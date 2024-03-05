'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { lusitana } from "@/app/ui/fonts";


async function getMyVideos (date:string) {
  console.log({ date })
  const res = await axios.get('http://localhost:9001/api/v1/videos', { params: { date } });
  return res.data;
}

export default function MyVideos({
  date,
}: Readonly<{
  date: string
}>) {

  const { data, isLoading, isError, isSuccess } = useQuery<any, Error>({
    queryKey: ['myVideos', date],
    queryFn: () => getMyVideos(date)
  });

  console.log(data)

  return (
    <div>
      <h1 className={lusitana.className}> My Videos </h1>
      {
        data === undefined || data.length === 0
        ? (<div>empty</div>)
        : data.map((video) => (
          <video src={`https://d3tzq0axgoep76.cloudfront.net/${video.Key}`} controls/>
        ))
      }

    </div>
  )

}
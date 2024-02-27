import { useQuery } from "@tanstack/react-query";


function getMyVideos () {
  return fetch(`http://localhost:9001/api/v1/videos`)
    .then((res) => res.json())
}

export default function MyVideos() {

  const { data, isLoading, isError, isSuccess } = useQuery<any, Error>({
    queryKey: ['myVideos'],
    queryFn: () => getMyVideos()
  });

  return (
    <div>videos</div>
  )

}
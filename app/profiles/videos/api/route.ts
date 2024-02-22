export async function GET(request: Request) {
  const res = await fetch('http://localhost:9001/api/v1/muscle-groups')
  const muscleGroups = await res.json()
  return Response.json({ data: muscleGroups })
}

export function POST(req, res) {

    // not needed in NextJS v12+
    // const body = JSON.parse(req.body);
    console.log(req.body)
    return Response.json({ data: 'hello' })
  
    // the rest of your code
  }
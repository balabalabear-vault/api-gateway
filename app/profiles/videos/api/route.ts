export default function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }

    // not needed in NextJS v12+
    const body = JSON.parse(req.body);
    console.log(body)
  
    // the rest of your code
  }
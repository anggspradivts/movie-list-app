interface FetchDataProps {
  method: string,
  apiEndpoint: string,
}
export async function fetchData ({ method, apiEndpoint }: FetchDataProps) {
  const res = await fetch(apiEndpoint, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
    },
  })
  const data = await res.json();
  return data
};
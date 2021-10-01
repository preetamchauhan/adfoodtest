import {useState, useEffect} from "react";
export default function useFetchOrderStatus(url: string) {
    const [message, setMessage] = useState("Please wait, will notify you once your food is ready");

    const [error, setError] = useState("" as unknown);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result) 
            setMessage(result.message);
          },
          (error) => {
            setError(error);
          }
        ).finally(()=> setLoading(false))
    }, [url])
    return {message, error, loading}
}

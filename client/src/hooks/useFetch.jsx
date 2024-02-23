import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          } else {
            return response.json();
          }
        })
        .then((result) => {
          setData(result);
          setIsLoading(false);
          setError(null)
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;

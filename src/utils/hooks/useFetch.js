import axios from "axios";
const { useEffect } = require("react");
const { useState } = require("react");

const useFetch = (url, check = true) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [update, setUpdate] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      const data = await response?.data;

      setApiData(data.data);
      setIsLoading(false);
    } catch (error) {
      setServerError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (check) {
      fetchData();
    }
  }, [url]);

  useEffect(() => {
    if (update) {
      setIsLoading(true);
      fetchData();
      setUpdate(false);
    }
  }, [update]);

  return { isLoading, apiData, serverError, setUpdate };
};


export default useFetch;

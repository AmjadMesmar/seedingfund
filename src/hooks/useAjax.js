import { useState, useEffect } from 'react';
import axios from 'axios';

const useAjax = (
  endPoint = null,
  methodType = 'get',
  body = {},
  bearerToken = null,
  authParams=null
) => {
  const [url, setUrl] = useState(endPoint);
  const [method, setMethod] = useState(methodType.toUpperCase());
  const [data, setData] = useState(body);
  const [auth, setAuth] = useState(authParams);
  const [token, setToken] = useState(bearerToken);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let options = {
      method,
      url,
      data,
      headers: { 'Content-Type': 'application/json' },
      auth
    };
    
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    
    (async () => {
      try {
        if (url) {
          setLoading(true);
          const response = await axios(options);
          setResults(response);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (e) {
        typeof(e.response.data) === 'string' ? setError(e.response.data) : setError(e.response.data.message);
        setLoading(false);
      }
    })();
  }, [data, method, token, url, auth]);

  const reload = (url = endPoint, method = methodType, data = body, token = bearerToken, auth=authParams) => {
    setUrl(url);
    setMethod(method);
    setData(data);
    setAuth(auth);
    setToken(token);
    setLoading(true);
    setError(null);
  };

  return [results, reload, loading, error, setError];
};
export default useAjax;
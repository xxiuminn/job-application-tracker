enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
const useFetch = () => {
  const fetchData = async <TResponse, TBody = undefined>(
    endpoint: string,
    method: Methods = Methods.GET,
    body?: TBody,
    token?: string
  ): Promise<TResponse> => {
    const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error("database error");
    }

    const data = await res.json();
    return data;
  };

  return fetchData;
};

export { useFetch, Methods };

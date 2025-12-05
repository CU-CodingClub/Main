import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    let errorMessage = res.statusText;
    try {
      const data = await res.json();
      errorMessage = data.message || errorMessage;
    } catch {
      const text = await res.text();
      if (text) errorMessage = text;
    }
    throw new Error(errorMessage);
  }
}

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {};
  
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("token");
  
  // Route ke hisab se token choose karo
  const currentUrl = window.location.pathname;
  
  // Agar admin route hai to adminToken use karo
  if (adminToken && currentUrl.includes('/admin')) {
    headers["Authorization"] = `Bearer ${adminToken}`;
  }
  // Agar user route hai to userToken use karo  
  else if (userToken) {
    headers["Authorization"] = `Bearer ${userToken}`;
  }
  // Fallback
  else if (adminToken) {
    headers["Authorization"] = `Bearer ${adminToken}`;
  }
  
  return headers;
}
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<any> {
  const headers: HeadersInit = {
    ...getAuthHeaders(),
  };

  if (data) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  
  // Try to parse JSON, return empty object if no content
  const text = await res.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    
    const res = await fetch(url, {
      credentials: "include",
      headers: getAuthHeaders(),
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

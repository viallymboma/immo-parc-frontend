import useSWRMutation from 'swr/mutation';

async function fetcher(url: string, { arg }: { arg: { method: string; body?: object } }) {
  const response = await fetch(url, {
    method: arg.method,
    headers: { 'Content-Type': 'application/json' },
    body: arg.body ? JSON.stringify(arg.body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to perform operation');
  }

  return response.json();
}

// Custom hook to accept dynamic URL
export const useDynamicSWRMutationAsssignTask = (url: string) => useSWRMutation(url, fetcher);

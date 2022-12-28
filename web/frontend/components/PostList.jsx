import { useState } from 'react';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function PostList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = useAuthenticatedFetch();
  
  const { data } = useAppQuery({
    url: "/api/blogs",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  return <div>
    { isLoading }
    { JSON.stringify(data?.body?.blogs) }
  </div>
}
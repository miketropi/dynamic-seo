import { useState, useCallback, useEffect } from 'react';
import { Select, TextField } from '@shopify/polaris';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function PostList() {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(0);
  const [blogOpts, setBlogOpts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetch = useAuthenticatedFetch();

  useEffect(() => {
    const __getBlogs = async () => {
      const res = await fetch(`/api/blogs`);
      const responseData = await res.json();

      let _o = [...blogOpts];
      responseData?.body?.blogs.map(o => {
        _o.push({
          value: 0,
          label: "Please select blog"
        })
        _o.push({
          value: o.id,
          label: o.title
        })
      })

      setBlogOpts(_o);
      setIsLoading(false);
      // console.log('___', responseData?.body?.blogs);
    }

    __getBlogs();
  }, [])
  
  const selectChangeHandle = useCallback(value => {
    console.log(value);
    setSelected(value);
  }, []);

  return <div>
    {/* { isLoading }
    { JSON.stringify(data?.body?.blogs) }
    { blogSelected } */}
    <Select
      label="Select Blog Source"
      options={ blogOpts }
      onChange={ selectChangeHandle }
      value={ selected }
    />
  </div>
}
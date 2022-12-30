import { useState, useCallback, useEffect, Fragment } from 'react';
import { Select, Card, ResourceList, ResourceItem, Filters, Thumbnail } from '@shopify/polaris';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function PostList({  }) {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState();
  const [blogOpts, setBlogOpts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const fetch = useAuthenticatedFetch();

  useEffect(() => {
    const __getBlogs = async () => {
      const res = await fetch(`/api/blogs`);
      const responseData = await res.json();

      let _o = [...blogOpts];
      responseData?.body?.blogs.map(o => {
        _o.push({
          value: '',
          label: "Please select blog"
        })
        _o.push({
          value: o.id.toString(),
          label: o.title
        })
      })

      setBlogOpts(_o);
      setIsLoading(false);
      // console.log('___', responseData?.body?.blogs);
    }

    __getBlogs();
  }, [])

  useEffect(() => {
    const __getPosts = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/blog/${ selected }/articles`);
      const responseData = await res.json();

      setPosts(responseData?.body?.articles)
      setIsLoading(false);
    }

    if(selected) __getPosts();
  }, [selected])
  
  const selectChangeHandle = useCallback(value => {
    console.log(value);
    setSelected(value);
  }, []);

  return <div>
    
    {
      (blogOpts.length > 0) &&
      <Select
        label="Select Blog Source"
        options={ blogOpts } 
        onChange={ selectChangeHandle }
        value={ selected }
      />
    }

    {/* { JSON.stringify(posts) } */}
    {
      (posts.length > 0) && 
      <Card>
        <ResourceList
          resourceName={{singular: 'blog post', plural: 'blog posts'}}
          items={ posts }
          selectedItems={ selectedItems }
          onSelectionChange={ setSelectedItems }
          selectable
          renderItem={ item => {
            const { id, url, title, author, image } = item;
            const authorMarkup = author ? <small>by { author }</small> : null;
            const media = <Thumbnail source={ image?.src } alt={ title } />;
            return <ResourceItem
              id={ id }
              url={ url }
              accessibilityLabel={`View details for ${ title }`}
              name={ title }
              media={ media }
              >
              <h3 className="Polaris-TextStyle--variationStrong">{ title }</h3>
              { authorMarkup }
            </ResourceItem>
          } }
        /> 
      </Card>
    }
  </div>
}
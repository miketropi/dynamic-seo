import { Page, Layout } from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import { PostList } from "../components"

export default function Blogposts() {
  return <Page>
    <TitleBar 
      title="Blog Posts"
    />
    <Layout>
      <Layout.Section>
        Hello this is a test...!
        <PostList />
      </Layout.Section>
    </Layout>  
  </Page>
}
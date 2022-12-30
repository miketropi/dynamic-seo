import { Page, Layout } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { PostList } from "../components";

export default function BlogPosts() {
  return <Page>
    <TitleBar 
      title="Blog Posts"
    />
    <Layout>
      <Layout.Section>
        <PostList />
      </Layout.Section>
    </Layout>  
  </Page>
}
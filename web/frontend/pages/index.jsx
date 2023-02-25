import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import { trophyImage } from "../assets";

import { ShortcodesCard } from "../components";
export default function HomePage() {
  return (
    <Page>
      <TitleBar title="Dynamic Seo" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <ShortcodesCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}

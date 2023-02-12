import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Container } from "../components/Container/Container";
import { Link } from "nerdux-ui-system";

import * as styles from "./index.module.scss";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Container>
        <header className={styles.titleHeader}>
          <h1>Lead generator project</h1>
          <Link
            to={"https://nerdux.nerdbord.io/?path=/story/inputs-button--button"}
            target={"_blank"}
          >
            Open UI components documentation
          </Link>
        </header>
      </Container>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;

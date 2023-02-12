import React from "react";
import { PropsWithChildren } from "react";
import * as styles from "./Container.module.scss";

export const Container = (props: PropsWithChildren<{}>) => (
  <div className={styles.container}>{props.children}</div>
);

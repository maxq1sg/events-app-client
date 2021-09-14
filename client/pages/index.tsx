import type { NextPage } from "next";

import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import $api from "../utils/api";

const Home: NextPage = (props) => {
  console.log();
  return <div className={styles.container}>ghj</div>;
};
export async function getServerSideProps() {
  const { data } = await $api.get("/api/events");

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}
export default Home;

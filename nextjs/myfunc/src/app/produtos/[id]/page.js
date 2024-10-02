"use client"

import styles from "../../page.module.css";

import { useParams } from "next/navigation";

export default function Products() {

const params = useParams();

  return (
    <div className={styles.page}>
      <main>
        <h1>Detalhe do Produto #{params.id}</h1>
      </main>
    </div>
  );
}

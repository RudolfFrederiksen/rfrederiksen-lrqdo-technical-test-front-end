import React from "react";
import styles from "./Loader.module.scss";

const Loader = () => (
    <div className={styles.Loader} data-testid="Loader">
        <div className={styles.ldsFacebook}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
);

export default Loader;

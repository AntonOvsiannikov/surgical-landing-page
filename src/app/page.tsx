"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./page.module.scss";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".hero-title", { opacity: 0, y: 40, duration: 0.8, ease: "power3.out" });
      gsap.from(".hero-sub", { opacity: 0, y: 24, duration: 0.8, delay: 0.2, ease: "power3.out" });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={styles.page}>
      <main className={styles.main}>
        <h1 className="hero-title">Surgical Landing Page</h1>
        <p className="hero-sub">Next.js · TypeScript · GSAP · SCSS</p>
      </main>
    </div>
  );
}

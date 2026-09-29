"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import routes from "../../content/routes.json";
import * as pages from "./prototype";

export default function Marketing({ name }) {
  const router = useRouter();
  const frame = useRef(null);
  const route = routes.find(route => route.name === name);
  const View = pages[route.component];
  const go = name => {
    const destination = routes.find(route => route.name === name);
    if (destination) router.push(destination.path);
  };

  useEffect(() => {
    for (const anchor of frame.current.querySelectorAll('a[href^="#"]')) {
      const label = anchor.textContent.trim();
      const fragment = decodeURIComponent(anchor.getAttribute("href").slice(1));
      const target = routes.find(route => fragment === route.name || label === route.name || label.startsWith(route.name + "\n"));
      if (target) anchor.setAttribute("href", target.path);
    }
  }, [name]);

  return <div id="frame" data-w="desktop" ref={frame}>
    <pages.DL.Navbar active={name} onNavigate={go} />
    <View go={go} />
    <pages.DL.Footer />
  </div>;
}

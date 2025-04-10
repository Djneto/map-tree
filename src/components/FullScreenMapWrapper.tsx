"use client";

import dynamic from "next/dynamic";
import MapDrawer from "./MapDrawer";
import FloatingActions from "./FloatingActions";

const FullScreenMap = dynamic(() => import("./FullScreenMap"), { ssr: false });

export default function FullScreenMapWrapper() {
  return (
    <>
      <FullScreenMap />
      <MapDrawer />
      <FloatingActions />
    </>
  );
}

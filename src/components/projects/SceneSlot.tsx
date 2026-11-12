"use client";

import dynamic from "next/dynamic";
import { scenes } from "./scenes";

export function SceneSlot({ slug }: { slug: string }) {
  const load = scenes[slug];
  if (!load) return null;
  const Scene = dynamic(load, { ssr: false });
  return (
    <div className="my-10">
      <Scene />
    </div>
  );
}

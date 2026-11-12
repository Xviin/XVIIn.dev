"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { scenes } from "./scenes";

// Built once at module load so components are not recreated on every render.
const loaded: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(scenes).map(([slug, load]) => [slug, dynamic(load, { ssr: false })]),
);

export function SceneSlot({ slug }: { slug: string }) {
  const Scene = loaded[slug];
  if (!Scene) return null;
  return (
    <div className="my-10">
      <Scene />
    </div>
  );
}

'use client'

import { buildGraph, safeStringify } from "@/lib/metadata";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function StructuredData() {
  const pathname = usePathname() || '/';

  const graph = useMemo(() => buildGraph(pathname), [pathname]);
  if (!graph.length) return null;

  const jsonLd = { '@context': 'https://schema.org', '@graph': graph };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: safeStringify(jsonLd) }}
    />
  );
}

"use client";
export const dynamic = "force-dynamic";

import { WatchClient } from "@/components";
import React, { Suspense } from "react";

export default function WatchPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading video...</div>}>
      <WatchClient />
    </Suspense>
  );
}

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import JsonBox from "@/components/dev/JsonBox";

export const DevMenu = ({ session, children }: { session?: any; children?: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="fixed bg-background bottom-0 right-0 m-4 max-w-sm">
      {expanded && (
        <div className="transition-all flex flex-col gap-2 border shadow p-3 rounded-md ease-in-out max-h-[85vh] overflow-scroll">
          {children}

          <JsonBox data={session} />
        </div>
      )}

      <div className="p-2 w-full flex justify-end">
        <Button size={"sm"} onClick={() => setExpanded(!expanded)}>
          {expanded ? "Collapse" : "Expand"}
        </Button>
      </div>
    </div>
  );
};

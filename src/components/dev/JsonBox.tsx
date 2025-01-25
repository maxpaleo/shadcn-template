"use client";
import { githubDarkTheme, JsonEditor } from "json-edit-react";
import React from "react";

type JsonBoxProps = {
  data: any;
  collapse?: number;
};

function JsonBox({ data, collapse }: JsonBoxProps) {
  const [jsonData, setJsonData] = React.useState(data);

  return (
    <div className="flex flex-col gap-4 border rounded-lg">
      <JsonEditor
        className="text-xs"
        data={jsonData ?? {}}
        indent={2}
        collapse={collapse ?? 1}
        theme={githubDarkTheme}
        rootFontSize={13}
        setData={setJsonData} // optional
        //   {...otherProps}
      />
    </div>
  );
}

export default JsonBox;

"use client";

import useIndexedDB from "@/customHooks/useIndexedDB";
import SandpackEditor from "./SandpackEditor";
import { useEffect, useState } from "react";

export default function PreSandpackEditor({template}) {
    const { db, getItem } = useIndexedDB("TryEditorDB", 1, "editorState");
    const [files, setFiles] = useState(null);

    useEffect(() => {
      if (db) {
  
        getItem(template)
          .then((result) => {
            console.log("fetched result from indexeddb: ", result.value);
            let temp = result.value.files;
            
            Object.entries(temp).forEach(([, content]) => {
              content.active = false;
              content.hidden = false;
              content.readonly = false;
            })
            console.log("updated files: ", temp);
            setFiles(temp);
            
          })
            .catch((error) => {
                setFiles({});
            console.log("error from indexed db: ", error);
          });
      }
    }, [db]);
      
    console.log("Files from pre: ", files);
    return <>
        {files && <SandpackEditor template={template} files={files} />}
    </>
}
"use client";
import { Editor } from "@monaco-editor/react";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";



export default function NormalEditor({ setCode, lang, value }) {
    const [editorRef, setEditorRef] = useState();


 
      const handleMount = useCallback((editor) => {
setEditorRef(editor);
      });

      const handleChange = useCallback((value) => {
        setCode(value);
      })

     
    
  return (
    <div className="w-1/3">
        <Editor
        onMount={handleMount}
        onChange={handleChange}
        height="50vh"
        theme="vs-dark" 
        defaultLanguage={lang}
        defaultValue={value}
        />
    </div>
  )
}



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
      <div className="flex flex-col bg-black ">
        <p className="text-black  w-fit p-1 text-sm px-2 my-2 rounded-md bg-green-500">{lang.toUpperCase()}</p>
      <Editor
        onMount={handleMount}
        onChange={handleChange}
        height="50vh"
        theme="vs-dark" 
        defaultLanguage={lang}
        defaultValue={value}
        />
      </div>
       
    </div>
  )
}



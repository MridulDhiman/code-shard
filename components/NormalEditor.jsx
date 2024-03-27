"use client";
import { Editor } from "@monaco-editor/react";
import { emmetCSS, emmetHTML, emmetJSX } from "emmet-monaco-es";
import { useCallback, useEffect, useState } from "react";




export default function NormalEditor({ setCode, lang, value, readOnly }) {
    const [editorRef, setEditorRef] = useState();

    useEffect(()=>  {
if(!editorRef) {
  return;
}

editorRef.updateOptions({readOnly});
    } , [editorRef, readOnly]);

 
      const handleMount = useCallback((editor) => {
        if(lang === 'html') {
          emmetHTML(window.monaco);
        }

        if(lang === 'css') {
          emmetCSS(window.monaco);
        }

        if(lang === 'javascript') {
           emmetJSX(window.monaco);
        }
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



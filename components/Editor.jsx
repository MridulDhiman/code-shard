"use client";
import * as Y from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import { useRoom } from "@/liveblocks.config";
import { Editor } from "@monaco-editor/react";
import { MonacoBinding } from "y-monaco";
import { useCallback, useEffect, useState } from "react";
import Cursors from "./Cursors";


export default function CollaborativeEditor({ setCode, lang }) {
    const room = useRoom();
    const [provider, setProvider] = useState();
    const [editorRef, setEditorRef] = useState();
    const [lostFocus, setLostFocus] = useState(false);

  

    useEffect(() => {
if(editorRef) {
  editorRef.onDidBlurEditorWidget(()=>{
    console.log('blur event triggered');
    setLostFocus(true);
})

editorRef.onDidFocusEditorWidget(()=>{
  console.log("Focus event triggerd !");
  setLostFocus(false);
})
}
    }, [editorRef])

    useEffect(() => {
        let yProvider;
        let yDoc;
        let binding;
    
        if (editorRef) {
          yDoc = new Y.Doc();
          const yText = yDoc.getText("monaco");
          yProvider = new LiveblocksProvider(room, yDoc);
          setProvider(yProvider);
    
          // Attach Yjs to Monaco
          binding = new MonacoBinding(
            yText,
            editorRef.getModel(),
            new Set([editorRef]),
            yProvider.awareness,
          );
        }
    
        return () => {
          yDoc?.destroy();
          yProvider?.destroy();
          binding?.destroy();
        };
      }, [editorRef, room]);

      // set editor instance
      const handleMount = useCallback((editor) => {
setEditorRef(editor);
      });

      const handleChange = useCallback((value) => {
        setCode(value);
      })


      
    
  return (
    <div className="w-1/3">
        {/* {  provider  ? <Cursors resetFlag={lostFocus} yProvider={provider}/> : null} */}
        <Editor
        onMount={handleMount}
        onChange={handleChange}
        height="50vh"
        theme="vs-dark" 
        defaultLanguage={lang}
        defaultValue="console.log('Hello World');" 
        />
    </div>
  )
}



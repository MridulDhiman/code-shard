"use client";
import { Doc } from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import { useRoom } from "@/liveblocks.config";
// import { MonacoBinding } from "y-monaco";
import { useCallback, useEffect, useState } from "react";
import Cursors from "./Cursors";
// import { emmetCSS, emmetHTML, emmetJSX } from "emmet-monaco-es";
import SandpackEditor from "./SandpackEditor";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { yCollab } from "y-codemirror.next";
import { SandpackCodeEditor } from "@codesandbox/sandpack-react";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";




const  CollaborativeSandpackEditor = ({  }) => {
    const room = useRoom();
    const [element, setElement] = useState();

    const ref = useCallback((node) => {
        if (!node) return;
        if(node && node instanceof HTMLElement) {
            setElement(node);
        }
      }, []);
    


    useEffect(() => {
        let provider;
        let yDoc;
        let view;
    
        if (!element || !room) {
            return;
          }
      

          // create new ydoc
          yDoc = new Doc();
          provider = new LiveblocksProvider(room, yDoc);
          const ytext = yDoc.getText("codemirror");

          const state = EditorState.create({
            doc: ytext.toString(),
            extensions: [
              basicSetup,
              javascript(),
              yCollab(ytext, provider.awareness),
            ],
          });

           // Attach CodeMirror to element
    view = new EditorView({
        state,
        parent: element,
      });
      


        return () => {
            yDoc?.destroy();
            provider?.destroy();
            view?.destroy();
        };
      }, [element, room]);


      const handleChange = useCallback((value) => {
        setCode(value);
      })


      
    
  return (
   <>
      {/* {provider ? <Cursors yProvider={provider} /> : null} */}
            <SandpackCodeEditor 
            //  showLineNumbers={true}
            //  showRunButton={true}
             closableTabs
             showTabs
             style={{ height: "100vh" }}
             extensions={[autocompletion()]}
             extensionsKeymap={[completionKeymap]} 
            ref={ref} />
   </>
  )
}



export default CollaborativeSandpackEditor;
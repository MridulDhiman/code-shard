import Editor from "@monaco-editor/react";
import {
  useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack
} from "@codesandbox/sandpack-react";
import { Doc } from "yjs";
import { useCallback, useEffect, useState } from "react";
import { useRoom } from "@/liveblocks.config";
import { MonacoBinding } from "y-monaco";
import LiveblocksProvider from "@liveblocks/yjs";
import Cursors from "./Cursors";
 
export default function MonacoEditor() {
  const { sandpack } = useSandpack();
  const {files, activeFile, updateCurrentFile} = sandpack;
  
const code = files[activeFile].code;

console.log(files, activeFile);
  
  const room = useRoom();
  
    const [provider, setProvider] = useState();
    const [editorRef, setEditorRef] = useState();
    

    useEffect(() => {
        let yProvider;
        let yDoc;
        let binding;
    
        if (editorRef) {  
          yDoc = new Doc();
          const yText = yDoc.getText(`monaco-${activeFile}`); 
          yText.insert(0, code);
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
      }, [editorRef, activeFile, room]);

      // set editor instance
      const handleMount = useCallback((editor) => {
setEditorRef(editor);
      });


      const handleChange = useCallback((value)=> {
              updateCurrentFile(value);
      });
    


 
  return (
    <SandpackStack style={{ height: "100vh", margin: 0 }}>
      <FileTabs />
        {provider ? <Cursors yProvider={provider} /> : null}
      <div style={{ flex: 1, background: "#1e1e1e" }}>
        <Editor
        key={activeFile}
          width="100%"
          height="100%"
          language="javascript"
          theme="vs-dark"
          onMount={handleMount}
          defaultValue={code}
          onChange={handleChange}
        />
      </div>
    </SandpackStack>
  );
}
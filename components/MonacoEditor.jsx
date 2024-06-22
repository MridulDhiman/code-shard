import Editor from "@monaco-editor/react";
import {
  // useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack
} from "@codesandbox/sandpack-react";
// import { Doc } from "yjs";
import { useCallback, useEffect, useState } from "react";
// import { useRoom } from "@/liveblocks.config";
// import { MonacoBinding } from "y-monaco";
// import LiveblocksProvider from "@liveblocks/yjs";
// import Cursors from "./Cursors";

 
export default function MonacoEditor({}) {
  const { sandpack } = useSandpack();
  const {files, activeFile, updateCurrentFile} = sandpack;
  
const code = files[activeFile]?.code || "";

// console.log(files, activeFile);
  
//   const room = useRoom();
//     const [provider, setProvider] = useState();
//     const [editorRef, setEditorRef] = useState();
    

//     useEffect(() => {
//         let yProvider;
//         let yDoc;
//         let binding;
    
//         if (editorRef) {  
//             console.log("Editor ref")
//           yDoc = new Doc();
//           let yText = yDoc.getText("monaco"); 
//           if(yText.length ===  0) {
//               yText.insert(0, code);
//           }
//           yProvider = new LiveblocksProvider(room, yDoc);
        
//           setProvider(yProvider);
    
//           // Attach Yjs to Monaco
//           binding = new MonacoBinding(
//             yText,
//             editorRef.getModel(),
//             new Set([editorRef]),
//             yProvider.awareness,
//           );
//         }
    
//         return () => {
//           yDoc?.destroy();
//           yProvider?.destroy();
//           binding?.destroy();
//         };
//       }, [editorRef, activeFile, files, room]);

//       // set editor instance
//       const handleMount = useCallback((editor) => {
// setEditorRef(editor);
//       });


      const handleChange = useCallback((value)=> {
              updateCurrentFile(value, true);
      });
    


 
  return (
    <SandpackStack style={{ height: "100vh", margin: 0 }}>
      <FileTabs />
        {/* {provider ? <Cursors yProvider={provider} /> : null} */}
      <div style={{ flex: 1, background: "#1e1e1e" }}>
        <Editor
        key={activeFile}
          width="100%"
          height="100%"
          // language="javascript"
          theme="vs-dark"
          defaultValue={code}
          onChange={handleChange}
        />
      </div>
    </SandpackStack>
  );
}
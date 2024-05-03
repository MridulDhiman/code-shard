"use client";

import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackCodeEditor, 
  SandpackFileExplorer, 
  SandpackPreview
} from "@codesandbox/sandpack-react";

export default () => (
  <SandpackProvider template="vanilla">
    <SandpackLayout>
      <div className="flex flex-col">
      <div className="grid grid-cols-2">
      <SandpackFileExplorer />
      <SandpackCodeEditor />
      </div>
      <SandpackPreview/>
      </div>
     

    </SandpackLayout>
  </SandpackProvider>
);

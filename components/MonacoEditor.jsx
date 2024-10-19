import Editor, { useMonaco } from "@monaco-editor/react";
import {
  SandpackStack,
  FileTabs,
  useSandpack
} from "@codesandbox/sandpack-react";
import { useCallback, useEffect, useState } from "react";
import useStorageHandler from "@/customHooks/useStorageHandler";


export function snakeCase(fname) {
  return fname.toLowerCase().replace(/[_() ]/g, "-");
}
export default function MonacoEditor({  theme, template, readOnly = false }) {
  const { sandpack } = useSandpack();
  const { files, activeFile, updateCurrentFile, closeFile } = sandpack;
  const monaco = useMonaco();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const { worker, initializeTemplate, saveFile } = useStorageHandler();
  const [editor, setEditor] = useState();



  useEffect(() => {
    if (files) {
      Object.entries(files).forEach(([path, content]) => {   
        if (path !== activeFile) {
          closeFile(path);
        }
      
      });
    }
  }, [files]);

  useEffect(() => {
    if (!template) {
      return;
    }

    if (worker) {
      initializeTemplate(template, files);
    }
  }, [template, worker, files]);

  useEffect(() => {
    if (monaco && theme !== "vs-dark" && theme !== "light") {
      import(`monaco-themes/themes/${theme}.json`)
        .then((data) => {
          monaco.editor.defineTheme(snakeCase(theme), data);
          setIsThemeLoaded(true);
        })
        .then((_) => monaco.editor.setTheme(snakeCase(theme)));
    }
  }, [monaco, theme]);

  useEffect(() => {
    if (editor) {
      editor.updateOptions({ readOnly });
    }
  }, [editor, readOnly]);

  const code = files[activeFile]?.code || "";
  const handleChange = useCallback((value) => {
    updateCurrentFile(value, true);
    saveFile(activeFile, template, value);
  });

  const handleMount = useCallback((node) => {
    setEditor(node);
  });

  const jsTypes = ["js", "jsx"];
  const tsTypes = ["ts", "tsx"];
  const arr = activeFile.split(".");
  const ext = arr[arr.length - 1];
  const fileType = jsTypes.includes(ext)
    ? "javascript"
    : tsTypes.includes(ext)
      ? "typescript"
      : ext === "html"
        ? "html"
        : ext === "css"
          ? "css"
          : ext === "json"
            ? "json"
            : null;

  return (
    <SandpackStack style={{ height: "100vh", margin: 0 }}>
      <FileTabs />
      <div style={{ flex: 1, background: "#1e1e1e" }}>
        <Editor
          key={activeFile}
          width="100%"
          height="100%"
          language={fileType}
          theme={
            theme === "vs-dark" || theme === "light"
              ? theme
              : isThemeLoaded
                ? theme
                : "vs-dark"
          }
          defaultValue={code}
          onChange={handleChange}
          onMount={handleMount}
        />
      </div>
    </SandpackStack>
  );
}

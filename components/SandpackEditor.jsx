"use client";



import {
  SandpackProvider,
  SandpackPreview,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackStack,
  useSandpack,
} from "@codesandbox/sandpack-react";


import { atomDark } from "@codesandbox/sandpack-themes";
import { useEffect, useRef, useState } from "react";
import File from "./ui/icons/File";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";

import React from "react";
import Package from "./ui/icons/Package";
import Block from "./ui/icons/Block";




export default function SandpackEditor({ template = "react-ts" }) {
  const [domLoaded, setDomLoaded] = useState(false);
  const fileExplorer = useRef();
  const [newfileClicked, setFileClicked] = useState(false);
  const [newfolderClicked, setFolderClicked] = useState(false);
  const [dependencies, setDependencies] = useState({});
  const [devDependencies, setDevDependencies] = useState({});
  const [files, setFiles] = useState({});
  const [currentFolder, setCurrentFolder] = useState("");
  
  
  useEffect(() => {
    setDomLoaded(true);
  }, [domLoaded]);

  if (!domLoaded) {
    return <>Loading...</>;
  }
  const addNewFile = (fileName, fileCode = "") => {
    const filePath = `${currentFolder}/${fileName}`;
    setFiles((prev) => {
      return {
        ...prev,
        [`${filePath}`]: fileCode,
      };
    });
  };

  const addNewDependency = (dependencyName) => {
    setDependencies((prev) => {
      return {
        ...prev,
        [`${dependencyName}`]: "latest",
      };
    });
  };

  const addNewDevDependency = (dependencyName) => {
    setDevDependencies((prev) => {
      return {
        ...prev,
        [`${dependencyName}`]: "latest",
      };
    });
  };

  console.log(files);
  return (
    <>
      <SandpackProvider
        files={files}
        template={template}
        theme={atomDark}
        customSetup={{
          dependencies,
          devDependencies,
        }}
      >
        <SandpackLayout>
          <div>
            <SandpackStack>
              <div className="flex gap-2 ">
                <File
                  onClick={() => {
                    const fileName = prompt("Enter File Name: ");

                    addNewFile(fileName);
                  }}
                  className={"size-4 cursor-pointer"}
                />
                <Package
                  onClick={() => {
                    const dependencyName = prompt("Add new dependency");
                    addNewDependency(dependencyName);
                  }}
                  className={"size-4 cursor-pointer"}
                />
                <Block
                  onClick={() => {
                    const dependencyName = prompt("Add new dev. dependency");
                    addNewDevDependency(dependencyName);
                  }}
                  className={"cursor-pointer"}
                />
              </div>
            </SandpackStack>
            <SandpackFileExplorer/>
          </div>
          <SandpackCodeEditor
            showLineNumbers={true}
            showRunButton={true}
            closableTabs
            showTabs
            style={{ height: "100vh" }}
            extensions={[autocompletion()]}
            extensionsKeymap={[completionKeymap]}
            
          />
          <SandpackPreview
            showRefreshButton={false}
            showOpenInCodeSandbox={false}
            style={{ height: "100vh" }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </>
  );
}

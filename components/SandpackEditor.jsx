"use client";



import {
  SandpackProvider,
  SandpackPreview,
  SandpackFileExplorer,
  SandpackLayout,
  // SandpackCodeEditor,
  SandpackStack,
  useSandpack
} from "@codesandbox/sandpack-react";

import sonner, { Toaster, toast } from "sonner";


import { atomDark } from "@codesandbox/sandpack-themes";
import { useEffect, useRef, useState } from "react";
import File from "./ui/icons/File";
// import { autocompletion, completionKeymap } from "@codemirror/autocomplete";

import React from "react";
import Package from "./ui/icons/Package";
import Block from "./ui/icons/Block";
import { useModal } from "@/customHooks/useModal";
import MonacoEditor from "./MonacoEditor.jsx";
import Button from "./ui/Button";
import { saveTemplateToDB } from "@/lib/actions";


export default function SandpackEditor({ id=null, shardDetails=null, template = "react", shard }) {
  const [domLoaded, setDomLoaded] = useState(false);
  const [dependencies, setDependencies] = useState({});
  const [devDependencies, setDevDependencies] = useState({});
  const [files, setFiles] = useState({});
  // const [currentFolder, setCurrentFolder] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  useModal(isModalOpen,setIsModalOpen,modalRef);
 


  useEffect(() => {
    setDomLoaded(true);
  }, [domLoaded]);

  if (!domLoaded) {
    return <>Loading...</>;
  }
  const addNewFile = (fileName, fileCode = "") => {
    const filePath = `/${fileName}`;
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
        <SandpackSidebar id={id} template={template} addNewFile={addNewFile} addNewDependency={addNewDependency} addNewDevDependency={addNewDevDependency} />
         {/* <MonacoCollaborativeEditor template={template}/> */}
         <MonacoEditor/>
          <SandpackPreview
            // showRefreshButton={false}
            showOpenInCodeSandbox={false}
            showOpenNewtab={true}
            style={{ height: "100vh" }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </>
  );
}

function SandpackSidebar({template, addNewFile, addNewDependency, addNewDevDependency, id }) {
  const {sandpack} = useSandpack();
  const { files } = sandpack;


  const handleSave = async () => {
    console.log(files, id);

    try {
      const {status}  = await saveTemplateToDB(id, files);  
      console.log(status);

      if(status === 500) {
        toast.error("Could not save shard. Try Again!")
      }
      else {
        // window.alert("Shard Updated Successfully")
        toast.info("Shard saved successfully.")
      }
    } catch (error) {
      console.log("error occurred", error);
    }

  }

  return <>
   <div
            className="w-[15%] flex flex-col">
              <Toaster/>
            <SandpackStack>
              <div className="flex gap-2 mb-4 p-1">
                <p className="text-lg pr-4 pl-2 font-['Josh', sans-serif]">{template}</p>
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
                <Button onClick={handleSave}>Save</Button>
              </div>
            </SandpackStack>
            <SandpackFileExplorer style={{height: "92vh"}}  />
          </div>
  </>
}
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

import  { Toaster, toast } from "sonner";


import { atomDark } from "@codesandbox/sandpack-themes";
import { useEffect, useRef, useState, useCallback } from "react";
import File from "./ui/icons/File";
// import { autocompletion, completionKeymap } from "@codemirror/autocomplete";

import React from "react";
import Package from "./ui/icons/Package";
import Block from "./ui/icons/Block";
import { useModal } from "@/customHooks/useModal";
import MonacoEditor from "./MonacoEditor.jsx";
import Button from "./ui/Button";
import { saveTemplateToDB } from "@/lib/actions";
import { makeFilesAndDependenciesUIStateLike } from "@/utils";
import { ScaleLoader } from "react-spinners";
import { useSession } from "next-auth/react";


export default function SandpackEditor({ id, shardDetails: initialShardDetails, template = "react", shard }) {
  const [shardDetails, setShardDetails] = useState(null);
  const [domLoaded, setDomLoaded] = useState(false);
  const [dependencies, setDependencies] = useState({});
  const [devDependencies, setDevDependencies] = useState({});
  const [files, setFiles] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  useModal(isModalOpen,setIsModalOpen,modalRef);
 
  useEffect(()=> {
    if(initialShardDetails) {
      const data = JSON.parse(initialShardDetails);
      console.log(data);
     const [f, dep, devDep] = makeFilesAndDependenciesUIStateLike(data.files, data.dependencies);
     setFiles(f);
     setDependencies(dep);
     setDevDependencies(devDep);
      setShardDetails(data);
    }
    else {
      setFiles({});
      setShardDetails(null);
      setDependencies({});
      setDevDependencies({});
    }
  }, [initialShardDetails])


  useEffect(() => {

    if(!domLoaded) {
      setDomLoaded(true);
    }
  }, [domLoaded]);


  if (!domLoaded) {
    return <><ScaleLoader/></>;
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
        <SandpackSidebar id={id} template={template} addNewFile={addNewFile} dependencies={dependencies} devDependencies={devDependencies} addNewDependency={addNewDependency} addNewDevDependency={addNewDevDependency} />
         <MonacoEditor/>
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showOpenNewtab={true}
            style={{ height: "100vh" }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </>
  );
}

function SandpackSidebar({template, addNewFile, dependencies, devDependencies, addNewDependency, addNewDevDependency, id }) {
  const {sandpack} = useSandpack();
  const {data: session} = useSession();
  console.log("Sandpacksidebar: ", session);

  const { files } = sandpack;


  const handleSave = async () => {

    console.log(files, id);
    if(session?.user) {
      try {
        const userName = session?.name;
        const {status}  = await saveTemplateToDB(id, files , dependencies, devDependencies, session?.user?.name);  
        console.log(status);
  
        if(status === 500) {
          toast.error("Could not save shard. Try Again!")
        }
        else if(status === 200) {
          // window.alert("Shard Updated Successfully")
          toast.info("Shard saved successfully.")
        }
      } catch (error) {
        console.log("error occurred", error);
      }

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
              {id &&  <Button onClick={handleSave}>Save</Button> }
              </div>
            </SandpackStack>
            <SandpackFileExplorer style={{height: "92vh"}}  />
          </div>
  </>
}
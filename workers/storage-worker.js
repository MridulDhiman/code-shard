import { compressData, decompressData } from "@/lib/utils";

self.onmessage = function (e) {
  const { status,  action, fileId, content, files, template, error } = e.data;

  
    switch (action) {
      case "save":
        handleSave(fileId, template, content);
        break;
      case "init":
        initializeTemplate(template, files);
        break;
    } 
  
  
  if (status && status === "success") {
    handleSuccess(action, template, fileId);
  }
  else if(status && status === "error") {
    handleError(action, template, fileId, error);
  }
};

function handleError(action, template, fileId, error) {
  const saveErrorMessageLiteral = action === "save" && `, File ID: ${fileId}`;
      console.error(`Error ${error}, Action ${action}, Template ${template}${saveErrorMessageLiteral}`)
}

function handleSuccess(action, template, fileId) {
  const saveSuccessMessageLiteral = action === "save" && `, File ID: ${fileId}`;
      console.error(`Action ${action}, Template ${template}${saveSuccessMessageLiteral}`)
}


function handleSave(fileId, template, content) {
  try {
    
    const globalState = localStorage.getItem("try-editor");
    if (!globalState) {
      throw new Error("Could not find `try-editor` key in the local storage.");
    }
    let { state } = globalState;
    console.log("State: ", state);
    const ind = state.findIndex((st) => st.template === template);
    if (ind === -1) {
      throw new Error(`Could not find template ${template}.`);
    }
    let { files } = state[ind];
    const decompressedFiles = JSON.parse(decompressData(files));
    console.log("Decompressed Files: ", decompressedFiles);
    decompressedFiles[fileId] = content;
    state[ind].files = compressData(JSON.stringify(decompressedFiles));
    self.postMessage({ status: "success", action: "save", fileId, template });
  } catch (error) {
    self.postMessage({
      status: "error",
      action: "save",
      template, 
      fileId, 
      error: error.message,
    });
  }
}

function initializeTemplate(template, files) {
  try {
    const content = compressData(JSON.stringify(files));
    const globalState = localStorage.getItem("try-editor");
    if (!globalState) {
      throw new Error("Could not find `try-editor` key in the local storage.");
    }

    console.log("global state: ", globalState);
    const { state } = JSON.parse(globalState);

    const ind = state.findIndex((el) => el.template === template);
    if (ind === -1) {
      state.push({
        template,
        files: content,
      });
    } else {
      throw new Error(`Template ${template} already initialized`);
    }
    self.postMessage({ status: "success", action: "init", template });
  } catch (error) {
    self.postMessage({
      status: "error",
      action: "init",
      template,
      error: error.message,
    });
  }
}


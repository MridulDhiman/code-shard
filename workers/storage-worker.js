let db;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("TryEditorDB", 1);

    request.onerror = (event) =>
      reject("IndexedDB error: " + event.target.error);

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      db.createObjectStore("editorState", { keyPath: "key" });
    };
  });
}

// Get data from IndexedDB
function getFromDB(key) {
  return new Promise((resolve, reject) => {
    const transaction = db?.transaction(["editorState"], "readonly");
    const objectStore = transaction.objectStore("editorState");
    console.log(key);
    const request = objectStore.get(key);

    request.onerror = (event) =>
      reject("Error fetching data: " + event.target.error);
    request.onsuccess = (event) =>
      resolve(request.result ? request.result.value : null);
  });
}

// Save data to IndexedDB
function saveToDB(key, value) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["editorState"], "readwrite");
    const objectStore = transaction.objectStore("editorState");
    const request = objectStore.put({ key, value });

    request.onerror = (event) =>
      reject("Error saving data: " + event.target.error);
    request.onsuccess = () => resolve();
  });
}

// Initialize the database connection
openDB()
  .then(() => {
    console.log("IndexedDB connection established");
  })
  .catch((error) => {
    console.error("Failed to open IndexedDB:", error);
  });

self.onmessage = async function (e) {
  const { status, action, fileId, content, files, template, error } = e.data;
  console.log("data received: ", e.data);

  switch (action) {
    case "save":
      await handleSave(fileId, template, content);
      break;
    case "init":
      await initializeTemplate(template, files);
      break;
  }

  if (status && status === "success") {
    handleSuccess(action, template, fileId);
  } else if (status && status === "error") {
    handleError(action, template, fileId, error);
  }
};

function handleError(action, template, fileId, error) {
  const saveErrorMessageLiteral = action === "save" && `, File ID: ${fileId}`;
  console.error(
    `Error ${error}, Action ${action}, Template ${template}${saveErrorMessageLiteral}`,
  );
}

function handleSuccess(action, template, fileId) {
  const saveSuccessMessageLiteral = action === "save" && `, File ID: ${fileId}`;
  console.error(
    `Action ${action}, Template ${template}${saveSuccessMessageLiteral}`,
  );
}

async function handleSave(fileId, template, content) {
  console.log("hello hello");
  try {
    const alreadyTemplate = await getFromDB(template);
    if (!alreadyTemplate) {
      throw new Error(`Could not find ${template} template`);
    }
    let { files } = alreadyTemplate;
    console.log("Files: ", files, typeof files);
    files[fileId].code = content;
    console.log(files[fileId]);
    console.log("After changes: Files: ", files);
    await saveToDB(template, { files });
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

async function initializeTemplate(template, files) {
  console.log("we reaching till the end...");
  try {
    const alreadyTemplate = await getFromDB(template);
    if (alreadyTemplate) {
      throw new Error(`Template ${template} already created`);
    }

    await saveToDB(template, { files });

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

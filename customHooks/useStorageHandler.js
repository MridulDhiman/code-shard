"use client";
import { useState, useEffect, useCallback } from "react";

export default function useStorageHandler() {
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const myWorker = new Worker(
      new URL("../workers/storage-worker.js", import.meta.url),
    );
    setWorker(myWorker);

    return () => {
      myWorker.terminate();
    };
  }, []);

  const saveFile = (fileId, template, content) => {
    if (worker) {
      console.log("worker found at save action");
      worker.postMessage({ action: "save", fileId, template, content });
    }
  };

  const initializeTemplate = (template, files) => {
    console.log("nothing is working here in the initializeTemplate() function");
    if (worker) {
      console.log("worker found at init");
      worker.postMessage({ action: "init", template, files });
    }
  };

  return {
    saveFile,
    initializeTemplate,
    worker,
  };
}

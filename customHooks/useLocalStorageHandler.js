"use client";
import { useState, useEffect } from "react";
import storageWorker from "@/workers/storage-worker.js";

let worker = null;

if (typeof window !== "undefined") {
  if (!worker) {
    worker = new Worker(storageWorker);
  }
}

export function useLocalStorageHandler() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!worker) return;

    const handleMessage = (e) => {
      setResult(e.data);
    };

    worker.addEventListener("message", handleMessage);

    return () => {
      worker.removeEventListener("message", handleMessage);
    };
  }, []);

  const saveFile = (fileId, template, content) => {
    if (worker) {
      worker.postMessage({ action: "save", fileId, template, content });
    }
  };

  const loadFile = (template, fileId) => {
    if (worker) {
      worker.postMessage({ action: "load", template, fileId });
    }
  };

  const deleteFile = (template, fileId) => {
    if (worker) {
      worker.postMessage({ action: "delete", fileId, template });
    }
  };

  const listFiles = (template) => {
    if (worker) {
      worker.postMessage({ action: "list", template });
    }
  };


  const initializeTemplate = (template, files) => {
    if (worker) {
      worker.postMessage({ action: "init", template, files });
    }
  }

  return { saveFile, loadFile, deleteFile, listFiles, result, initializeTemplate };
}

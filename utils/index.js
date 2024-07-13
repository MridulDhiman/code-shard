import clsx from "clsx";

import { twMerge } from "tailwind-merge";

// nice
export default function cn(...inputs) {
    return twMerge(clsx(inputs));
}


export const writeToClipboard = (text) => {
navigator.clipboard.writeText(`${text}`);
}

export const FOLLOWED = "followed";
export const NOT_FOLLOWED = "not followed";
export const templates = ["static", "angular", "react", "react-ts", "solid", "svelte", "test-ts", "vanilla-ts", "vanilla", "vue", "vue-ts", "node", "nextjs" ,"astro", "vite", "vite-react", "vite-react-ts"];

export  const SANDBOX_TEMPLATES = {
    static: {
        files: {
            "/index.html": {
                code: ""
            },
            "/package.json": {
                code: ""
            },
            "/styles.css": {
                code: ""
            },
        },
        main: "",
        environment: ""
    },
    angular: {
        files: {
            "/src/app/app.component.css": {
                code: ""
            },
            "/src/app/app.component.html": {
                code: ""
            },
            "/src/app/app.component.ts": {
                code: ""
            },
            "/src/app/app.module.ts": {
                code: ""
            },
            "/src/index.html": {
                code: ""
            },
            "/src/main.ts": {
                code: ""
            },
            "/src/polyfills.ts": {
                code: ""
            },
            "/package.json": {
                code: ""
            },
        },
        main: "",
        environment: ""
    },
    react: {
        files: {
            "/App.js": {
                code: ""
            },
            "/index.js": {
                code: ""
            },
            "/public/index.html": {
                code: ""
            },
            "/package.json": {
                code: ""
            },
            "/styles.css": {
                code: ""
            },
        },
        main: "",
        environment: ""
    },
    "react-ts": {
        files: {
            "tsconfig.json": {
                code: ""
            },
            "/App.tsx": {
                code: ""
            },
            "/index.tsx": {
                code: ""
            },
            "/public/index.html": {
                code: ""
            },
            "/package.json": {
                code: ""
            },
            "/styles.css": {
                code: ""
            },
        },
        main: "",
        environment: ""
    },
    solid: {
        files: {
            "/App.tsx": {
                code: ""
            },
            "/index.tsx": {
                code: ""
            },
            "/index.html": {
                code: ""
            },
            "/package.json": {
                code: ""
            },
            "/styles.css": {
                code: ""
            },
        },
        main: "",
        environment: ""
    },
    svelte: {
        files: {
            "/App.svelte": {
                code: ""
            },
            "/index.js": {
                code: ""
            },
            "/public/index.html": {
                code: ""
            },
            "/package.json": {
                code: ""
            },
            "/styles.css": {
                code: ""
            },
        },
        main: "",
        environment: ""
    },
    "test-ts": {
        files: {
            "tsconfig.json": {
                code: ""
            },
            "/add.ts": {
                code: ""
            },
            "/add.test.ts": {
                code: ""
            },
            "package.json": {
                code: ""
            },
        },
        main: "",
        environment: "",
        mode: ""
    },
    "vanilla-ts": {
        files: {
            "tsconfig.json": {
                code: ""
            },
            "/index.ts": {
                code: ""
            },
            "/index.html": {
                code: ""
            },
            "/package.json": {
                code: ""
            },
            "/styles.css": {
                code: ""
            },
        },
        main: "",
        environment: ""
    },
    vanilla: {
        files: {
            "/index.js": {
                code: ""
            },
            "/index.html": {
                code: ""
            },
            "/package.json": {
                code: ""
            },
            "/styles.css": {
                code: ""
            },
        },
        main: "",
        environment: ""
    },
    vue: {
        files: {
            "/src/styles.css": {
                code: ""
            },
            "/src/App.vue": {
                code: ""
            },
            "/src/main.js": {
                code: ""
            },
            "/public/index.html": {
                code: ""
            },
            "/package.json": {
                code: ""
            },
        },
        main: "",
        environment: ""
    },
    "vue-ts": {
        files: {
            "/src/styles.css": {
                code: ""
            },
            "/src/App.vue": {
                code: ""
            },
            "/src/main.ts": {
                code: ""
            },
            "/src/shims-vue.d.ts": {
                code: ""
            },
            "/public/index.html": {
                code: ""
            },
            "/package.json": {
                code: ""
            },
            "/tsconfig.json": {
                code: ""
            },
        },
        main: "",
        environment: ""
    },
    node: {
        files: {
            "/index.js": {
                code: ""
            },
            "/package.json": {
                code: ""
            },
        },
        main: "",
        environment: ""
    },
    nextjs: {
        files: {
            "/pages/_app.js": {
                code: ""
            },
            "/pages/index.js": {
                code: ""
            },
            "/next.config.js": {
                code: ""
            },
            "/package.json": {
                code: ""
            },
            "/styles.css": {
                code: ""
            },
        },
    }
}

export const makeFilesAndDependenciesUIStateLike = (fileContent, dependencyContent) => {
    const nonDevDependenices = {};
    const devDependencies = {};
    const files = {};

    dependencyContent.forEach((dep) => {
        if(dep.isDevDependency) {
            devDependencies[dep.name] = dep.version;
        }
        else {
            nonDevDependenices[dep.name] = dep.version;
            
        }
    });

    fileContent.forEach(({name, ...rest }) => {
        files[name] =  {
            ...rest
        }
    })

    return [
        files,
        nonDevDependenices,
        devDependencies
    ]
}
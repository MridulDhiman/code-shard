import { SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'
import React from 'react'

const CustomSandpackPreview = ({className, template, files, dependencies, devDependencies}) => {
  return (
    <div className={className}>
        <SandpackProvider
        files={files}
        template={template}
        customSetup={{
            dependencies,
            devDependencies
        }}
        >
            <SandpackLayout>
                 <SandpackPreview
                 showNavigator={false}
                 showOpenInCodeSandbox={false}
                 showRefreshButton={false}
                 showRestartButton={false}
                 showOpenNewtab={false} />
            </SandpackLayout>
        </SandpackProvider>
    </div>
  )
}

export default CustomSandpackPreview
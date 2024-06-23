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
                 <SandpackPreview/>
            </SandpackLayout>
        </SandpackProvider>
    </div>
  )
}

export default CustomSandpackPreview
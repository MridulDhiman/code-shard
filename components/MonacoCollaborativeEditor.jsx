import React from 'react'
import Room from './Room'
import MonacoEditor from './MonacoEditor'
import { useSandpack } from '@codesandbox/sandpack-react'

const MonacoCollaborativeEditor = ({template}) => {
    const {sandpack} = useSandpack();
    const {activeFile} = sandpack;
    const roomId = `${template}-${activeFile}`;
  return (
    <>
         <Room roomId={roomId}>
           <MonacoEditor roomId={roomId}/>
          </Room>
    </>
  )
}

export default MonacoCollaborativeEditor
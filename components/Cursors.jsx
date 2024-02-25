import { useEffect, useMemo, useState } from "react";
import {
  useSelf,
} from "@/liveblocks.config";


export default function Cursors ({yProvider}) {
    const [awarenessUsers, setAwarenessUsers] = useState([]);
    const userInfo = useSelf((me) => me.info);

  

 
    useEffect(() => {
        // Add user info to Yjs awareness
        const localUser = userInfo;
        yProvider.awareness.setLocalStateField("user", localUser);
    
        // On changes, update `awarenessUsers`
         function setUsers() {
      setAwarenessUsers([...yProvider.awareness.getStates()]);
    }
        yProvider.awareness.on("change", setUsers);
        setUsers();
    
        return () => {
          yProvider.awareness.off("change", setUsers);
        };
      }, [yProvider]);

      // console.log(awarenessUsers);

      const styleSheet = useMemo(() => {
        let cursorStyles = "";
    
        for (const [clientId, client] of awarenessUsers) {
          if (client?.user) {
            cursorStyles += `
              .yRemoteSelection-${clientId},
              .yRemoteSelectionHead-${clientId}  {
                --user-color: ${client.user.color};
              }
              
              .yRemoteSelectionHead-${clientId}::after {
                content: "${client.user.name}";
              }
            `;
          }
        }
    
        return { __html: cursorStyles };
      }, [awarenessUsers]);
    

      return <style dangerouslySetInnerHTML={styleSheet} />;

}
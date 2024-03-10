"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setPrev, setShard } from "@/store/slices/shard";
import NormalEditor from "./NormalEditor";
import { setModal } from "@/store/slices/modal";



export default function ShardComponent({roomId, shardDetails}) {
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    const [mode, setMode] = useState("normal");
    const {data: session} = useSession();
    const router = useRouter();
    const dispatch = useDispatch();
    const iframeRef = useRef();
    const isModalOpen = useSelector((state) => state.modal.isOpen);

    


    useEffect(()=> {
       if(shardDetails) {
       dispatch(setPrev({
        ...shardDetails
       }));
        setHtml(shardDetails.html);
        setCss(shardDetails.css);
        setJs(shardDetails.js);
        setMode(shardDetails.mode);
       }
    }, [shardDetails]);


    //html, css, js, title



    useEffect(()=> {

      if(session && !shardDetails) {
        fetch("/api/shard", {
          method: "POST",
          body: JSON.stringify({roomId}),
          headers :{
            "Content-Type" : "application/json"
          }
        }).
        then((res) => res.json())
        .then((data) => console.log("Response success: ", data))
        .catch((error) => console.log("Response error: ", error))
      }   


    }, [shardDetails]);

   
    const outputDoc = `
<html lang="en">
<body>${html}</body>
<style>${css}</style>
<script>
${js}
</script>
</html>`;


useEffect(()=> {
  dispatch(setShard({html, css, js, id: roomId, mode}));
}, [html, css, js, roomId, mode]);




// console.log(html, css, js);

  return (
    <>
    {/* <button>Save</button> */}
     <div className="flex justify-center">
        <NormalEditor setCode={setHtml} lang="html" value={shardDetails?.html}/>
        <NormalEditor setCode={setCss} lang="css" value={shardDetails?.css}/>
        <NormalEditor setCode={setJs} lang="js"  value={shardDetails?.js}/>  
    </div>

    <div  style={{ height: "42vh", overflow: "auto" }} className="bg-white">
  <iframe
  className="bg-white"
         ref={iframeRef}
          srcDoc={outputDoc}
          title="output"
          sandbox="allow-scripts"
          height="100%"
          width="100%"
           />
      </div>
    </>
   
  )
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setShard } from "@/store/slices/shard";
import CollaborativeEditor from "./Editor";
import SubRoom from "./SubRoom";





export default function CollaborativeShard({roomId}) {
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    const [mode, setMode] = useState("collaborative");
    const session = useSession();
    const router = useRouter();
    const dispatch = useDispatch();
    const shardDetails = useSelector((state) => state.shard.current);


    useEffect(()=> {
       if(shardDetails) {
        setHtml(shardDetails.html);
        setCss(shardDetails.css);
        setJs(shardDetails.js);
       }
    }, [shardDetails]);



    useEffect(()=> {
      if(!session) {
        router.replace("/register");
      }
    }, []);


    // useEffect(()=> {

    //   if(!shardDetails) {
    //     fetch("/api/shard", {
    //       method: "POST",
    //       body: JSON.stringify({roomId}),
    //       headers :{
    //         "Content-Type" : "application/json"
    //       }
    //     }).
    //     then((res) => res.json())
    //     .then((data) => console.log("Response success: ", data))
    //     .catch((error) => console.log("Response error: ", error))
    //   }   


    // }, [shardDetails]);

   
    const outputDoc = `
<html lang="en">
<body>${html}</body>
<style>${css}</style>
<script>
${js}
</script>
</html>`;


useEffect(()=> {
  dispatch(setShard({html, css, js}));
}, [html, css, js]);




  return (
    <>
       
          <div className="flex justify-center">
          <SubRoom roomId={roomId} id={"html"}>
               <CollaborativeEditor setCode={setHtml} lang="html"/>
        </SubRoom>
        <SubRoom roomId={roomId} id={"css"}>
               <CollaborativeEditor setCode={setCss} lang="css"/>
        </SubRoom>
        <SubRoom roomId={roomId} id={"js"}>
               <CollaborativeEditor setCode={setJs} lang="js"/>
        </SubRoom>
          </div>
        
           
    <div  style={{ height: "42vh", overflow: "auto" }} className="bg-white">
 
  <iframe
  className="bg-white"
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

"use client";

import { useEffect, useState } from "react";
import CollaborativeEditor from "./Editor";
import Room from "./Room";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setShard } from "@/store/slices/shard";


export default function ShardComponent({roomId, shardDetails}) {
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    const session = useSession();
    const router = useRouter();
    const dispatch = useDispatch();

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

    useEffect(()=> {

      if(!shardDetails) {
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
<script>${js}</script>
</html>`;


useEffect(()=> {
  dispatch(setShard({html, css, js, id: roomId}));
}, [html, css, js]);




// console.log(html, css, js);

  return (
    <>
    {/* <button>Save</button> */}
     <div className="flex justify-center">
       
            <Room roomId={roomId} id="html">
               <CollaborativeEditor setCode={setHtml} lang="html"/>
            </Room>
       
            <Room roomId={roomId} id="css">
                <CollaborativeEditor setCode={setCss} lang="css"/>
            </Room>
        
            <Room roomId={roomId} id="js">
                <CollaborativeEditor setCode={setJs} lang="js"/>
            </Room>
        
    </div>
    <div style={{ height: "50vh" }} className="bg-white">
 
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

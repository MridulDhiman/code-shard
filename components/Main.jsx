import { FaCodepen } from "react-icons/fa";

import Svg1 from "./Svg1";
import Card from "./Card";

const Main = () => {


  const cardContainer = [{
    lang: "HTML",
    content: "<div class='container' >Hello World</div>"
  }, 
{
  lang: "CSS", 
  content: `
  .container: {
      font-family: Fira-code, monospace;
      z-index:-1;
  }`
}, {
  lang: "JS",
  content: "const container = document.querySelector('.container');"
}]
  return (
    <>
      <div className="flex justify-center p-10 py-20">  

      {/* left container  */}
          <div className="w-1/2 flex-col m-10 gap-20">
            {/* heading  */}
            <h1 className="text-4xl font-semibold flex gap-2">
              {/* <span>
                <FaCodepen />
              </span>{" "} */}
              The best place to build, test and discover front-end code.
            </h1>
            <p className="my-5">
              CodeShard is a social development environment for front-end
              designers and developers. Build and test , show off
              your work, and find inspiration.
            </p>
            <button className="my-5 bg-[#47cf73] hover:bg-[#248C46] text-black py-3 p-4 rounded-md" >Signup for free</button>
          </div>

          {/* right container  */}
        <div className="bg-[#454751] p-5 rounded-xl  flex flex-col justify-center gap-2">
          {cardContainer.map((card,index) => <Card key={index} {...card}/>)}
        </div>
      </div>

      {/* <Svg1 /> */}
    </>
  );
};

export default Main;

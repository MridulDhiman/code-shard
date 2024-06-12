import { redirect } from "next/navigation";
import { templates } from "@/utils";
import SandpackEditor from "@/components/SandpackEditor";

const page = ({params}) => {
    const template = params.template;

    if(!templates.includes(template)) {
        // TODO: Give Error Info. to user using modal or alert.
        console.log("Template not valid: ", template);
        console.log("Supported Options: ", templates.join(", "));
        redirect("/");
    }


  return (
    <div>
       <SandpackEditor template={template} shard={true}/>
    </div>
  )
}

export default page;
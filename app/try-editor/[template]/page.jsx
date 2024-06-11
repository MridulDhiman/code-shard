import SandpackEditor from "@/components/SandpackEditor";

export const generateMetadata = ({params}) => {

    let template = params.template;
    console.log(template, "from meta deta ")
    template = template.toLowerCase();
    template = template.split("");
    template[0] = template[0].toUpperCase();
    template = template.join("");
return {
    title: `${template} Template`
}
}

export default function templatePage({params}) {
    const template = params.template;
    return (
        <>
    <SandpackEditor template={template} />
        </>
        );
}
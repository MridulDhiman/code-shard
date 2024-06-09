import SandpackEditor from "@/components/SandpackEditor";

export const generateMetaData = ({params}) => {

    const template = params.template;
return {
    title: `Template- ${template}`,
    description: `Sandpack Template for ${template}`
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
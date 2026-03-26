interface PageProps{
    params : Promise<{credentialId : string}>;
}
const page = async ({params}:PageProps)=>{
    const {credentialId} = await params;
    return (
        <p>
            credential Id: {credentialId}
        </p>
    );
}
export default page;
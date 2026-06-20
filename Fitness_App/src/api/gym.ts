const API_URL = "http://192.168.1.69:8000";


export async function sendFrame(
    uri:string,
    exercise:string
){

    const formData = new FormData();


    formData.append(
        "file",
        {
            uri,
            name:"frame.jpg",
            type:"image/jpeg"
        } as any
    );


    const response = await fetch(
        `${API_URL}/api/count/${exercise}`,
        {
            method:"POST",
            body:formData
        }
    );


    return await response.json();

}
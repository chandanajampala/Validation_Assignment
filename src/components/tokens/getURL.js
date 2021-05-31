import axios from "axios";
export default async function getURL(url) {
    const URLDETAILS = {
        url:url,
        title:"",
        status:"FETCHING",
        lastcalled:""
    }
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        await axios.get(url)
        .then(
            (response)=> {
                URLDETAILS.title= response.data?.split('<title>')[1]?.split('</title>')[0];//.match(/<title>(.*?)<\/title>/);
                URLDETAILS.status="LIVE";
             }
        )
        .catch(
            (error) => {
                URLDETAILS.title= error.status;
                URLDETAILS.status="ERROR";
            }
        )
        URLDETAILS.lastcalled = new Date().getTime();
        localStorage.setItem(url,JSON.stringify(URLDETAILS));
}
import axios from "axios";
//base url varialble
const BASE_URL = "https://api.themoviedb.org/3";
//2nd variable for token
//in vite we need to use this type to import token
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async(url,params)=>{
    try{
        const {data} = await axios.get(BASE_URL + url,{
                headers,
                params
            })
        return data;
    }
    catch(err){
        console.log(err);
        return err;
    }
}
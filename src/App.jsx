import {  useEffect } from 'react'
import {BrowserRouter, Routes, Route } from "react-router-dom";

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration,getGenre } from './store/homeSlice'

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home"
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult"
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

//Now we set react router

function App() {

  const dispatch = useDispatch();
  const {url} = useSelector((state) => state.home)

  //use effect hook
  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[]);
  

  //it is for api testing
  const fetchApiConfig = ()=>{
    fetchDataFromApi('/configuration').then((res)=>{
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }

      dispatch(getApiConfiguration(url))
    })
  };

  //multiple api calls and promise call
  const genresCall = async() =>{
    let promises = []
    let endPoints = ["tv","movie"]
    let allGenres = {}

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises);
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id] = item));
    });
    // console.log(data)
    dispatch(getGenre(allGenres));

  };



  return (
      <BrowserRouter>
      <Header/>
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/:mediaType/:id' element={<Details/>}/>
           <Route path='/search/:query' element={<SearchResult/>}/>
           <Route path='/explore/:mediaType' element={<Explore/>}/>
           <Route path='*' element={<PageNotFound/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    // {only for testing
      // <div className='App'>
    //   App
    //   {url?.total_pages}
    // </div>}
  )
}

export default App

import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './component/auth';
import {Home}  from './component/homepage';
import {db,auth} from './config/firebase';    // this import the firebase store add function blow
import {
  collection, 
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc } from 'firebase/firestore';

function App() {
  const [movieList, setMovieList]=useState([]);  //this function blow is writen after importin db
   //new movie state allowing onscreen input
    const [newMovieTitle, setMovieTitle]=useState("");
    const [newReleaseDate, setNewReleaseDate]=useState("0");
    const [isNewMovieOscar, setIsNewMovieOscar]=useState("true");

    //updae title state
    const [updatedTitle, setUpdatedTitle]=useState("")
   
    const moviesCollectionRef = collection(db, "movies");

  const getMovieList=async()=>{
    try{
     const data= await getDocs(moviesCollectionRef);
     const filteredData= data.docs.map((doc)=>({
       ...doc.data(),
       id:doc.id,
     }));
     setMovieList(filteredData);
     }catch (err){
       console.error(err);
     }
   };
 /* const deleteMovie= async(id)=>{
    const movieDoc=doc(db,"movies",id)
    await deleteDoc(movieDoc);
  };*/
  //below is correct code from chagpt abov is not deleting or adding without refersh
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    setMovieList((prevList) => prevList.filter((movie) => movie.id !== id));
  };//to here

  /*const updateMovieTitle = async(id)=> {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc,{title:updatedTitle});
  };*/
  
  //blow is chatgpt
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    setUpdatedTitle("");
    getMovieList();
  };




  useEffect(()=>{
    getMovieList();
  },[]);

  const onsubmitMovie=async ()=>{
    try{
    await addDoc(moviesCollectionRef,
     {title: newMovieTitle,
    releaseDate:newReleaseDate,
  receivedAnOscar:isNewMovieOscar,
  userId: auth?.currentUser?.uid,
});

getMovieList();
  }catch(err){
    console.error(err)
}
}

  return (
    <div className="App">
                  <header>
                <h2>HOMEPAGE</h2>
            <nav> <ul class="navbar">
    <li><a href="#signup">Sign Up</a></li>
    <li><a href="#login">Login</a></li>
    <li><a href="#about">About</a></li>
  </ul>

  <h3>Welcome to my website!</h3>
            </nav>
            
            </header>
      <Home /> <Auth />

      <div>      {/*the below is added toallow on screen edit*/}
        <input 
        placeholder='Movie title...'
        onChange={(e)=>setMovieTitle(e.target.value)}
        />
        <input
         placeholder='Release Date...'
         type='number'
         onChange={(e)=>setNewReleaseDate(Number(e.target.value))}
         />
        <input 
        type='checkbox' 
        checked={isNewMovieOscar}
        onChange={(e)=>setIsNewMovieOscar(e.target.checked)}
        />
        <label>Received an OScar</label>
        <button onClick={onsubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) =>(
          <div>
            <h1 style={{color:movie.receivedAnOscar? "blue" : "red"}}>{movie.title}</h1>
            <p>Date:{movie.releaseDate} </p>

            <button onClick={()=>deleteMovie(movie.id)}>Delete movie</button>
            <input placeholder='new title..'
                     onChange={(e)=>setUpdatedTitle(e.target.value)}
                     /> 
            <button onClick={()=>updateMovieTitle(movie.id)}>update title</button>

          </div>

        ))}
      </div>
    </div>
  );
}

export default App;

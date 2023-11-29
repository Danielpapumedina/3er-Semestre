import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

type Pokemon = {
  pkname: string,
  pkabilities: string[],
  pktypes: string[],
  pkimage: string
}

function App() {
  const [loading, setloading] = useState(true)
  const [pokemon, setpokemon] = useState<Pokemon>()
  const [serverUrl, setServerUrl] = useState("https://pokeapi.co/api/v2/pokemon/2")
  
  const changeURL = () => {
    const pokemonID = Math.floor(Math.random() * 1000 + 1);
    setServerUrl("https://pokeapi.co/api/v2/pokemon/" + pokemonID.toString()) 
  }

  const fetchData = async() => {
    const respuesta = await fetch(serverUrl);
    const data = await respuesta.json();
    const pokemondelaApi : Pokemon = {} as Pokemon;
    // console.log(data)
    const{name,abilities,types,sprites}=data;

    // console.log(name,abilities,types,sprites);
    pokemondelaApi.pkname = name;
    pokemondelaApi.pkimage = sprites.front_default;
    pokemondelaApi.pkabilities = abilities.map((ability:any) => {
      return ability.ability.name
    })
    pokemondelaApi.pktypes = types.map((tipo:any) => {
      return(tipo.type.name)
    })
    console.log(pokemondelaApi)

    //console.log(types);

    // console.log(abilities)
    // abilities.map(({ability}) => {
    //   const {name} = ability;
    //   console.log(name)
      
    // })
    // const{forms}=data;
    // console.log(forms)
    // abilities.map(({ability}) => {
    //   const {name} = ability;
    //   console.log("name", name)
      
    // })
    setpokemon(pokemondelaApi); //guardaste el pokemon en el useState
    setloading(false)
  }

  

  useEffect(() => {

    let mitimeout = setTimeout(()=>{
      changeURL();
    },5000)

    fetchData()
    return () => {
clearTimeout(mitimeout)
    };
  }, [serverUrl]);


  if(loading){
    return <h1>Cargando...</h1>
  }


  return (
    <>
      {/* <button onClick={changeURL}>Fetch</button> */}
      <h1>{pokemon?.pkname}</h1>
      <img src={pokemon?.pkimage} alt="" />
      <ol>
      {
            pokemon?.pkabilities.map((nombreHabilidad,indice) => {
              
              return <li key={indice} >{nombreHabilidad}</li>
            })
      }</ol>
      <ol>
      {
            pokemon?.pktypes.map((nombreHabilidad,indice) => {
              
              return <li key={indice} >{nombreHabilidad}</li>
            })
      }</ol>


    </>
  )
}

export default App

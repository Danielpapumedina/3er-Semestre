//const peticion = fetch
//console.log(peticion);

//En concepto son similares a las promesas de la vida, por lo general se llama el then de la promesa al tener exito y se llama
//peticion
//      then((resp)=> {return resp.json()}).
//       then(({results})=>{

//        results.map(({name})=>
//            {
//              const li = document.createElement("li");
//              li.innerText = name;
//              arrPokeresult.append(li);
//       });
//  })
// .catch(console.warm);

/* AYSNC Y Await */
const arrPokeresult = document.getElementById("lista");

const getAsynchronously = async()=> {
try{
    const respuesta = await fetch("https://pokeapi.co/api/v2/type/3");
    const data = await respuesta.json();
    console.log(data)
    const{damage_relations}=data;
    
    let name = damage_relations.double_damage_from[0].name

    arrPokeresult.innerHTML = "<li>" + name + "</li>"
}catch{
    console.error();
}
}
getAsynchronously();



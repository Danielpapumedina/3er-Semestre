
var personas = [];


function agregarPersona() 
{
    var nombre = document.getElementById("nombre").value;
    var edad = parseInt(document.getElementById("edad").value);
    var direccion = document.getElementById("direccion").value;
    var esVerdadero = document.getElementById("verdadero").checked;

    var persona = 
    {
      nombre: nombre,
      edad: edad,
      direccion: direccion,
      esVerdadero: esVerdadero
    };

    if (edad >= 18) 
    {
      persona.mayoriaEdad = true;
    } else 
    {
      persona.mayoriaEdad = false;
    }

    personas.push({...persona});
    
    var divResultado = document.getElementById("resultado");
    let d = JSON.stringify(persona)
    divResultado.innerHTML += d +"<br>";

    console.log(personas);
}
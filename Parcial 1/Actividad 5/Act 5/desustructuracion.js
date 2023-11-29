const personajes =
[
    {id: 1, nombre: 'Solid snake', franquicia:'MetalGear' , icono:"📦" },
    {id: 2, nombre: 'Master Chief', franquicia:'Halo',icono:"📦" },
    {id: 3, nombre: 'Raiden', franquicia:'MetalGear',icono:"📦" },
    {id: 4, nombre: 'Big Boss', franquicia:'MetalGear',icono:"📦" },
    {id: 5, nombre: 'Cortana', franquicia:'Halo' ,icono:"📦" },
    {id: 1, nombre: 'Cortana', franquicia:'Halo',icono:"📦" },
]

// console.log (personajes)
const {id,nombre,franquicia,icono} = personajes[1];
console.log [id,nombre,franquicia,icono];

//const (id: id2, nombre: otronombre, franquicia: franquicia2, icono: icono2)

const protagonistas = ['Arthur morgan', 'Jill Valentine', 'Natahan Drake', 'Kratos', 'Lara Croft'];

function funcionNormie (param1,param2)
{
    const result=param1+param2;
    console.log (result);
}

funcionNormie('Hola', 'Mundo')

const ob1 = {id: 1, nombre:"Javier",edad:21}
const ob2 = {id: 1, nombre:"Diego",edad:35}
const ob3 = {id: 1, nombre:"Sandra",edad:43}

console.log8("======ARREGLOS======");
//const arrSimple = new Array ();
//const arrSimple =Array();
const arrSimple =[ob1];

arrSimple.push(ob3)
arrSimple.push(ob2)
arrSimple.push()
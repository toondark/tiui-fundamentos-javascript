var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; // Módulo de importación desde API
var A = 'https://rickandmortyapi.com/api/character/'; // URL de la API

// Función para realizar la solicitud HTTP usando Promesas.
const X = (a) => {
  return new Promise((resolve, reject) => { //Se retorna la promesa
    var B = new XMLHttpRequest(); // Se declara dentro de la función la variable B que crea la instancia de solicitud ya que esta debe ciclarse a cada solicitud y no solo una vez.
    
    B.onreadystatechange = (e) => {  
      if (B.readyState == 4) { // Códigos HTML no deben ser cadenas de texto, son números.
        if (B.status === 200) {
          resolve(B.responseText); // Resuelve la promesa con response.
        } else {
          reject(new Error(`Imposible obtener la información ${a}`)); // Rechaza la promesa con un error.
        }
      }
    };

    B.open('GET', a, true); // Se maneja de forma asincrónica cambiando true por false.
    B.send();
  });
}

// Funcion que sustituye el callback hell. async
const main = async () => {
  try {
    // Primera llamada a la API para obtener la lista de personajes.
    const d = await X(A); //Espera resolucion de promesa con la URL
    console.log('Primer Llamado...');
    var results = JSON.parse(d).results; // Convertimos la propiedad results del JSON en un objeto de JS 

    // Segunda llamada para obtener información del primer personaje.
    const f = await X(A + results[0].id); // Espera de promesa combinando el request con el objeto creado.
    console.log('Segundo Llamado...');
    var char = JSON.parse(f); // Convertimos en objeto el JSON del request f.

    // Tercera llamada para obtener la información del origen del primer personaje.
    const h = await X(char.origin.url); //Nuevamente espera resolucion de promesa 
    console.log('Tercer Llamado...');
    var origin = JSON.parse(h); // Otro parseo del JSON. 

    // Muestra la información obtenida.
    console.log(`Personajes: ${JSON.parse(d).info.count}`);
    console.log(`Primer Personaje: ${char.name}`);
    console.log(`Dimensión: ${origin.dimension}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

main(); // Por ultimo no olvidar invocar la funcion main.

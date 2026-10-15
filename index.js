//RESUELVE TUS EJERCICIOS AQUI

//EJERCICIO 1
//Dog API - Quiero un perrito, pero no se qué raza escoger, ¿me ayudas?
//Utiliza la API (https://dog.ceo/dog-api/) para resolver estos ejercicios.

//[ ] 1.- Declara una funcion getAllBreeds que devuelva un array de strings con todas las razas de perro.
function getAllBreeds() {
  //return fetch("https://dog.ceo/api/breeds/list/all")
  return fetch("./js/ficherosAPIS/all.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error HTTP: " + res.status);
      }
      return res.json();
    })
    .then((data) => Object.keys(data.message))
    .catch((error) => console.error("Error fetching data:", error));
}

getAllBreeds().then((data) => console.log(data));
//[ ] 2.- Declara una función getRandomDog que obtenga una imagen random de una raza.
function getRandomDog() {
  //return fetch("https://dog.ceo/api/breeds/image/random")
  return fetch("./js/ficherosAPIS/images.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error HTTP: " + res.status);
      }
      return res.json();
    })
    .then((data) => data.message)
    .catch((error) => console.error("Error fetching data:", error));
}
//[ ] 3.- Declara una función getAllImagesByBreed que obtenga todas las imágenes
//  de la raza komondor.
function getAllImagesByBreed() {
  //return fetch("https://dog.ceo/api/breeds/image/random")
  return fetch("./js/ficherosAPIS/komondor.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error HTTP: " + res.status);
      }
      return res.json();
    })
    .then((data) => data.message)
    .catch((error) => console.error("Error fetching data:", error));
}
//https://dog.ceo/api/breed/hound/images

//[ ] 4.- Declara una funcion getAllImagesByBreed2(breed) que devuelva las
// imágenes de la raza pasada por el argumento
function getAllImagesByBreed2(breed) {
  //return fetch("https://dog.ceo/api/breeds/image/random")
  return fetch(`https://dog.ceo/api/breed/${breed}/images`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error HTTP: " + res.status);
      }
      return res.json();
    })
    .then((data) => data.message)
    .catch((error) => console.error("Error fetching data:", error));
}
//GitHub API (I) - ¿Quieres saber mi información? Aquí la tienes
//[ ] 5.- Declarara una función getGitHubUserProfile(username) que obtenga
//  el perfil de usuario de github a partir de su nombre de usuario. (https://api.github.com/users/{username}).
function getGitHubUserProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error HTTP: " + res.status);
      }
      return res.json();
    })
    .then((data) => data)
    .catch((error) => console.error("Error fetching data:", error));
}
//[ ] 6.- Declara una función printGithubUserProfile(username) que reciba como argumento el nombre de un usuario (username), retorne {img, name} y pinte la foto y el nombre en el DOM.
function printGithubUserProfile(username) {
  let contenido = "";
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error HTTP: " + res.status);
      }
      return res.json();
    })
    .then((data) => {
      contenido = `<article>
      <img src="${data.avatar_url}" alt="">
      <h1>${data.name}</h1>
                   </article>`;

      document.body.insertAdjacentHTML("beforeend", contenido);
      return {
        name: data.name,
        img: data.avatar_url,
      };
    })
    .catch((error) => console.error("Error fetching data:", error));
}
//[ ] 7. Crea una función getAndPrintGitHubUserProfile(username) que contenga una
//  petición a la API para obtener información de ese usuario y devuelva un string que represente una tarjeta HTML como en el ejemplo, la estructura debe ser exactamente la misma:

/*<section>
    <img src="url de imagen" alt="imagen de usuario">
    <h1>Nombre de usuario</h1>
    <p>Public repos: (número de repos)</p>
</section>*/
function getAndPrintGitHubUserProfile(username) {
  let contenido = "";

  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error HTTP: " + res.status);
      }
      return res.json();
    })
    .then((data) => {
      contenido = `<section>
                     <img src="${data.avatar_url}" alt="${data.name}"> 
                     <h1>${data.name}</h1>
                    <p>Public repos: ${data.public_repos}</p>
                   </section>`;

      document.body.insertAdjacentHTML("beforeend", contenido);
      return contenido;
    })
    .catch((error) => console.error("Error fetching data:", error));
}
//[ ] 8.- Manipulación del DOM: Crea un input de tipo texto, y un botón buscar.
//  El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar.
//  Después llamaremos a la función getAndPrintGitHubUserProfile(username) que se ejecute cuando se pulse el botón buscar.(Esto no se testea).

// EJERCICIO 8

const input = document.createElement("input");
input.type = "text";
input.placeholder = "Introduce un usuario de GitHub";

const boton = document.createElement("button");
boton.textContent = "Buscar";

document.body.appendChild(input);
document.body.appendChild(boton);

boton.addEventListener("click", () => {
  const username = input.value.trim();

  console.log("Has pulsado buscar:", username);

  if (username !== "") {
    getAndPrintGitHubUserProfile(username).then((data) =>
      console.log("Perfil obtenido:", data),
    );
  }
});
//GitHub API (II)- Promesas, promesas y más promesas
//[ ] 9.- Dada una lista de usuarios de github guardada en una array,crea una funcion fetchGithubUsers(userNames) que utilice 'https://api.github.com/users/${name}' para obtener el nombre de cada usuario.
//Objetivo: Usar Promise.all()
//Recordatorio: Una llamada a fetch() devuelve un objeto promesa.
//Pregunta. ¿cuántas promesas tendremos?
//Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

//Pasos:

//Mapear el array y hacer un fetch() para cada usuario. Esto nos de vuelve un array lleno de promesas.
//Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
//Cuando Promise.all() haya terminado: Consigue que se imprima por consola la url del repositorio de cada usuario.
//  Consigue que se imprima por consola el nombre de cada usuario.
// EJERCICIO 9
// Obtener varios usuarios de GitHub utilizando Promise.all()

// EJERCICIO 9
// Obtener varios usuarios de GitHub utilizando Promise.all().
// Devolver un array con la URL y el nombre de cada usuario.

// EJERCICIO 9
// Obtener varios usuarios de GitHub utilizando Promise.all()

function fetchGithubUsers(userNames) {
  const promesas = userNames.map((name) => {
    return fetch(`https://api.github.com/users/${name}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error HTTP: " + res.status);
        }
        return res.json();
      });
  });

  return Promise.all(promesas)
    .then((data) => {
      return data.map((usuario) => {
        console.log("URL:", usuario.html_url);
        console.log("Nombre:", usuario.name);

        return {
          name: usuario.name,
          url: usuario.html_url
        };
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}
// fetchGithubUsers(["octocat", "mojombo"])
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));
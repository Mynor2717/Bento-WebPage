/* Las terminales de la api par la funcion de los estados */

/*
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const client_id = '0782e656578048f9bc878b1bb39133eb';
const client_secret = 'd5feb3c434564d0a9ff3b8eeb279cfd0';
const refresh_token = 'AQDwT-91IyiTYgFlD3L95TQrqFNxr_Gm7sipyodWoI9NpOPZ4svLyAtskYSEgyE__hX6BaDOjcmr6Q0yeqZ31ZOyB3puOZ_TuIZc6RRPpqfy5gfNPl0ec9EB1lMieDioI4c';
*/

/*const ApiController = (function() {
    const clientId = '';
    const clientSecret = '';

    const getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
               'Content-Type' : 'application/x-www-form-urlencoded',
               'Authorization' : 'Basic' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
        const data = await result.json();
        return data.access_token;
    }

   const _getGenres = async (token) => {
    const result = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      method: 'GET',
      headers: {'Authorization' : 'Bearer' + token}
    });
    const data = await result.json();
     
   }

})();

*/
const client_id = '0782e656578048f9bc878b1bb39133eb';
const client_secret = 'd5feb3c434564d0a9ff3b8eeb279cfd0';
const refresh_token = 'AQDwT-91IyiTYgFlD3L95TQrqFNxr_Gm7sipyodWoI9NpOPZ4svLyAtskYSEgyE__hX6BaDOjcmr6Q0yeqZ31ZOyB3puOZ_TuIZc6RRPpqfy5gfNPl0ec9EB1lMieDioI4c';

let access_token;

function getAccessToken() {
  return fetch(`https://accounts.spotify.com/api/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`)
    },
    body: 'grant_type=refresh_token&refresh_token=' + refresh_token
  })
  .then(response => response.json())
  .then(data => {
    access_token = data.access_token;
    setTimeout(getAccessToken, (data.expires_in - 60) * 1000); // Refresh token 60 seconds before it expires
    return access_token;
  })
  .catch(error => {
    console.error(error);
    document.querySelector('.hey').innerHTML = 'Error fetching song information';
  });
}

function getSongInfo() {
  return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })
  .then(response => {
    if (response.status === 204) {
      // If there is no currently playing track, get the most recently played track instead
      return fetch('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.items.length > 0) {
          const lastPlayed = data.items[0].track;
          return {
            songName: lastPlayed.name,
            songArtist: lastPlayed.artists[0].name,
            songImageUrl: lastPlayed.album.images[0].url,
            songUrl: lastPlayed.external_urls.spotify
          };
        } else {
          // If there are no recently played tracks either, show an error message
          throw new Error('No recently played tracks found');
        }
      });
    } else {
      return response.json()
      .then(data => {
        return {
          songName: data.item.name,
          songArtist: data.item.artists[0].name,
          songImageUrl: data.item.album.images[0].url,
          songUrl: data.item.external_urls.spotify
        };
      });
    }
  })
  .catch(error => {
    console.error(error);
    document.querySelector('.hey').innerHTML = 'Offline';
  });
}

function updateSongInfo() {
  getAccessToken()
  .then(() => {
    return getSongInfo();
  })
  .then(songInfo => {
    const songHtml = `
      <a class="hello" href="${songInfo.songUrl}" target="_blank" style="display: flex; align-items: center;">
        <img class="FOTO" src="${songInfo.songImageUrl}" alt="${songInfo.songName} album cover" width="220px" height="310px" style="margin-right: 5px;">
        <div class="Letra" style="display: flex; flex-direction: column; justify-content: center; line-height: 1.2;">
          <span class="Info" style="font-weight: bold;">${songInfo.songName}</span>
          <span class="Titu" style="font-size: 30px;" >${songInfo.songArtist}</span>
          
        </div>
        <img src="/soundbar.gif" class="Flu">
      </a>`;
    document.querySelector('.hey').innerHTML = songHtml;
    setTimeout(updateSongInfo, 10000); // Update every 10 seconds
  });
}

updateSongInfo();


/*const mascota = {
  nombre : 'Amarillo',
  edad : 1,
  vivo : true,
  razas : ['peludo','flaco']
}

console.log(mascota)
console.log(mascota.nombre)
console.log(mascota.vivo)
console.log(mascota.razas[0])

const {edad, nombre} = mascota
console.log(nombre)

*/

/*const web = {
  nombre : 'hola',
  links : {
    enlace : 'wwww.hola.com',
  },
  redesSociales : {
    youtube : {
       enlace : 'youtube.com',
       nombre : 'holayoutube'
    }
  }
}

const {enlace, nombre} = web.redesSociales.youtube
console.log(nombre)

*/

//Utilizando .then()

/*fetch('https://pokeapi.co/api/v2/pokemon/')
  .then(res => res.json())
  .then (data => {
     //console.log(data.results)
     let Nombres = []
     data.results.forEach(element => {
      Nombres.push(element.name)
      //console.log(element)
     });
     console.log(Nombres)
  })

  // lo mismo pero con async y await 

  const ObtenerPokemones = async() => { 
         try {
         const res = await fetch('https://pokeapi.co/api/v2/pokemon/')
         const data = await res.json()
         //console.log(data.results)
         //data.results.map(poke => console.log(poke))
          const PokeNombre = data.results.filter(poke => poke.name != 'bulbasaur')
          console.log(PokeNombre)
         } catch (error) {
          console.log(error)
         }
  }
  ObtenerPokemones()

  */
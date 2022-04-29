
function restart(){
  const div = document.querySelectorAll('.choice-grid div');
  const img = document.querySelectorAll('.checkbox');
  for(let a of img){
    a.src = 'images/unchecked.png';
  }
  for (let b of div){
    b.classList.remove('overlay');
    b.classList.remove('colore');
  }
  const reset = document.querySelector('#inizio');
  reset.classList.add('fine');
  
  ris.one=null;
  ris.two=null;
  ris.three=null;
  
  for(let i=0;i<27; i++){
    div[i].addEventListener('click', check);
  }
   window.scrollTo(0,0);

}


function check(event)
{
  const seleziona = event.currentTarget;
  const img =seleziona.querySelector('.checkbox');
  const div = document.querySelectorAll('.choice-grid div'); 
  img.src = 'images/checked.png';
  seleziona.classList.remove('overlay');
  seleziona.classList.add('colore');

  background(seleziona);

  const choiceid = seleziona.dataset.choiceId;
  const questionid = seleziona.dataset.questionId;

  ris[questionid]=choiceid;
  if(ris.one !== null && ris.two !== null && ris.three !== null){
    for(let i=0;i<27; i++){
      div[i].removeEventListener('click', check);
    }
    const risultato = personalita(ris);

    const titolo = document.querySelector('h2');
    const contenuto = document.querySelector('p');
    titolo.textContent = RESULTS_MAP[risultato].title;
    contenuto.textContent = RESULTS_MAP[risultato].contents;
    
    const fine_prob = document.querySelector('.fine');
    fine_prob.classList.remove('fine');

    const reset = document.querySelector('#bottone');
    reset.addEventListener('click', restart);

  }

}


function background(risp){
  const v= document.querySelectorAll('.choice-grid div');
  for(const p of v){
    if (p.dataset.choiceId !== risp.dataset.choiceId && p.dataset.questionId === risp.dataset.questionId){
      p.classList.remove('colore');
      const imagenot = p.querySelector('.checkbox').src = 'images/unchecked.png';
      p.classList.add('overlay');
    }
  }
}

function personalita(risp){
  
  if(risp.one === risp.two || risp.one === risp.three)
  return risp.one;
  else if(risp.two === risp.three)
  return risp.two;
  else if (risp.one !== risp.two && risp.one !== risp.three)
  return risp.one;
   
}



const immagine = document.querySelectorAll('.choice-grid div');

for(let i=0;i<27; i++){
  immagine[i].addEventListener('click', check);
}

const ris = {
  'one':null,
  'two':null,
  'three':null,
}


const risultati = 9;
const key='26910318-51ce718e7db0d20028b6df3e3';
const api='https://pixabay.com/api/';

function search(event){
event.preventDefault();
const auto_input = document.querySelector('#auto');
const auto_value =encodeURIComponent(auto_input.value);
const rest_url = api + '?key=' + key + '&q=' + auto_value + '&per_page=' + risultati;
fetch(rest_url).then(onResponse).then(onJson);
}

function onResponse(response){
  return response.json();
}

function onJson(json){
const results = json.hits;
const album=document.querySelector('#parcoauto');
album.innerHTML='';
for (let result of results){
  const img = document.createElement('img');
  img.src= result.largeImageURL;
  album.appendChild(img);
 }
}
 

const form = document.querySelector('#uno');
form.addEventListener('submit', search);




function onJson2(json) {
  const library = document.querySelector('#album-view');
  library.innerHTML = '';
  const r = json.albums.items;
  let num = r.length;
  if(num > 10)
    num = 9;
  for(let i=0; i<num; i++)
  {
    const album_data = r[i]
    const title = album_data.name;
    const selected_image = album_data.images[0].url;
    const album = document.createElement('div');
    album.classList.add('album');
    const img = document.createElement('img');
    img.src = selected_image;
    const caption = document.createElement('span');
    caption.textContent = title;
    album.appendChild(img);
    album.appendChild(caption);
    library.appendChild(album);
  }
}

function search2(event)
{
  event.preventDefault();
  const album_input = document.querySelector('#album');
  const album_value = encodeURIComponent(album_input.value);
  console.log('Eseguo ricerca: ' + album_value);
  fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson2);
}

function onTokenJson(json)
{
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}
const client_id = '38d99715f7e547b1b9a23b96f8114cdc';
const client_secret = '9faacb3d8bdb43bf8f65a5c86dc970cc';

let token;
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

const form2 = document.querySelector('#due');
form2.addEventListener('submit', search2)

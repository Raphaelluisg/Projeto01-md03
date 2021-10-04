const urlApi = 'http://localhost:3000/animes';
const list = document.getElementById('list');
let edit = false;
let idEdit = 0;

const getAnimes = async () => {
    const response = await fetch(urlApi);
    const data = await response.json();
    console.log(data);
    data.map((anime) =>{
        list.insertAdjacentHTML('beforeend', `
        <div class="col-md-4 mb-4 border-primary">
            <div class="card h-100 border-primary" style="width: 21rem;">
                <img src="${anime.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${anime.title}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p class="card-text">Gender: ${anime.gender}</p>
                <p class="card-text">Rate: ${anime.rate}</p>
                <button type="button" class="btn btn-primary" onclick="putAnime(${anime.id})">Editar</button>
                <button type="button" class="btn btn-danger" onclick="deleteAnime(${anime.id})">Excluir</button>
                </div>
            </div>
        </div>
        `)
    })
}
getAnimes();

const submitForm = async (event) => {
    event.preventDefault();

    let title = document.getElementById('title');
    let image = document.getElementById('image');
    let gender = document.getElementById('gender');
    let rate = document.getElementById('rate');

    const anime = {
        title: title.value,
        image: image.value,
        gender: gender.value,
        rate: rate.value
    }
    
    if(!edit) {
        const request = new Request(`${urlApi}/add`, {
            method: 'POST',
            body: JSON.stringify(anime),
            headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

        const response = await fetch(request);
        const result = await response.json();

        if(result){
            getAnimes();
        }
    } else {
        const request = new Request(`${urlApi}/${idEdit}`, {
            method: 'PUT',
            body: JSON.stringify(anime),
            headers: new Headers({ 
                'Content-Type': 'application/json'
            })
        })
        const response = await fetch(request);
        const result = await response.json();

        if(result) {
            getAnimes();
        }
    }

    title.value = '';
    image.value = '';
    gender.value = '';
    rate.value = '';

    list.innerHTML = '';
}

const getAnimeById =  async (id) => {
    const response =  await fetch(`${urlApi}/${id}`);
    return anime = response.json();
}
  

const putAnime = async (id) => {
    edit = true;
    idEdit = id;  
    const anime = await getAnimeById(id);
  
    let titleChange = document.getElementById('title');
    let imageChange = document.getElementById('image');
    let genderChange = document.getElementById('gender');
    let rateChange = document.getElementById('rate');
    
    titleChange.value = anime.title;
    imageChange.value = anime.image;
    genderChange.value = anime.gender;
    rateChange.value = anime.rate  
}
  
  
const deleteAnime = async (id) => {
    const request = new Request(`${urlApi}/${id}`, {
      method: 'DELETE',
    })
    const response = await fetch(request);
    const data = await response.json();
    console.log(data.message);
  
    list.innerHTML = '';
    getAnimes();
}
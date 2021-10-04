const express = require('express');
const router = express.Router();

const animes = [
    {
        id: Date.now(),
        title: "Berserker",
        image: "https://th.bing.com/th/id/R.17cc6e1d9d1d544b30507e8fba9596f9?rik=WpmTtUDyofludQ&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2f1%2f5%2f829261-widescreen-berserker-wallpaper-1920x1080-for-android.jpg&ehk=PFz%2f5BrRfwGoSybvYVplqNc91ObWU%2fEaPqpWMeTG2Og%3d&risl=&pid=ImgRaw&r=0",
        info: "Spurred by the flame raging in his heart, the Black Swordsman Guts continues his seemingly endless quest for revenge. Standing in his path are heinous outlaws, delusional evil spirits, and a devout child of god.",
        gender: "dark fantasy, elf, fantasy, manga, nudity, seinen, tragedy, violence",
        rate: "8"
    }
]

router.get('/', (req, res) => {
    res.send(animes);
})


router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const index = animes.findIndex(anime => anime.id == idParam);
    const anime = animes[index];
    res.send(anime);
})


router.post('/add', (req, res) => {
    const anime = req.body;
    anime.id = Date.now();
    animes.push(anime);
    res.status(201).send({
        message: 'Your anime has been added successfully',
        data: anime
    });
})


router.put('/:id', (req, res) => {
    const animeEdit = req.body;
    const id = req.params.id;
    let animeNew = animes.find((anime) => anime.id == id);
  
    animeNew.title = animeEdit.title;
    animeNew.image = animeEdit.image;
    animeNew.info = animeEdit.info;
    animeNew.gender = animeEdit.gender;
    animeNew.rate = animeEdit.rate;
  
    res.send({
      message: `${animeNew.id} update successfully`,
      data: animeNew
    })
})

  
router.delete('/:id', (req, res) => {
    const id = req.params.id; 
    const index = animes.findIndex((anime) => anime.id == id);
    animes.splice(index, 1);

    res.send({
        message: `Your anime has been deleted successfully.`,
    })
})

module.exports = router;
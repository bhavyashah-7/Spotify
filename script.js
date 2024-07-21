console.log('Welcome to Spotify!')

// Variables
let index = 0;
let audioElement = new Audio('songs/1.mp3'); // Audio class is defined in JS and has methods like play(), pause(), currentTime, etc.
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem')); // array.from is a method of array which is used to convert an array-like object into an array. It takes an array-like object as an argument and returns an array.
let covers = Array.from(document.getElementsByClassName('cover'));

let songs = [
    { songName: "Perfect", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg" },
    { songName: "kaise mujhe",filePath:"songs/2.mp3",coverPath:"covers/b.jpg" },
    { songName: "Maahi Ve", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Beete Lamhe", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Apna Bana le", filePath: "songs/5.mp3", coverPath: "covers/d.jpeg" },
    { songName: "Saaiyaan", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Alag Aasmaan", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Adhoore", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Saibo", filePath: "songs/9.mp3", coverPath: "covers/9.jpeg" },
    { songName: "Teri Jhuki Nazar", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
]
songItems.forEach((element,i)=> { // forEach is a method of array which is used to iterate over the array elements. It takes a function as an argument which is executed for each element of the array. It takes two arguments, first is the element and second is the index of the element.
    element.getElementsByTagName('img')[0].src = songs[i].coverPath; // this line sets the cover image of the song to the image tag in the html file
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName; // this line sets the song name to the song name tag in the html file
})
// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle'); // when play button is clicked, remove play icon 
        masterPlay.classList.add('fa-pause-circle'); // add pause icon
        gif.style.opacity = 1; // make gif visible when play button is clicked
    }// play() is a method of audioElement defined in Audio class
    else {
        audioElement.pause(); // if audio is playing, pause it when play button is clicked again
        masterPlay.classList.remove('fa-pause-circle'); // remove pause icon
        masterPlay.classList.add('fa-play-circle'); // add play icon
        gif.style.opacity = 0; // make gif invisible when play button is clicked again
    }
})
// Listen to events
audioElement.addEventListener('timeupdate', () => {
    // update seekbar
progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); // calculate progress of song
myProgressBar.value = progress; // set progress of song to seekbar
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100; // changing the percentage of song played to the current time of the song
    // and setting it to the song duration
})
 
const makeAllPlays = () => { // when a song is played, make all other songs play buttons to play icon
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> { // iterate over all play buttons of songs
    element.addEventListener('click', (e) => {
        makeAllPlays(); // make all play buttons play icon
        index = parseInt(e.target.id); // get the index of the song clicked and convert it to integer
        e.target.classList.remove('fa-play-circle'); // when play button is clicked, remove play icon
        e.target.classList.add('fa-pause-circle'); // add pause icon
        audioElement.src = `songs/${index+1}.mp3`; // set the song to be played when p
        masterSongName.innerText = songs[index].songName;
        audioElement.currentTime = 0; // set the current time of song to 0
        audioElement.play(); // play the song
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle'); // when play button is clicked, remove play icon 
        masterPlay.classList.add('fa-pause-circle');
    
    })
        
})

document.getElementById('next').addEventListener('click', () => {
    if (index >= 9) {
        index = 0;
    }
    else {
        index += 1;
    }
    audioElement.src = `songs/${index+1}.mp3`; // set the song to be played
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0; // set the current time of song to 0
    audioElement.play(); // play the song
    masterPlay.classList.remove('fa-play-circle'); // when play button is clicked, remove play icon 
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', () => {
    if (index <=0) {
        index = 0;
    }
    else {
        index -= 1;
    }
    audioElement.src = `songs/${index+1}.mp3`; // set the song to be played
    audioElement.currentTime = 0; // set the current time of song to 0
    audioElement.play(); // play the song
    masterSongName.innerText = songs[index].songName; // set the song name to be played
    masterPlay.classList.remove('fa-play-circle'); // when play button is clicked, remove play icon 
    masterPlay.classList.add('fa-pause-circle');
})

// addEventListener is a method of document object which is used to listen to events like click, mouseover, etc. It takes two arguments, first is the event name and second is the function to be executed when the event occurs.
// .classList helps to add or remove html classes from an element. It is a property of the element object. It is used to add or remove classes from an element. It has methods like add(), remove(), toggle(), etc.
// it helps to access html elements and their properties and methods in js
// currentTime is a property of audioElement which gives the current time of the song in seconds from the start of the song.
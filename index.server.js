const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { appData } = require("./mock");
const app = express();
const PORT = 9000;

const __AUDIO_TYPE__ = {
    ROCK: "rock",
    JAZZ: "jazz",
    CINEMATIC: "cinematic",
    ACCOUSTIC: "accoustic"
}

function getDirectories(type){
    return fs.readdirSync(`./music/${type}`);
}

function getSongDetails(type, dir){
    try{
        const path = `music/${type}/${dir}/media`;
        const audioData = fs.readdirSync(path);
        const audioInfo = fs.readFileSync(`./music/${type}/${dir}/info.json`);
        const parsedData = JSON.parse(audioInfo);
        return {
            audioFile: `${path}/${audioData[0]}`,
            avatar: `${path}/${audioData[1]}`,
            ...parsedData
        }
    }catch(error){
        return false;
    }
}

function getSongDetails2(songName){
    try{
        const path = `./allsongs/${songName}/media`;
        const audioData = fs.readdirSync(path);
        const audioInfo = fs.readFileSync(`./allsongs/${songName}/info.json`);
        const parsedData = JSON.parse(audioInfo);
        return {
            audioFile: `allsongs/${songName}/media/${audioData[0]}`,
            avatar: `allsongs/${songName}/media/${audioData[1]}`,
            ...parsedData
        }
    }catch(error){
        return false;
    }
}


app.use(cors());
app.use('/allsongs', express.static('allsongs'));

app.get(`/song`, (req, res) => {
    console.log("ok",fs.readdirSync("./allsongs"));
    const allsongkeys=fs.readdirSync("./allsongs");
    const songData = {};
    const allsongarray=[];

    allsongkeys.forEach((songName)=>{
          //const directoryItems = getDirectories(__AUDIO_TYPE__[type]);
        //directoryItems.forEach((item) => {
            const audioData = getSongDetails2(songName);
           if(audioData){
                
                allsongarray.push(audioData);
                
                
                }

               // console.log(songName);
    })
        
    

    
    console.log("mutton kosha", getSongDetails2("beyondtheline"));


    appData['freelicense'] = allsongarray;

    res.status(200).json({allsongarray});
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
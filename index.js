// Caution!
// This code is written by Arco
// Usage of this code is for personal and educational use only
// I didnt hold any responsibility for this code potentially breaking Youtube's User Agreement
// I write this code per line as a fun project and i didnt publish it or getting any profit from this

const fs = require('fs');
const ytdl = require('ytdl-core');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const setColor = (colorCode, text) => `\x1b[${colorCode}m${text}\x1b[0m`;

let title = "def" //default output file name

console.log(setColor(36, "Welcome to node youtube Downloader by Arco :V"));
console.log(setColor(33,"please fill the form below correctly and make sure your internet is on! Happy downloading :)"))
console.log("   ")


rl.question(setColor(31, 'Enter YouTube video URL: '), (videoURL) =>{
    console.log("   ")
    rl.question('File Type? (mp3/mp4): ', (Type) =>{
        console.log("   ")
        rl.question('Download Path? :', (Path) =>{
            rl.close()
            console.log("   ")
            
            // Display video title
            ytdl.getInfo(videoURL)
            .then(info => {
                console.log(setColor(32, `Downloading Title: ${info.videoDetails.title}`))
                title = info.videoDetails.title
                Download(videoURL, Type, Path, title)
            });
        })
    })
})

const Download = (url,type,path, name) =>{
    if(type === "mp4"){
        ytdl(url, { filter: 'videoandaudio' , quality: 'highest'})
        .pipe(fs.createWriteStream(path + `/${name}_vid.${"mp4"}`))

        .on('finish', () => {
            console.log("   ")
            console.log(setColor(36,`Video downloaded at ${path}`));
        })
        .on('error', (error) => {
            console.log("   ")
            console.error('Error downloading video:', error);
        });
    }
    if(type === "mp3"){
        ytdl(url, { filter: 'audioonly' , quality: 'highest'})
        .pipe(fs.createWriteStream(path + `/${name}_AUD.${"mp3"}`))

        .on('finish', () => {
            console.log("   ")
            console.log(setColor(36,`Audio downloaded at ${path}`));
        })
        .on('error', (error) => {
            console.log("   ")
            console.error('Error downloading Audio:', error);
        });
    } 
}


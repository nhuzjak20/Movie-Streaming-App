const express = require('express')
const app = express()
const fs = require('fs')
const { DownloaderHelper } = require('node-downloader-helper');
const dl = new DownloaderHelper('http://movie.basnetbd.com/Data/TV%20Series/Seinfeld/Season%2003/Seinfeld.S03E03.720p.WebRip.ReEnc-DeeJayAhmed.mkv', 'public');

app.use(express.static('public'))

async function downloadFile(url, filename) {
    try {
      // Fetch the file
      const response = await fetch(url);
      
      // Check if the request was successful
      if (response.status == 200) {
        throw new Error(`Unable to download file. HTTP status: ${response.status}`);
      }
  
      // Get the Blob data
      const blob = await response.blob();
  
      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = filename;
  
      // Trigger the download
      document.body.appendChild(downloadLink);
      downloadLink.click();
  
      // Clean up
      setTimeout(() => {
        URL.revokeObjectURL(downloadLink.href);
        document.body.removeChild(downloadLink);
      }, 100);
    } catch (error) {
      console.error('Error downloading the file:', error.message);
    }
  }


  var v = ""
  for(let i = 0; i < obrazac.value; i++) {
    v = v + '<p>' + i + '</p><br>'
    
  }
  poruke.innerHTML = v

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/html/homePage.html')
})

app.get('/testniDowload', (req, res)=>{
    const film = new DownloaderHelper('http://movie.basnetbd.com/Data/TV%20Series/Seinfeld/Season%2003/Seinfeld.S03E05.720p.WebRip.ReEnc-DeeJayAhmed.mkv', 'public', { fileName : 'Film'})
    //film.on('start', () => {
    //    console.log("Film je krenuo")
    //})
    //film.on('error', () => { console.log(error) })
    console.log("route je pokrenut")
    res.write("Test radi")
})

app.get('/downloadMovie', (req,res)=>{
    const dl = new DownloaderHelper('http://movie.basnetbd.com/Data/TV%20Series/Seinfeld/Season%2003/Seinfeld.S03E05.720p.WebRip.ReEnc-DeeJayAhmed.mkv', 'public', { fileName : 'Film'})
    var podaci = null
    dl.on('end', () => console.log('Download Completed'));
    dl.on('error', (err) => console.log('Download Failed', err));
    dl.start().catch(err => console.error(err));
    console.log("Radi test")
    res.download('http://movie.basnetbd.com/Data/TV%20Series/Seinfeld/Season%2003/Seinfeld.S03E05.720p.WebRip.ReEnc-DeeJayAhmed.mkv')
})

app.get('/video:url', (req, res)=>{
    const downladUrl = req.params.url
    const imeDatoteke = makeid(5)
    const film = new DownloaderHelper(downladUrl, 'public',{fileName : imeDatoteke})
    const range = req.headers.range;
    console.log(downladUrl)
    film.on('start',()=>{
        console.log('Film je krenuo')
    })
    const videoPath = 'public/' + imeDatoteke
    console.log("videoPath je: " + videoPath)
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6; 
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1)
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    
   
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mkv",
    }
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
})

app.listen(5001, ()=>{
    console.log('radi')
})
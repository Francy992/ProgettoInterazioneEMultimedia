var myImage = new Image(512, 512);
myImage.src = 'source/lena.jpg';
document.body.appendChild(myImage);

console.log("Ciao");
var c = document.getElementById("imageLenaModify");
var ctx = c.getContext("2d");
var img = document.getElementById("imageLena");
ctx.drawImage(img, 0, 0);
var imgData = ctx.getImageData(0, 0, c.width, c.height);

// invert colors
var i;
for (i = 0; i < imgData.data.length; i += 4) {
  imgData.data[i] = 255 - imgData.data[i];
  imgData.data[i+1] = 255 - imgData.data[i+1];
  imgData.data[i+2] = 255 - imgData.data[i+2];
  imgData.data[i+3] = 255;
}
ctx.putImageData(imgData, 0, 0);


var canvas = document.getElementById("imageLenaModify2");
var contex = canvas.getContext("2d");
//disegno l'immagine.
contex.drawImage(img,0,0);
//Prendo l'immagine per lavorarci come una matrice.
var imgMatrix = contex.getImageData(0, 0, canvas.width, canvas.height);
for(i=0;i<imgMatrix.data.length;i+=4){
    //Red
    imgMatrix.data[i] = imgMatrix.data[i];
    //Green
    imgMatrix.data[i+1] = imgMatrix.data[i+1];
    //Blue
    imgMatrix.data[i+2] = imgMatrix.data[i+2];
    //Alpha
    //    imgMatrix.data[i+3] = 230;
    //console.log("Imgmatrix data vale: " + imgMatrix.data[i])
}


var mySlider = $("#slider").slider();
//Mostro le modifiche a schermo
contex.putImageData(imgMatrix,0,0);
mySlider.on("change", function(val){
    contex = canvas.getContext("2d");
    contex.drawImage(img,0,0);
    imgMatrix = contex.getImageData(0, 0, canvas.width, canvas.height);
    for(i=0;i<imgMatrix.data.length;i+=4){
        //Red
        if(imgMatrix.data[i]+val.value.newValue <= 255 && imgMatrix.data[i]+val.value.newValue>=0)
            imgMatrix.data[i] = imgMatrix.data[i]+val.value.newValue;
        else if(imgMatrix.data[i]+val.value.newValue > 255)
            imgMatrix.data[i] = 255;
        else 
            imgMatrix.data[i] = 0;
        //Green
        if(imgMatrix.data[i+1]+val.value.newValue <= 255 && imgMatrix.data[i+1]+val.value.newValue>=0)
            imgMatrix.data[i+1] = imgMatrix.data[i+1]+val.value.newValue;
        else if(imgMatrix.data[i+1]+val.value.newValue > 255)
            imgMatrix.data[i+1] = 255;
        else 
            imgMatrix.data[i+1] = 0;
        //Blue
        if(imgMatrix.data[i+2]+val.value.newValue <= 255 && imgMatrix.data[i+2]+val.value.newValue>=0)
            imgMatrix.data[i+2] = imgMatrix.data[i+2]+val.value.newValue;
        else if(imgMatrix.data[i+2]+val.value.newValue > 255)
            imgMatrix.data[i+2] = 255;
        else 
            imgMatrix.data[i+2] = 0;
        
        //Alpha
        //    imgMatrix.data[i+3] = 230;
        //console.log("Imgmatrix data vale: " + imgMatrix.data[i]);
    }
    contex.putImageData(imgMatrix,0,0);
    console.log(imgMatrix.data);
});



Fourier.saluta();
//Parte 3
var canvas3 = document.getElementById("imageLenaModify3");
var grace = document.getElementById("imageLena3");

var contex3 = canvas3.getContext("2d");
//disegno l'immagine.
contex3.drawImage(grace,0,0);
//Prendo l'immagine per lavorarci come una matrice.
var imgMatrix3 = contex3.getImageData(0, 0, canvas3.width, canvas3.height);
for (i = 0; i < imgData.data.length; i += 4) {
    imgMatrix3.data[i] = 255 - imgMatrix3.data[i];
    imgMatrix3.data[i+1] = 255 - imgMatrix3.data[i+1];
    imgMatrix3.data[i+2] = 255 - imgMatrix3.data[i+2];
    imgMatrix3.data[i+3] = 255;
  }
contex3.putImageData(imgMatrix3,0,0);
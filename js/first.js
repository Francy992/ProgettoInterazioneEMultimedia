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
    //console.log("Imgmatrix data vale: " + imgMatrix.data[i]);
    
}
var mySlider = $("#slider").slider();
console.log("Imgmatrix data vale: ");
//Mostro le modifiche a schermo
contex.putImageData(imgMatrix,0,0);
console.log("Value: " + mySlider.slider('getValue'));
mySlider.on("change", function(val){
    contex = canvas.getContext("2d");
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
            imgMatrix.data[i] = 0;
        
        //Alpha
        //    imgMatrix.data[i+3] = 230;
        //console.log("Imgmatrix data vale: " + imgMatrix.data[i]);
        
    }
    contex.putImageData(imgMatrix,0,0);

});
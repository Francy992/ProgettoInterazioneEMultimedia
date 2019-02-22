Fourier.saluta();
//Creo le variabili canvas, imagine e context
var imgRiga1 = document.getElementById("imgRiga1");

var dims = [imgRiga1.width,imgRiga1.height];

var canvasRiga1 = document.getElementById("canvasRiga1");
var contextRiga1 = canvasRiga1.getContext("2d");

var canvas1Riga2 = document.getElementById("canvas1Riga2");
var context1Riga2 = canvas1Riga2.getContext("2d");

var canvas2Riga2 = document.getElementById("canvas2Riga2");
var context2Riga2 = canvas2Riga2.getContext("2d");

//Disegno l'immagine temporaneamente
contextRiga1.drawImage(imgRiga1,0,0);
context1Riga2.drawImage(imgRiga1,0,0);
context2Riga2.drawImage(imgRiga1,0,0);

//Estraggo la matrice da context e ci lavoro
//La matrice è composta da NxNx4 pixel dove NxN sono i pixel dell'immagine e 4 sono i canali, compreso alpha
var imgMatrix3 = contextRiga1.getImageData(0, 0, imgRiga1.width, imgRiga1.height);
//Operazioni sulla matrice
//coloriInvertiti(imgMatrix3);
redLevel = getLevel(imgMatrix3, 0);
greenLevel = getLevel(imgMatrix3, 1);
blueLevel = getLevel(imgMatrix3, 2);
imgMatrixOriginal = makeImage(redLevel,greenLevel,blueLevel);
//imgMatrixOriginalInvers = coloriInvertiti(imgMatrixOriginal);
console.log("RedLevel contiente " + redLevel.length + " elementi.");
console.log(redLevel);
imgLogMagnitude22 = getLog(imgMatrix3);
console.log(imgLogMagnitude22);
//scrivo la matrice modificata nel canvas
console.log(imgMatrixOriginal);
contextRiga1.putImageData(imgMatrix3, 0, 0);
context1Riga2.putImageData(imgLogMagnitude22, 0,0);
//context2Riga2.putImageData(imgMatrixOriginal, 0,0);


function getLog(imgMatrix){
    var h_hats = [];
    var h_es = []; // the h values

    var cc = 9e-3; // contrast constant


    for (var ai = 0; ai < imgMatrix.data.length; ai+=4) {
        // greyscale, so you only need every 4th value
        h_es.push(imgMatrix.data[ai]);
    }
    var h = h = function(n, m) {
        if (arguments.length === 0) 
            return h_es;

        var idx = n*dims[0] + m;
        return h_es[idx];
    }
    Fourier.transform(h(), h_hats);
    h_hats = Fourier.shift(h_hats, dims);
    //console.log(h_hats);



    // get the largest magnitude
    var maxMagnitude = 0;
    for (var ai = 0; ai < h_hats.length; ai++) {
      var mag = h_hats[ai].magnitude();
      if (mag > maxMagnitude) {
        maxMagnitude = mag;
      }
    }
 
    //Fourier.filter(h_hats, dims, 0, dims[1]);
 

    var $h =  $h = function(k, l) {
        if (arguments.length === 0) return h_hats;
    
        var idx = k*dims[0] + l;
        return h_hats[idx];
      };

    var h_primes = [];
    //var h_hats = h();
    //h_hats = Fourier.unshift(h_hats, dims);
    //Fourier.invert(h_hats, h_primes);
    imgMatrix2 = new ImageData(dims[0],dims[1]);
    var logOfMaxMag = Math.log(cc*maxMagnitude+1);
    for (var k = 0; k < dims[1]; k++) {
      for (var l = 0; l < dims[0]; l++) {
        var idxInPixels = 4*(dims[0]*k + l);
        imgMatrix2.data[idxInPixels+3] = 255; // full alpha
        var color = Math.log(cc*getMagnitudeQualcosa(h_hats[(k*dims[0] + l)])+1);
        color = Math.round(255*(color/logOfMaxMag));
        // RGB are the same -> gray
        for (var c = 0; c < 3; c++) { // lol c++
            imgMatrix2.data[idxInPixels+c] = color;
        }
      }
    }
    return imgMatrix2;

  /**/
}



function getMagnitudeQualcosa(complex){
    //console.log(complex);
    return Math.sqrt(complex.real*complex.real + complex.imag*complex.imag);
}

function getMaxMagnitude(imgMatrixFrequenceDomain){
    var maxMagnitude = 0;
    for (var ai = 0; ai < imgMatrixFrequenceDomain.length; ai++) {
      var mag = imgMatrixFrequenceDomain[ai].magnitude();
      if (mag > maxMagnitude) {
        maxMagnitude = mag;
      }
    }
}

function coloriInvertiti(imgMatrix){
    for (i = 0; i < imgMatrix.data.length; i += 4) {
        imgMatrix.data[i] = 255 - imgMatrix.data[i];
        imgMatrix.data[i+1] = 255 - imgMatrix.data[i+1];
        imgMatrix.data[i+2] = 255 - imgMatrix.data[i+2];
        imgMatrix.data[i+3] = 255;
    }
    console.log("coloriInvertiti");
    console.log(imgMatrix);
}

//colorLevel: 0 == RedLevel, 1 == GreenLevel, 2==BlueLevel, 3==alphaLevel
function getLevel(imgMatrix, colorLevel){
    if(colorLevel < 0 || colorLevel > 3){
        console.log("Errore nella getLevel");
        return [];
    }
    let cont = 0;
    level = [];
    for (i = 0; i < imgMatrix.data.length; i += 4) {
        level[cont] = imgMatrix.data[i + colorLevel];
        cont++;
    }
    console.log("Estratto colore N° " + colorLevel);
    return level;
}

function makeImage(redLevel, greenLevel, blueLevel){
    imgMatrix = new ImageData(512,512);
    var cont = 0;
    for (i = 0; i < redLevel.length * 4; i += 4) {
        imgMatrix.data[i] = redLevel[cont];
        imgMatrix.data[i+1] = greenLevel[cont];
        imgMatrix.data[i+2] = blueLevel[cont];
        imgMatrix.data[i+3] = 255;
        cont++;
    }
    console.log("Alla fine cont vale: " + cont)
    return imgMatrix;
}
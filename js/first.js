//Sezione inizializzazione
var start = new Date();
console.log("Avviato timer GLOBALE");

//Vari livelli dell'immagine. Soltanto i valori, è un array e non un'immagine.
var redLevel = [];
var greenLevel = [];
var blueLevel = [];
//Matrice contenente tutti i valori dei vari livelli della trasformata (non è un'immagine e contiene i complessi)
var MatrixFourierRedLevel = [];
var MatrixFourierGreenLevel = [];
var MatrixFourierBlueLevel = [];

//Matrice contenente tutti i valori complessi dopo il filtraggio passaQualcosa
var redLevelAfterFilter = [];
var greenLevelAfterFilter = [];
var blueLevelAfterFilter = [];


//Matrice contenente tutti i valori dei vari livelli dell'antitrasformata (non è un'immagine e contiene i valori da 0 a 255)
var AntiTrasformateRedLevel = [];
var AntiTrasformateGreenLevel = [];
var AntiTrasformateBlueLevel = [];
//Immagine originale e variabile dimensioni globale.
var imgRiga1 = document.getElementById("imgRiga1");
var dims = [imgRiga1.width,imgRiga1.height];

//Fourier.saluta();
//Creo le variabili canvas, imagine e context

var canvasRiga1 = document.getElementById("canvasRiga1");
canvasRiga1.width = dims[0];
canvasRiga1.height = dims[1];
var contextRiga1 = canvasRiga1.getContext("2d");

var canvas1Riga2 = document.getElementById("canvas1Riga2");
canvas1Riga2.width = dims[0];
canvas1Riga2.height = dims[1];
var context1Riga2 = canvas1Riga2.getContext("2d");

var canvas2Riga2 = document.getElementById("canvas2Riga2");
canvas2Riga2.width = dims[0];
canvas2Riga2.height = dims[1];
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
//imgMatrixOriginal = makeImage(redLevel,greenLevel,blueLevel);
//imgMatrixOriginalInvers = coloriInvertiti(imgMatrixOriginal);

//imgTrasformateRed = getTrasformate(redLevel, MatrixFourierRedLevel, 0);
//imgTrasformateGreen = getTrasformate(greenLevel, MatrixFourierGreenLevel, 1);
//imgTrasformateBlue = getTrasformate(blueLevel, MatrixFourierBlueLevel, 2);

//contextRiga1.putImageData(imgMatrix3, 0, 0);
//context1Riga2.putImageData(imgTrasformateRed, 0,0);

//AntiTrasformateRedLevel = getAntiTrasformate(MatrixFourierRedLevel, 0);
//AntiTrasformateGreenLevel = getAntiTrasformate(MatrixFourierGreenLevel, 1);
//AntiTrasformateBlueLevel = getAntiTrasformate(MatrixFourierBlueLevel, 2);
//var imgFinal = makeImage(AntiTrasformateRedLevel, AntiTrasformateGreenLevel, AntiTrasformateBlueLevel);
//context2Riga2.putImageData(imgFinal, 0,0);

/***
 * 
 * PROVA NUOVAFFT.js
 * 
 */
  //console.log(redLevel);
  //matrixFourierRedLevel = callCfft(redLevel);
  //console.log(redLevel)
  //matrixFourierRedLevel = callICfft(redLevel);
  //console.log(redLevel)

  redLevel = callCfft(redLevel);
  greenLevel = callCfft(greenLevel);
  blueLevel = callCfft(blueLevel);

//TODO: forse maxMagnitude proboca problemi in quanto mi modifica erroneamente il redLevel.
  //var imgMatrixMagnitude = getMagnitudeMatrixOneLevel(redLevel);
  //console.log(imgMatrixMagnitude);
  //context1Riga2.putImageData(imgMatrixMagnitude, 0,0);
  
 //Filtro passa basso ideale
  /*redLevelAfterFilter = filterLowPass(redLevel,dims, 40);
  blueLevelAfterFilter = filterLowPass(blueLevel,dims, 40);
  greenLevelAfterFilter = filterLowPass(greenLevel,dims, 40);
  redLevelAfterFilter = callICfft(redLevelAfterFilter);
  greenLevelAfterFilter = callICfft(greenLevelAfterFilter);
  blueLevelAfterFilter = callICfft(blueLevelAfterFilter);
  var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter); 
  context1Riga2.putImageData(imgFinal, 0,0);*/

  //Filtro gaussiano passa basso
  redLevelAfterFilter = filterLowPassGaussian(redLevel,dims, 2);
  blueLevelAfterFilter = filterLowPassGaussian(blueLevel,dims, 2);
  greenLevelAfterFilter = filterLowPassGaussian(greenLevel,dims, 2);
  redLevelAfterFilter = callICfft(redLevelAfterFilter);
  greenLevelAfterFilter = callICfft(greenLevelAfterFilter);
  blueLevelAfterFilter = callICfft(blueLevelAfterFilter);
  var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter); 
  context1Riga2.putImageData(imgFinal, 0,0);

  //Filtro passa alto ideale
  /*redLevelAfterFilter = filterHighPass(redLevel,dims, 20);
  blueLevelAfterFilter = filterHighPass(blueLevel,dims, 20);
  greenLevelAfterFilter = filterHighPass(greenLevel,dims, 20);
  redLevelAfterFilter = callICfft(redLevelAfterFilter);
  greenLevelAfterFilter = callICfft(greenLevelAfterFilter);
  blueLevelAfterFilter = callICfft(blueLevelAfterFilter);
  var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter); 
  context1Riga2.putImageData(imgFinal, 0,0);*/

  /*redLevelAfterFilter = filterAggiungiBanda(redLevel,dims, 30);
  blueLevelAfterFilter = filterAggiungiBanda(blueLevel,dims, 30);
  greenLevelAfterFilter = filterAggiungiBanda(greenLevel,dims, 30);
  redLevelAfterFilter = callICfft(redLevelAfterFilter);
  greenLevelAfterFilter = callICfft(greenLevelAfterFilter);
  blueLevelAfterFilter = callICfft(blueLevelAfterFilter);
  var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter); 
  context1Riga2.putImageData(imgFinal, 0,0);*/

  //Filtro band reject ideale
  /*redLevelAfterFilter = filterIdealBandReject(redLevel,dims, 20);
  blueLevelAfterFilter = filterIdealBandReject(blueLevel,dims, 20);
  greenLevelAfterFilter = filterIdealBandReject(greenLevel,dims, 20);
  redLevelAfterFilter = callICfft(redLevelAfterFilter);
  greenLevelAfterFilter = callICfft(greenLevelAfterFilter);
  blueLevelAfterFilter = callICfft(blueLevelAfterFilter);
  var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter); 
  contextRiga1.putImageData(imgFinal, 0,0);*/

    //Filtro band reject Butterworth
  /*redLevelAfterFilter = filterButterworthBandReject(redLevel,dims, 1, 21);
  blueLevelAfterFilter = filterButterworthBandReject(blueLevel,dims, 1, 21);
  greenLevelAfterFilter = filterButterworthBandReject(greenLevel,dims, 1, 21);
  redLevelAfterFilter = callICfft(redLevelAfterFilter);
  greenLevelAfterFilter = callICfft(greenLevelAfterFilter);
  blueLevelAfterFilter = callICfft(blueLevelAfterFilter);
  var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter); 
  context2Riga2.putImageData(imgFinal, 0,0);*/

   //Filtro band reject GAUSSIANO
   /*redLevelAfterFilter = filterGaussianBandReject(redLevel,dims, 20);
   blueLevelAfterFilter = filterGaussianBandReject(blueLevel,dims, 20);
   greenLevelAfterFilter = filterGaussianBandReject(greenLevel,dims, 20);
   redLevelAfterFilter = callICfft(redLevelAfterFilter);
   greenLevelAfterFilter = callICfft(greenLevelAfterFilter);
   blueLevelAfterFilter = callICfft(blueLevelAfterFilter);
   var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter); 
   context2Riga2.putImageData(imgFinal, 0,0);*/

    //Filtro ideal band pass
    /*redLevelAfterFilter = filterIdealBandPass(redLevel,dims, 1);
    blueLevelAfterFilter = filterIdealBandPass(blueLevel,dims, 1);
    greenLevelAfterFilter = filterIdealBandPass(greenLevel,dims, 1);
    redLevelAfterFilter = callICfft(redLevelAfterFilter);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter); 
    console.log(imgFinal);
    context2Riga2.putImageData(imgFinal, 0,0);*/

    //Filtro Gaussian band pass
    redLevelAfterFilter = filterGaussianBandPass(redLevel,dims, 2);
    blueLevelAfterFilter = filterGaussianBandPass(blueLevel,dims, 2);
    greenLevelAfterFilter = filterGaussianBandPass(greenLevel,dims, 2);
    redLevelAfterFilter = callICfft(redLevelAfterFilter);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter); 
    console.log(imgFinal);
    context2Riga2.putImageData(imgFinal, 0,0);

    
    //Filtro butterworth band pass
    redLevelAfterFilter = filterButterworthBandPass(redLevel,dims, 1, 2);
    blueLevelAfterFilter = filterButterworthBandPass(blueLevel,dims, 1, 2);
    greenLevelAfterFilter = filterButterworthBandPass(greenLevel,dims, 1, 2);
    redLevelAfterFilter = callICfft(redLevelAfterFilter);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter); 
    console.log(imgFinal);
    context2Riga2.putImageData(imgFinal, 0,0);


  //Filtro gaussiano passa basso
  /*redLevelAfterFilter = filterHighPassGaussian(redLevel,dims, 20);
  blueLevelAfterFilter = filterHighPassGaussian(blueLevel,dims, 20);
  greenLevelAfterFilter = filterHighPassGaussian(greenLevel,dims, 20);
  redLevelAfterFilter = callICfft(redLevelAfterFilter);
  greenLevelAfterFilter = callICfft(greenLevelAfterFilter);
  blueLevelAfterFilter = callICfft(blueLevelAfterFilter);
  var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter); 
  context2Riga2.putImageData(imgFinal, 0,0);*/

 //filtro passa alto Butterworth.
  /*redLevelAfterFilter = filterButterworthHighPass(redLevel,dims, 20, 2);
  blueLevelAfterFilter = filterButterworthHighPass(blueLevel,dims, 20, 2);
  greenLevelAfterFilter = filterButterworthHighPass(greenLevel,dims, 20, 2);
  redLevelAfterFilter = callICfft(redLevelAfterFilter);
  greenLevelAfterFilter = callICfft(greenLevelAfterFilter);
  blueLevelAfterFilter = callICfft(blueLevelAfterFilter);
  var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter); 
  context2Riga2.putImageData(imgFinal, 0,0);*/


  //filtro passa basso Butterworth.
  /*redLevelAfterFilter = filterButterworthLowPass(redLevel,dims, 50, 2);
  blueLevelAfterFilter = filterButterworthLowPass(blueLevel,dims, 50, 2);
  greenLevelAfterFilter = filterButterworthLowPass(greenLevel,dims, 50, 2);
  redLevelAfterFilter = callICfft(redLevelAfterFilter);
  greenLevelAfterFilter = callICfft(greenLevelAfterFilter);
  blueLevelAfterFilter = callICfft(blueLevelAfterFilter);
  var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter); 
  context2Riga2.putImageData(imgFinal, 0,0);*/

  //Aggiungi rumore sale e pepe
  /*redLevelAfterFilter = aggiungiRumorePeriodico(redLevel,dims, 10);
  blueLevelAfterFilter = aggiungiRumorePeriodico(blueLevel,dims, 10);
  greenLevelAfterFilter = aggiungiRumorePeriodico(greenLevel,dims, 10);
  redLevelAfterFilter = callICfft(redLevelAfterFilter);
  greenLevelAfterFilter = callICfft(greenLevelAfterFilter);
  blueLevelAfterFilter = callICfft(blueLevelAfterFilter);
  var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter); 
  contextRiga1.putImageData(imgFinal, 0,0);*/

  //Togli rumore sale e pepe
  /*redLevelAfterFilter = eliminaRumorePeriodico(redLevel,dims, 80);
  blueLevelAfterFilter = eliminaRumorePeriodico(blueLevel,dims, 80);
  greenLevelAfterFilter = eliminaRumorePeriodico(greenLevel,dims, 80);
  redLevelAfterFilter = callICfft(redLevelAfterFilter);
  greenLevelAfterFilter = callICfft(greenLevelAfterFilter);
  blueLevelAfterFilter = callICfft(blueLevelAfterFilter);
  var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter); 
  context2Riga2.putImageData(imgFinal, 0,0);*/

  function getMax(array){
    var max = -9911111111111;
    for(var i=0; i<array.length; i++){
      if(array[i]>max)
        max=array[i];
    }
    console.log("Il massimo è: " + max);
  }

  function getMix(array){
    var min = +99911111111111;
    for(var i=0; i<array.length; i++){
      if(array[i]<min)
      min=array[i];
    }
    console.log("Il min è: " + min);
  }

  //callICfft(redLevel);callICfft(greenLevel);callICfft(blueLevel);
  //var imgFinal = makeImage(redLevel, greenLevel, blueLevel); 
  
 // console.log(redLevelAfterFilter);



/***
 * 
 * FINE PROVA
 * 
 */


//Durata
var duration = +new Date() - start;
console.log("Durata timer globale: " + duration);

function getAntiTrasformate(matrixFourierColorLevel, colorLevel){
  var start = new Date();

    var h_primes = [];
    var $h = function(k, l) {
      if (arguments.length === 0) return h_hats;
  
      var idx = k*dims[0] + l;
      return h_hats[idx];
    };
 
    var h_hats = matrixFourierColorLevel;
  
    h_hats = Fourier.unshift(h_hats, dims);
    //console.log("Prima di invert");
    Fourier.invert(h_hats, h_primes);
    // store them in a nice function to match the math
    h_ = function(n, m) {
      if (arguments.length === 0) return h_primes;
 
      var idx = n*dims[0] + m;
      return Math.round(h_primes[idx], 2);
    };
 
    // draw the pixels
    imgMatrix2 = [];
     var xxx = 0;
    for (var n = 0; n < dims[1]; n++) {
      for (var m = 0; m < dims[0]; m++) {
        var idxInPixels = (dims[0]*n + m);
        imgMatrix2[idxInPixels] = h_(n, m);
      }
    }
    //console.log("Dentro antitrasformate: " + xxx);
    //console.log(imgMatrix2);
    //ctxs[2].putImageData(imgMatrix2, 0, 0);
    var duration = +new Date() - start;

    console.log("AntiTrasformata, colore: " + colorLevel + ", durata:" + duration);
    return imgMatrix2;
}

function getTrasformate(imgMatrix, h_hats, colorLevel){

  var start = new Date();
  console.log("Avviato timer getTrasformate");
    var h_es = []; // the h values

    var cc = 9e-3; // contrast constant


    /*for (var ai = 0; ai < imgMatrix.data.length; ai+=4) {
        // greyscale, so you only need every 4th value
        h_es.push(imgMatrix.data[ai]);
    }*/

    h_es = imgMatrix;
    
    var h = function(n, m)  {
      if (arguments.length === 0) 
        return h_es;

      var idx = n*dims[0] + m;
      return h_es[idx];
    }

    Fourier.transform(h(), h_hats);
    if(colorLevel == 0)
      MatrixFourierRedLevel = h_hats = Fourier.shift(h_hats, dims);
    else if(colorLevel == 1)
      MatrixFourierGreenLevel = h_hats = Fourier.shift(h_hats, dims);
    else if(colorLevel == 2)
     MatrixFourierBlueLevel = h_hats = Fourier.shift(h_hats, dims);

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
 

    var $h = function(k, l) {
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
    //console.log(h_hats);
    /*******************
    *     SI POTREBBE ANCHE TOGLIERE IL CICLO SOTTO.    
    */
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
    var duration = +new Date() - start;

    console.log("Trasformata colore " + colorLevel + ", durata: " + duration);

    return imgMatrix2;

  /**/
}

/************************************** AGGIUNGERE IL CALCOLO DEI TRE CANALI IN UN COLPO IN MODO DA FARMI TIRARE FUORI DIRETTAMENTE IL MAGNITUDO A COLORI E 
 * DI CONSEGUENZA EVITARE 6 CICLI MA FARNE SOLO 2. 

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

*/



function getMagnitudeMatrixOneLevel(complexMatrix) {
    //console.log(complex);
    var cc = 9e-3; // contrast constant

    imgMatrixMagnitude = new ImageData(dims[0], dims[1]);
    //Massimo magnitudo per normalizzare i valori:
    var maxMagnitude = getMaxMagnitude(complexMatrix);
    console.log("Max magnitude vale: " + maxMagnitude);
    for (var k = 0; k < dims[1]; k++) {
      for (var l = 0; l < dims[0]; l++) {
        var idxInPixels = 4*(dims[0]*k + l);
        sqrt =  Math.log(cc*getMagnitude(complexMatrix[k*dims[0] + l])+1);
        sqrt = Math.trunc(255*(sqrt/maxMagnitude));
        imgMatrixMagnitude.data[idxInPixels] = sqrt; 
        imgMatrixMagnitude.data[idxInPixels+1] = sqrt;
        imgMatrixMagnitude.data[idxInPixels+2] = sqrt;
        imgMatrixMagnitude.data[idxInPixels+3] = 255;//alpha channel
      }
    }
   return imgMatrixMagnitude;  
}

function getMagnitude(complex){
  return Math.sqrt(complex.re*complex.re + complex.im*complex.im);
}

function getMaxMagnitude(imgMatrixFrequenceDomain){
    var maxMagnitude = 0;
    var cc = 9e-3; // contrast constant
    for (var ai = 0; ai < imgMatrixFrequenceDomain.length; ai++) {
      var mag = getMagnitude(imgMatrixFrequenceDomain[ai]);
      if (mag > maxMagnitude) {
        maxMagnitude = mag;
      }
    }
    return Math.log(cc*maxMagnitude+1);
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
    var cont = 0;
    level = [];
    for (i = 0; i < imgMatrix.data.length; i += 4) {
        level[cont] = imgMatrix.data[i + colorLevel];
        cont++;
    }
    //console.log("Estratto colore N° " + colorLevel);
    return level;
}

function makeImage(redLevel, greenLevel, blueLevel){
  //console.log("Red level vale: " ); console.log(redLevel.length)
    var start = new Date();
    imgMatrix = new ImageData(dims[0],dims[1]);
    var cont = 0;
    for (i = 0; i < redLevel.length * 4; i += 4) {
        imgMatrix.data[i] = redLevel[cont];
        imgMatrix.data[i+1] = greenLevel[cont];
        imgMatrix.data[i+2] = blueLevel[cont];
        imgMatrix.data[i+3] = 255;
        cont++;
    }
    //console.log("Alla fine cont vale: " + cont)
    var duration = +new Date() - start;
    console.log("Dentro makeImageFunction, è durata: " + duration);
    return imgMatrix;
}

function makeImageFromAntitrasformate(redLevel, greenLevel, blueLevel){
  //console.log("Red level vale: " ); 
  //console.log(redLevel);console.log(greenLevel);console.log(blueLevel)
  imgMatrix = new ImageData(dims[0],dims[1]);
  var cont = 0;
  for (i = 0; i < dims[0] * dims[1] * 4; i += 4) {
        imgMatrix.data[i] = redLevel[i];
        imgMatrix.data[i+1] = greenLevel[i+1];
        imgMatrix.data[i+2] = blueLevel[i+2];
        imgMatrix.data[i+3] = 255;
        cont++;
    }
    //console.log("Alla fine cont vale: " + cont)
    imgMatrix = redLevel;
    return imgMatrix;
}
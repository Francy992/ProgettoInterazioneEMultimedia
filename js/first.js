//TODO: slider max variabile in base alla dimensione dell'immagine selezionata.
//TODO: ridimensionare l'immagine se ne viene scelta una troppo grande.
//TODO: permettere la scelta dell'immagine
//TODO: inserire doppio slider per filtro speciale.
//TODO: inserire min value e max value nel box di elimina banda


//slider: 
var sliderLowPass = $("#slider_low_pass").slider();
var sliderHighPass = $("#slider_high_pass").slider();

//Vari livelli dell'immagine. Soltanto i valori, è un array e non un'immagine.
var redLevel = [];
var greenLevel = [];
var blueLevel = [];
//Matrice contenente tutti i valori dei vari livelli della trasformata (non è un'immagine e contiene i complessi)
var matrixFourierRedLevel = [];
var matrixFourierGreenLevel = [];
var matrixFourierBlueLevel = [];

//Global frequency
var lowPassFrequency = 1;
var highPassFrequency = 1;

//Immagine originale e variabile dimensioni globale.
var imgRiga1 = document.getElementById("imgRiga1");
var dims = [imgRiga1.width,imgRiga1.height];

//Creo le variabili canvas, imagine e context
var canvas1Riga1 = document.getElementById("canvas1Riga1");
canvas1Riga1.width = dims[0];
canvas1Riga1.height = dims[1];
var context1Riga1 = canvas1Riga1.getContext("2d");

var canvas1Riga2 = document.getElementById("canvas1Riga2");
canvas1Riga2.width = dims[0];
canvas1Riga2.height = dims[1];
var context1Riga2 = canvas1Riga2.getContext("2d");

var canvas2Riga2 = document.getElementById("canvas2Riga2");
canvas2Riga2.width = dims[0];
canvas2Riga2.height = dims[1];
var context2Riga2 = canvas2Riga2.getContext("2d");


//context1Riga2.drawImage(imgRiga1,0,0);
//context2Riga2.drawImage(imgRiga1,0,0);

//Estraggo la matrice da context e ci lavoro
//La matrice è composta da NxNx4 pixel dove NxN sono i pixel dell'immagine e 4 sono i canali, compreso alpha




  
  
  //setMagnitudeSingleChannelToContext(greenLevel, dims, context2Riga2);


$( document ).ready(function() {

    /**
     * Slider section
     */

  sliderLowPass.on("change", function(val){
    console.log(this.id,val.value.newValue);
  });

  sliderHighPass.on("change", function(val){
    console.log(this.id,val.value.newValue);
  });
  //Draw temporany matrix
  context1Riga1.drawImage(imgRiga1,0,0);
  var imgMatrixOriginal = context1Riga1.getImageData(0, 0, imgRiga1.width, imgRiga1.height);
  //Get single level of spatial domain
  redLevel = getLevel(imgMatrixOriginal, 0);
  greenLevel = getLevel(imgMatrixOriginal, 1);
  blueLevel = getLevel(imgMatrixOriginal, 2);
  //Get single level of frequency domain
  matrixFourierRedLevel = callCfft(redLevel, dims);
  matrixFourierGreenLevel = callCfft(greenLevel, dims);
  matrixFourierBlueLevel = callCfft(blueLevel, dims);

  //call method:
  //setMagnitudeToContext(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, context1Riga1, "Magnitudo RGB."); 
  //LowPass
  //idealLowPass(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 25, context1Riga1, "Filtro low pass ideale");
  //gaussianLowPass(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 5, context1Riga2, "Filtro low pass gaussiano");
  //butterworthLowPass(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 5, 2, context1Riga2, "Filtro low pass butterworth");
  
  //HighPass
  //idealHighPass(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 21, context1Riga2, "Filtro high pass ideale");
  //gaussianHighPass(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 3, context2Riga2, "Filtro high pass gaussiano");
  //butterworthHighPass(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 5, 2, context1Riga2, "Filtro high pass butterworth");

  //BandReject
  //idealBandReject(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 1, context2Riga2, "Filtro band reject ideale");
  //gaussianBandReject(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 3, context2Riga2, "Filtro band reject gaussiano");
  //butterworthBandReject(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 5, 2, context1Riga2, "Filtro band reject butterworth");

  //PassBand
  idealBandPass(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 3, context2Riga2, "Filtro passa banda ideale");
  //gaussianBandPass(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 3, context2Riga2, "Filtro passa banda gaussiano");
  butterworthBandPass(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 5, 2, context1Riga2, "Filtro passa banda butterworth");

  //SpecialFilter
  //doublePassBand(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 3, 15, context2Riga2, "Filtro mix passa alto e passa basso");
  //setMagnitudeToContext(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, context1Riga1, "Magnitudo RGB."); 
  //setMagnitudeSingleChannelToContext(matrixFourierRedLevel, dims, context1Riga1, "Magnitudo canale rosso."); 
  //setMagnitudeSingleChannelToContext(matrixFourierBlueLevel, dims, context1Riga2, "Magnitudo canale blue."); 
  //setMagnitudeSingleChannelToContext(matrixFourierGreenLevel, dims, context1Riga1, "Magnitudo canale verde."); 

});



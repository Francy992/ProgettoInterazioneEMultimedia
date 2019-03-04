
/**
 * How to function:
 * filterXXXXX function apply the real filter in the fastFourierTransformateAndFilter.js file.
 * So, with callICfft we move to the spatial domain and then we render Image from three different level with makeImage method. 
 * Finally we put image in context passed from variable. 
 */
 //Matrix that contains pixel after applying the filter
    var redLevelAfterFilter = [];
    var greenLevelAfterFilter = [];
    var blueLevelAfterFilter = [];

 
 /* 
 *  LOW PASS FILTER
 * 
 * @param {Red level in the frequencys domain} redLevel 
 * @param {Blue level in the frequencys domain} blueLevel 
 * @param {Green level in the frequencys domain} greenLevel 
 * @param {Array that contains width and height of the image} dims 
 * @param {Cut frequency} frequency 
 * @param {Order for the Butterworth filter} order 
 * @param {Context javascript object for put image data} context 
 */
function idealLowPass(redLevel, blueLevel, greenLevel, dims, frequency, context, message){
    var start = new Date();
    redLevelAfterFilter = filterLowPass(redLevel,dims, frequency);
    blueLevelAfterFilter = filterLowPass(blueLevel,dims, frequency);
    greenLevelAfterFilter = filterLowPass(greenLevel,dims, frequency);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims);
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);     
    $("#down"+context.canvas.id+" span").text("Download " + message);     
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");     
    $("#down"+context.canvas.id).parent("a").show();
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("IdealLowPass: " + duration + "ms");
  }


  function gaussianLowPass(redLevel, blueLevel, greenLevel, dims, frequency, context, message){
    var start = new Date();
    redLevelAfterFilter = filterLowPassGaussian(redLevel,dims, frequency);
    blueLevelAfterFilter = filterLowPassGaussian(blueLevel,dims, frequency);
    greenLevelAfterFilter = filterLowPassGaussian(greenLevel,dims, frequency);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);     
    $("#down"+context.canvas.id+" span").text("Download " + message);     
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");     
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("GaussianLowPass: " + duration + "ms");
  }

  function butterworthLowPass(redLevel, blueLevel, greenLevel, dims, frequency, order, context, message){
    var start = new Date();
    redLevelAfterFilter = filterButterworthLowPass(redLevel,dims, frequency, order);
    blueLevelAfterFilter = filterButterworthLowPass(blueLevel,dims, frequency, order);
    greenLevelAfterFilter = filterButterworthLowPass(greenLevel,dims, frequency, order);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);     
    $("#down"+context.canvas.id+" span").text("Download " + message);     
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");     
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("ButterworthLowPass: " + duration + "ms");
  }
  
  

  /**
 * 
 *  HIGH PASS FILTER
 * 
 * @param {Red level in the frequencys domain} redLevel 
 * @param {Blue level in the frequencys domain} blueLevel 
 * @param {Green level in the frequencys domain} greenLevel 
 * @param {Array that contains width and height of the image} dims 
 * @param {Cut frequency} frequency 
 * @param {Order for the Butterworth filter} order 
 * @param {Context javascript object for put image data} context 
 */
function idealHighPass(redLevel, blueLevel, greenLevel, dims, frequency, context, message){
    var start = new Date();
    redLevelAfterFilter = filterHighPass(redLevel,dims, frequency);
    blueLevelAfterFilter = filterHighPass(blueLevel,dims, frequency);
    greenLevelAfterFilter = filterHighPass(greenLevel,dims, frequency);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);    
    $("#down"+context.canvas.id+" span").text("Download " + message);    
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");     
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("IdealHighPass: " + duration + "ms");
  }
  

  function gaussianHighPass(redLevel, blueLevel, greenLevel, dims, frequency, context, message){
    var start = new Date();
    redLevelAfterFilter = filterHighPassGaussian(redLevel,dims, frequency);
    blueLevelAfterFilter = filterHighPassGaussian(blueLevel,dims, frequency);
    greenLevelAfterFilter = filterHighPassGaussian(greenLevel,dims, frequency);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);     
    $("#down"+context.canvas.id+" span").text("Download " + message);     
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");     
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("GaussianHighPass: " + duration + "ms");
  }

  function butterworthHighPass(redLevel, blueLevel, greenLevel, dims, frequency, order, context, message){
    var start = new Date();
    redLevelAfterFilter = filterButterworthHighPass(redLevel,dims, frequency, order);
    blueLevelAfterFilter = filterButterworthHighPass(blueLevel,dims, frequency, order);
    greenLevelAfterFilter = filterButterworthHighPass(greenLevel,dims, frequency, order);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);     
    $("#down"+context.canvas.id+" span").text("Download " + message);     
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");     
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("ButterworthHighPass: " + duration + "ms");
  }
  

  
  /**
 * 
 *  BAND REJECT FILTER
 * 
 * @param {Red level in the frequencys domain} redLevel 
 * @param {Blue level in the frequencys domain} blueLevel 
 * @param {Green level in the frequencys domain} greenLevel 
 * @param {Array that contains width and height of the image} dims 
 * @param {Cut frequency} frequency 
 * @param {Order for the Butterworth filter} order 
 * @param {Context javascript object for put image data} context 
 * 
 */
function idealBandReject(redLevel, blueLevel, greenLevel, dims,  frequencyLow, frequencyHigh, context, message){
    var start = new Date();
    redLevelAfterFilter = filterIdealBandReject(redLevel,dims, frequencyLow, frequencyHigh);
    blueLevelAfterFilter = filterIdealBandReject(blueLevel,dims, frequencyLow, frequencyHigh);
    greenLevelAfterFilter = filterIdealBandReject(greenLevel,dims, frequencyLow, frequencyHigh);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);     
    $("#down"+context.canvas.id+" span").text("Download " + message);     
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");     
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("IdealBandReject: " + duration + "ms");
  }
  

  function gaussianBandReject(redLevel, blueLevel, greenLevel, dims, frequencyLow, frequencyHigh, context, message){
    var start = new Date();
    redLevelAfterFilter = filterGaussianBandReject(redLevel,dims, frequencyLow, frequencyHigh);
    blueLevelAfterFilter = filterGaussianBandReject(blueLevel,dims, frequencyLow, frequencyHigh);
    greenLevelAfterFilter = filterGaussianBandReject(greenLevel,dims, frequencyLow, frequencyHigh);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);     
    $("#down"+context.canvas.id+" span").text("Download " + message);     
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");     
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("GaussianBandReject: " + duration + "ms");
  }

  function butterworthBandReject(redLevel, blueLevel, greenLevel, dims, frequencyLow, frequencyHigh, order, context, message){
    var start = new Date();
    redLevelAfterFilter = filterButterworthBandReject(redLevel,dims, frequencyLow, frequencyHigh, order);
    blueLevelAfterFilter = filterButterworthBandReject(blueLevel,dims, frequencyLow, frequencyHigh, order);
    greenLevelAfterFilter = filterButterworthBandReject(greenLevel,dims, frequencyLow, frequencyHigh, order);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);     
    $("#down"+context.canvas.id+" span").text("Download " + message);     
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");     
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("ButterworthBandReject: " + duration + "ms");
  }

  
  
  /**
 * 
 *  BAND PASS FILTER
 * 
 * @param {Red level in the frequencys domain} redLevel 
 * @param {Blue level in the frequencys domain} blueLevel 
 * @param {Green level in the frequencys domain} greenLevel 
 * @param {Array that contains width and height of the image} dims 
 * @param {Cut frequency} frequency 
 * @param {Order for the Butterworth filter} order 
 * @param {Context javascript object for put image data} context 
 * 
 */
function idealBandPass(redLevel, blueLevel, greenLevel, dims, frequencyLow, frequencyHigh, context, message){
    var start = new Date();
    redLevelAfterFilter = filterIdealBandPass(redLevel,dims, frequencyLow, frequencyHigh);
    blueLevelAfterFilter = filterIdealBandPass(blueLevel,dims, frequencyLow, frequencyHigh);
    greenLevelAfterFilter = filterIdealBandPass(greenLevel,dims, frequencyLow, frequencyHigh);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);     
    $("#down"+context.canvas.id+" span").text("Download " + message);    
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");     
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("IdealBandPass: " + duration + "ms");
  }
  

  function gaussianBandPass(redLevel, blueLevel, greenLevel, dims, frequencyLow, frequencyHigh, context, message){
    var start = new Date();
    redLevelAfterFilter = filterGaussianBandPass(redLevel, dims, frequencyLow, frequencyHigh);
    blueLevelAfterFilter = filterGaussianBandPass(blueLevel, dims, frequencyLow, frequencyHigh);
    greenLevelAfterFilter = filterGaussianBandPass(greenLevel, dims, frequencyLow, frequencyHigh);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);     
    $("#down"+context.canvas.id+" span").text("Download " + message);     
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");     
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("GaussianBandPass: " + duration + "ms");
  }

  function butterworthBandPass(redLevel, blueLevel, greenLevel, dims, frequencyLow, frequencyHigh, order, context, message){
    var start = new Date();
    redLevelAfterFilter = filterButterworthBandPass(redLevel,dims, frequencyLow, frequencyHigh, order);
    blueLevelAfterFilter = filterButterworthBandPass(blueLevel,dims, frequencyLow, frequencyHigh, order);
    greenLevelAfterFilter = filterButterworthBandPass(greenLevel,dims, frequencyLow, frequencyHigh, order);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);     
    $("#down"+context.canvas.id+" span").text("Download " + message);     
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");     
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("ButterworthBandPass: " + duration + "ms");
  }
  
   /**
 * 
 *  Return magnitude image to color
 * 
 * @param {Red level in the frequencys domain} redLevel 
 * @param {Blue level in the frequencys domain} blueLevel 
 * @param {Green level in the frequencys domain} greenLevel 
 * @param {Array that contains width and height of the image} dims 
 * @param {Order for the Butterworth filter} order 
 * @param {Context javascript object for put image data} context 
 * @param {Message for the canvas's label} message 
 * 
 */
function setMagnitudeToContext(redLevel, blueLevel, greenLevel, dims, context, message){
    var start = new Date();
    redLevelAfterFilter = getMagnitudeImage(redLevel,dims);
    blueLevelAfterFilter = getMagnitudeImage(blueLevel,dims);
    greenLevelAfterFilter = getMagnitudeImage(greenLevel,dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);     
    $("#down"+context.canvas.id+" span").text("Download " + message);     
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");     
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("SetMagnitudeToContext: " + duration + "ms");
    return imgFinal;
}

function setMagnitudeSingleChannelToContext(colorLevel, dims, context, message){
    var start = new Date();
    colorLevelAfterFilter = getMagnitudeImage(colorLevel,dims);
    var imgFinal = makeImageGreyScale(colorLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);     
    $("#down"+context.canvas.id+" span").text("Download " + message);     
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("SetMagnitudeSingleChannelToContext: " + duration + "ms");
    return colorLevelAfterFilter;
  }
  
  function setCirclePassBand(redLevel, greenLevel, blueLevel, dims, frequencyLowPass, frequencyHighPass, context, message){
        var start = new Date();
        redLevelAfterFilter = printMagnitudeCirclePassBand(redLevel, dims, frequencyLowPass, frequencyHighPass);
        greenLevelAfterFilter = printMagnitudeCirclePassBand(greenLevel,dims, frequencyLowPass, frequencyHighPass);
        blueLevelAfterFilter = printMagnitudeCirclePassBand(blueLevel,dims, frequencyLowPass, frequencyHighPass);
        var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
        context.putImageData(imgFinal, 0,0);
        $("#"+context.canvas.id).prev().text(message);     
        $("#down"+context.canvas.id+" span").text("Download " + message);     
        $("#down"+context.canvas.id).parent("a").attr("download",message+".png");
        $("#down"+context.canvas.id).parent("a").show();
        var duration = +new Date() - start;
        console.log("setCircle Pass Band: " + duration + "ms");
  }


  function setCircleBandReject(redLevel, greenLevel, blueLevel, dims, frequencyLowPass, frequencyHighPass, context, message){
    var start = new Date();
    redLevelAfterFilter = printMagnitudeCircleBandReject(redLevel, dims, frequencyLowPass, frequencyHighPass);
    greenLevelAfterFilter = printMagnitudeCircleBandReject(greenLevel,dims, frequencyLowPass, frequencyHighPass);
    blueLevelAfterFilter = printMagnitudeCircleBandReject(blueLevel,dims, frequencyLowPass, frequencyHighPass);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);     
    $("#down"+context.canvas.id+" span").text("Download " + message);     
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("setCircle Band Reject: " + duration + "ms");
}




  function addRandomNoise(redLevel, greenLevel, blueLevel, dims, context, message){
    var start = new Date();
    console.log(dims);
    var pixelArray = makeImageFromThreeMatrixColorInt(redLevel, greenLevel, blueLevel, dims);
    functionAddRandomNoise(pixelArray);
    console.log(pixelArray);
    console.log("Prima di rompersi", dims);
    var imgFinal = makeImageFromOneArrayColor(pixelArray, dims); 
    console.log(imgFinal);
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);     
    $("#down"+context.canvas.id+" span").text("Download " + message);     
    $("#down"+context.canvas.id).parent("a").attr("download",message+".png");
    $("#down"+context.canvas.id).parent("a").show();
    var duration = +new Date() - start;
    console.log("AddRandomNoise: " + duration + "ms");
  }

    /**
     * 
     *  Support function
     * 
     * @param {Red level in the frequencys domain} redLevel 
     * @param {Blue level in the frequencys domain} blueLevel 
     * @param {Green level in the frequencys domain} greenLevel 
     * @param {Array that contains width and height of the image} dims
     * 
     */



  //Make image from three different level color. Return ImageData object.
  function makeImage(redLevel, greenLevel, blueLevel, dims){
    console.log(dims);
      var start = new Date();
      imgMatrix = new ImageData(dims[0],dims[1]);
      var cont = 0;
      for (i = 0; i <dims[0] * dims[1] * 4; i += 4) {
          imgMatrix.data[i] = redLevel[cont];
          imgMatrix.data[i+1] = greenLevel[cont];
          imgMatrix.data[i+2] = blueLevel[cont];
          imgMatrix.data[i+3] = 255;
          cont++;
      }
      var duration = +new Date() - start;
      console.log("MakeImage: " + duration + "ms");
      return imgMatrix;
  }

  //Make image from one array with color. Return ImageData object.
  function makeImageFromOneArrayColor(arrayColor, dims){
    console.log(dims);
      var start = new Date();
      imgMatrix = new ImageData(dims[0],dims[1]);
      for (i = 0; i <dims[0] * dims[1] * 4; i++) {
          imgMatrix.data[i] = arrayColor[i];
      }
      var duration = +new Date() - start;
      console.log("MakeImage: " + duration + "ms");
      return imgMatrix;
  }

  

  //Make image from three different level color. Return ImageData object.
  function makeImageGreyScale(colorLevel, dims){
    var start = new Date();
    imgMatrix = new ImageData(dims[0],dims[1]);
    var cont = 0;
    for (i = 0; i < dims[0] * dims[1] * 4; i += 4) {
        imgMatrix.data[i] = colorLevel[cont];
        imgMatrix.data[i+1] = colorLevel[cont];
        imgMatrix.data[i+2] = colorLevel[cont];
        imgMatrix.data[i+3] = 255;
        cont++;
    }
    var duration = +new Date() - start;
    console.log("MakeImageGreyScale: " + duration + "ms");
    return imgMatrix;
}


//Make array of color number from three matrix of color.
function makeImageFromThreeMatrixColorInt(redLevel, greenLevel, blueLevel, dims){
  var start = new Date();
  imgMatrix = [];
  var cont = 0;
  for (i = 0; i <dims[0] * dims[1] * 4; i += 4) {
      imgMatrix[i] = redLevel[cont];
      imgMatrix[i+1] = greenLevel[cont];
      imgMatrix[i+2] = blueLevel[cont];
      imgMatrix[i+3] = 255;
      cont++;
  }
  var duration = +new Date() - start;
  console.log("MakeImage: " + duration + "ms");
  return imgMatrix;
}

//colorLevel: 0 == RedLevel, 1 == GreenLevel, 2==BlueLevel, 3==alphaLevel. imgMatrix is a imageData type.
function getLevel(imgMatrix, colorLevel){
    if(colorLevel < 0 || colorLevel > 3){
        console.log("Error in to getLevel");
        return [];
    }
    var cont = 0;
    level = [];
    for (i = 0; i < imgMatrix.data.length; i += 4) {
        level[cont] = imgMatrix.data[i + colorLevel];
        cont++;
    }
    return level;
}


/***
 * Print circle on magnitude
 */

function printMagnitudeCircleIdealPassBand(amplitudes, dims, lowFrequency, highFrequency){
  console.log(amplitudes);
  var N = dims[1];
  var M = dims[0];
  var newArray = [];
  for (var k = 0; k < N; k++) {
    for (var l = 0; l < M; l++) {
      var idx = (k*M + l);
      var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
      var pass = false;
      if(lowFrequency.constructor == Array){//BandReject and BandPass case.
        for(var i = 0; i < lowFrequency.length; i++){
          var d0 = Math.pow(lowFrequency[i], 2);
          var d1 = Math.pow(highFrequency[i], 2);
          if(duv < d0 || duv > d1){
            pass = false;
          }
          else{//If we find one frequency that pass then we stop and assign this magnitudo, else we assign zero. 
            pass = true;
            break;
          }          
        }
        if(!pass){
          newArray[idx] = 0;
        }
        else{
          newArray[idx] = amplitudes[idx];
        }
      }
      else{//LowPass and HighPass case
        var d0 = Math.pow(lowFrequency, 2);
        var d1 = Math.pow(highFrequency, 2);
        if(duv < d0 || duv > d1){
          newArray[idx] = 0;
        }
        else{//If we find one frequency that pass then we stop and assign this magnitudo, else we assign zero. 
          newArray[idx] = amplitudes[idx];
        }
      }
    }
  }
  return newArray;
}


function printMagnitudeCircleGaussian(amplitudes, dims, lowFrequency, highFrequency){
  var N = dims[1];
  var M = dims[0];
  var newArray = [];
  for (var k = 0; k < N; k++) {
    for (var l = 0; l < M; l++) {

      if(lowFrequency.constructor == Array){//BandReject and BandPass case.{

      }
      else{//Low/High pass case
        var idx = (k*M + l);
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        var huv1 = 0; var huv = 0;
        var lowPassSq = Math.pow(lowFrequency, 2);
        var highPassSq = Math.pow(highFrequency, 2);
        if((2*highPassSq*highPassSq) != 0)
            huv1 = Math.pow(Math.E, (-(duv*duv)/(2*highPassSq*highPassSq)));
        if ((2*lowPassSq*lowPassSq) != 0)
            huv =  Math.pow(Math.E, (-(duv*duv)/(2*lowPassSq*lowPassSq)));
        var huv2 = 1 - (huv1-huv);
        newArray[idx] = parseInt(amplitudes[idx] * huv2);
      }      
    }
  }
  return newArray;
}


function printMagnitudeCircleButterworth(amplitudes, dims, lowFrequency, highFrequency){
  var N = dims[1];
  var M = dims[0];
  var newArray = [];
  for (var k = 0; k < N; k++) {
    for (var l = 0; l < M; l++) {
      if(lowFrequency.constructor == Array){//BandReject and BandPass case.{

      }
      else{//Low/High pass case
        var idx = (k*M + l);
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        var huv1 = 0; var huv = 0;
        var lowPassSq = Math.pow(lowFrequency, 2);
        var highPassSq = Math.pow(highFrequency, 2);
        if(highPassSq != 0)
          huv1 = 1/(1+(Math.pow((duv/highPassSq),2*order)));
        if(lowPassSq != 0)
          huv =  1/(1+(Math.pow((duv/lowPassSq),2*order)));
        var huv2 = 1 - (huv1 - huv);
        newArray[idx] = parseInt(amplitudes[idx] * huv2);
      }
    }
  }
  return newArray;
}



function printMagnitudeCircleBandReject(amplitudes, dims, lowFrequency, highFrequency){
    var d0 = Math.pow(lowFrequency, 2);
    var d1 = Math.pow(highFrequency, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = (k*M + l);
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        for(var i = 0; i < lowFrequency.length; i++){
          var d0 = Math.pow(lowFrequency[i], 2);
          var d1 = Math.pow(highFrequency[i], 2);
          if(duv > d0 && duv < d1){
            newArray[idx] = 0;
            break;
          }
          else{
            newArray[idx] = amplitudes[idx];
          }
        }
        /*if (duv > d0 && duv < d1) {
            newArray[idx] = 0;
        }
        else {
            newArray[idx] = amplitudes[idx];
        }*/
      }
    }
    return newArray;
}

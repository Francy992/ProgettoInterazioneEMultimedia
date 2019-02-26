
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
    var duration = +new Date() - start;
    console.log("IdealLowPass: " + duration);
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
    var duration = +new Date() - start;
    console.log("GaussianLowPass: " + duration);
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
    var duration = +new Date() - start;
    console.log("ButterworthLowPass: " + duration);
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
    var duration = +new Date() - start;
    console.log("IdealHighPass: " + duration);
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
    var duration = +new Date() - start;
    console.log("GaussianHighPass: " + duration);
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
    var duration = +new Date() - start;
    console.log("ButterworthHighPass: " + duration);
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
function idealBandReject(redLevel, blueLevel, greenLevel, dims, frequency, context, message){
    var start = new Date();
    redLevelAfterFilter = filterIdealBandReject(redLevel,dims, frequency);
    blueLevelAfterFilter = filterIdealBandReject(blueLevel,dims, frequency);
    greenLevelAfterFilter = filterIdealBandReject(greenLevel,dims, frequency);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);
    var duration = +new Date() - start;
    console.log("IdealBandReject: " + duration);
  }
  

  function gaussianBandReject(redLevel, blueLevel, greenLevel, dims, frequency, context, message){
    var start = new Date();
    redLevelAfterFilter = filterGaussianBandReject(redLevel,dims, frequency);
    blueLevelAfterFilter = filterGaussianBandReject(blueLevel,dims, frequency);
    greenLevelAfterFilter = filterGaussianBandReject(greenLevel,dims, frequency);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);
    var duration = +new Date() - start;
    console.log("GaussianBandReject: " + duration);
  }

  function butterworthBandReject(redLevel, blueLevel, greenLevel, dims, frequency, order, context, message){
    var start = new Date();
    redLevelAfterFilter = filterButterworthBandReject(redLevel,dims, frequency, order);
    blueLevelAfterFilter = filterButterworthBandReject(blueLevel,dims, frequency, order);
    greenLevelAfterFilter = filterButterworthBandReject(greenLevel,dims, frequency, order);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);
    var duration = +new Date() - start;
    console.log("ButterworthBandReject: " + duration);
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
function idealBandPass(redLevel, blueLevel, greenLevel, dims, frequency, context, message){
    var start = new Date();
    redLevelAfterFilter = filterIdealBandPass(redLevel,dims, frequency);
    blueLevelAfterFilter = filterIdealBandPass(blueLevel,dims, frequency);
    greenLevelAfterFilter = filterIdealBandPass(greenLevel,dims, frequency);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);
    var duration = +new Date() - start;
    console.log("IdealBandPass: " + duration);
  }
  

  function gaussianBandPass(redLevel, blueLevel, greenLevel, dims, frequency, context, message){
    var start = new Date();
    redLevelAfterFilter = filterGaussianBandPass(redLevel,dims, frequency);
    blueLevelAfterFilter = filterGaussianBandPass(blueLevel,dims, frequency);
    greenLevelAfterFilter = filterGaussianBandPass(greenLevel,dims, frequency);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);
    var duration = +new Date() - start;
    console.log("GaussianBandPass: " + duration);
  }

  function butterworthBandPass(redLevel, blueLevel, greenLevel, dims, frequency, order, context, message){
    var start = new Date();
    redLevelAfterFilter = filterButterworthBandPass(redLevel,dims, frequency, order);
    blueLevelAfterFilter = filterButterworthBandPass(blueLevel,dims, frequency, order);
    greenLevelAfterFilter = filterButterworthBandPass(greenLevel,dims, frequency, order);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    console.log(imgFinal);
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);
    var duration = +new Date() - start;
    console.log("ButterworthBandPass: " + duration);
  }
  

  function doublePassBand(redLevel, blueLevel, greenLevel, dims, frequencyLowPass, frequencyHighPass, context, message){
    var start = new Date();
    redLevelAfterFilter = filterGaussianBandPass(redLevel,dims, frequencyLowPass, frequencyHighPass);
    blueLevelAfterFilter = filterGaussianBandPass(blueLevel,dims, frequencyLowPass, frequencyHighPass);
    greenLevelAfterFilter = filterGaussianBandPass(greenLevel,dims, frequencyLowPass, frequencyHighPass);
    redLevelAfterFilter = callICfft(redLevelAfterFilter, dims);
    greenLevelAfterFilter = callICfft(greenLevelAfterFilter, dims);
    blueLevelAfterFilter = callICfft(blueLevelAfterFilter, dims);
    var imgFinal = makeImage(redLevelAfterFilter, greenLevelAfterFilter, blueLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);
    var duration = +new Date() - start;
    console.log("DoublePassBand: " + duration);
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
    var duration = +new Date() - start;
    console.log("SetMagnitudeToContext: " + duration);
}

function setMagnitudeSingleChannelToContext(colorLevel, dims, context, message){
    var start = new Date();
    colorLevelAfterFilter = getMagnitudeImage(colorLevel,dims);
    var imgFinal = makeImageGreyScale(colorLevelAfterFilter, dims); 
    context.putImageData(imgFinal, 0,0);
    $("#"+context.canvas.id).prev().text(message);
    var duration = +new Date() - start;
    console.log("SetMagnitudeSingleChannelToContext: " + duration);
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
      console.log("MakeImage: " + duration);
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
    console.log("MakeImage: " + duration);
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




  


  
  
  


  


  
  


  


  
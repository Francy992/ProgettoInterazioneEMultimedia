
/**
 * Complex object
 */
function Complex(re, im) 
{
  this.re = re;
	this.im = im || 0.0;
}
Complex.prototype.add = function(other, dst)
{
	dst.re = this.re + other.re;
	dst.im = this.im + other.im;
	return dst;
}
Complex.prototype.sub = function(other, dst)
{
	dst.re = this.re - other.re;
	dst.im = this.im - other.im;
	return dst;
}
Complex.prototype.mul = function(other, dst)
{
	//cache re in case dst === this
	var r = this.re * other.re - this.im * other.im;
	dst.im = this.re * other.im + this.im * other.re;
	dst.re = r;
	return dst;
}
Complex.prototype.cexp = function(dst)
{
	var er = Math.exp(this.re);
	dst.re = er * Math.cos(this.im);
	dst.im = er * Math.sin(this.im);
	return dst;
}

/**
 * @param {matrix of spatial domain image} amplitudes 
 */

function icfft(amplitudes)
{
	var N = amplitudes.length;
	var iN = 1 / N;
 
	//conjugate if imaginary part is not 0
	for(var i = 0 ; i < N; ++i)
		if(amplitudes[i] instanceof Complex)
			amplitudes[i].im = -amplitudes[i].im;
 
	//apply fourier transform
	amplitudes = cfft(amplitudes)
 
	for(i = 0 ; i < N; ++i)
	{
		//conjugate again
		amplitudes[i].im = -amplitudes[i].im;
		//scale
		amplitudes[i].re *= iN;
		amplitudes[i].im *= iN;
	}
	return amplitudes;
}
 
function cfft(amplitudes)
{
  var N = amplitudes.length;
	if( N <= 1 )
		return amplitudes;
 
	var hN = parseInt(N / 2);
	var even = [];
  var odd = [];
  even.length = hN;
  odd.length = hN;
	for(var i = 0; i < hN; ++i)
	{
		even[i] = amplitudes[i*2];
		odd[i] = amplitudes[i*2+1];
  }

	even = cfft(even);
	odd = cfft(odd);

	var a = -2*Math.PI;
	for(var k = 0; k < hN; ++k)
	{
		if(!(even[k] instanceof Complex))
			even[k] = new Complex(even[k], 0);
		if(!(odd[k] instanceof Complex))
			odd[k] = new Complex(odd[k], 0);
		var p = k/N;
		var t = new Complex(0, a * p);
		t.cexp(t).mul(odd[k], t);
		amplitudes[k] = even[k].add(t, odd[k]);
		amplitudes[k + hN] = even[k].sub(t, even[k]);
    }
    
	return amplitudes;
}

/**
 * Support function for position shift after fast fourier transformate
 * @param {matrix of frequency domain image} transform 
 * @param {dimension of matrix} dims 
 */
function shiftFFT(transform, dims) {
  return flipRightHalf(
    halfShiftFFT(
      halfShiftFFT(
        transform,
        dims
      ),
      dims
    ),
    dims
  );
}

function unshiftFFT(transform, dims) {
  return halfShiftFFT(
    halfShiftFFT(
      flipRightHalf(
        transform,
        dims
      ),
      dims
    ),
    dims
  );
}

function halfShiftFFT(transform, dims) {
  var ret = [];
  var N = dims[1];
  var M = dims[0];
  var m = 0;
  var idx = 0;
  for (var n = 0, vOff = N/2; n < N; n++) {
    for (m = 0; m < M/2; m++) {
      idx = vOff*dims[0] + m;
      ret.push(transform[idx]);
    }
    vOff += vOff >= N/2 ? -N/2 : (N/2)+1;
  }
  for (n = 0, vOff = N/2; n < N; n++) {
    for (m = M/2; m < M; m++) {
      idx = vOff*dims[0] + m;
      ret.push(transform[idx]);
    }
    vOff += vOff >= N/2 ? -N/2 : (N/2)+1;
  }
  return ret;
}

function flipRightHalf(transform, dims) {
  var ret = [];

  // flip the right half of the image across the x axis
  var N = dims[1];
  var M = dims[0];
  for (var n = 0; n < N; n++) {
    for (var m = 0; m < M; m++) {
      var $n = m < M/2 ? n : (N-1)-n;
      var idx = $n*dims[0] + m;
      ret.push(transform[idx]);
    }
  }

  return ret;
}

/**
 * Call fast fourier transformate and after apply position shift. Finally return a matrix of complex.
 * @param {matrix of spatial domain image} amplitudes 
 */

function callCfft(amplitudesOriginal, dims){
    var amplitudes = amplitudesOriginal.clone();
    cfft(amplitudes);
		amplitudes = shiftFFT(amplitudes, dims);
    return amplitudes;
}

/**
 * Apply position shift and after call fast fourier antitransformed. Finally return a matrix of int.
 * @param {matrix of spatial domain image} amplitudes 
 */
function callICfft(amplitudes, dims){
    amplitudes = unshiftFFT(amplitudes, dims);
    icfft(amplitudes);
    for(var i = 0; i < amplitudes.length; i++){
        amplitudes[i]= Math.trunc(amplitudes[i].re);
		}
    return amplitudes;
}
 
/**
 * Section low pass filter
 * @param {matrix of spatial domain image} amplitudes 
 * @param {dimension of matrix} dims 
 * @param {frequency of cut} frequency or cutFrequency
 * @param {Order for the Butterworth filter} order 
 */
function filterLowPass(amplitudes, dims, frequency) {
    var d0 = Math.pow(frequency, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        if (duv > d0) {
            newArray[idx] = new Complex(0, 0);
        }
        else {
            newArray[idx] = new Complex(amplitudes[idx].re, amplitudes[idx].im);//falle passare
        }
      }
    }
    return newArray;
  }

function filterLowPassGaussian(amplitudes, dims, cutFrequency) {
  var d0 = Math.pow(cutFrequency, 2);
  var N = dims[1];
  var M = dims[0];
  var newArray = [];
  for (var k = 0; k < N; k++) {
    for (var l = 0; l < M; l++) {
      var idx = k*M + l;
      var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
      var huv = Math.pow(Math.E, (-(duv*duv)/(2*d0*d0)));
      newArray[idx] = new Complex(amplitudes[idx].re*huv, amplitudes[idx].im*huv);
    }
  }
  return newArray;
}

function filterButterworthLowPass(amplitudes, dims, cutFrequency, order) {
  var d0 = Math.pow(cutFrequency, 2);
  var N = dims[1];
  var M = dims[0];
  var newArray = [];
  for (var k = 0; k < N; k++) {
    for (var l = 0; l < M; l++) {
      var idx = k*M + l;
      var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
      var huv = 1/(1+(Math.pow((duv/d0),2*order)));
      newArray[idx] = new Complex(amplitudes[idx].re*huv, amplitudes[idx].im*huv);
    }
  }
  return newArray;
}


/**
 * Section High pass filter
 * @param {matrix of spatial domain image} amplitudes 
 * @param {dimension of matrix} dims 
 * @param {frequency of cut} frequency or cutFrequency
 * @param {Order for the Butterworth filter} order 
 */

  function filterHighPass(amplitudes, dims, frequency) {
    var d0 = Math.pow(frequency, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        if (duv < d0) {
            newArray[idx] = new Complex(0, 0);
        }
        else {
            newArray[idx] = new Complex(amplitudes[idx].re, amplitudes[idx].im);//falle passare
        }
      }
    }
    return newArray;
  }

  function filterHighPassGaussian(amplitudes, dims, cutFrequency) {
    var d0 = Math.pow(cutFrequency, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        var huv = Math.pow(Math.E, ((2*d0*d0)/-(duv*duv)));
        newArray[idx] = new Complex(amplitudes[idx].re*huv, amplitudes[idx].im*huv);
      }
    }
    return newArray;
  }
  
  function filterButterworthHighPass(amplitudes, dims, cutFrequency, order) {
    var d0 = Math.pow(cutFrequency, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        var huv = 1/(1+(Math.pow((d0/duv),2*order)));
        newArray[idx] = new Complex(amplitudes[idx].re*huv, amplitudes[idx].im*huv);
      }
    }
    return newArray;
  }

  
/**
 * Section of Band Reject filter
 * @param {matrix of spatial domain image} amplitudes 
 * @param {dimension of matrix} dims 
 * @param {frequency of cut} frequency or cutFrequency
 * @param {Order for the Butterworth filter} order 
 */

 function filterIdealBandReject(amplitudes, dims, lowPassFrequency, highPassFrequency) {
    var lowPass = lowPassFrequency.clone();
    var highPass = highPassFrequency.clone();
    var N = dims[1];
    var M = dims[0];
    ordinaCrescente(lowPass, highPass);
    var newArray = [];
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        var huv1 = 0; var huv = 0;
        for(var i = 0; i<lowPassFrequency.length;i++){
          var lowPassSq = Math.pow(lowPassFrequency[i], 2);
          var highPassSq = Math.pow(highPassFrequency[i], 2);
          if ((duv >= lowPassSq) && (duv <= highPassSq)) {
              newArray[idx] = new Complex(0, 0);
          }
          else {
            if(i == 0)
              newArray[idx] =  new Complex(amplitudes[idx].re, amplitudes[idx].im);//falle passare
            else 
              newArray[idx] =  new Complex(newArray[idx].re, newArray[idx].im);//falle passare
          }
        }
      }
    }
    return newArray;
  }


  function ordinaCrescente(array1,array2){
    var continua=true
    var t1,t2
    var v1 = array1;
    var v2 = array2;
    do{
      continua=false
      for(i=1;i<v1.length;i++)
        if(v1[i]<v1[i-1]){
          t1 = v1[i]
          t2 = v2[i]
          v1[i]=v1[i-1]
          v2[i]=v2[i-1]
          v1[i-1]=t1
          v2[i-1]=t2
          continua=true
        }
    }while(continua)
  }
  
    function filterGaussianBandReject(amplitudes, dims, lowPassFrequency, highPassFrequency) {
      var N = dims[1];
      var M = dims[0];
      var lowPass = lowPassFrequency.clone();
      var highPass = highPassFrequency.clone();
      ordinaCrescente(lowPass, highPass);
      var newArray = [];var cont = 0;
      for (var k = 0; k < N; k++) {
        for (var l = 0; l < M; l++) {
          var idx = k*M + l;
          var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
          var huv1 = 0; var huv = 0;
          for(var i = 0; i<lowPassFrequency.length;i++){cont++;
            var lowPassSq = Math.pow(lowPass[i], 2);
            var highPassSq = Math.pow(highPass[i], 2);
            if((2*highPassSq*highPassSq) != 0)
                huv1 = Math.pow(Math.E, (-(duv*duv)/(2*highPassSq*highPassSq)));
            if ((2*lowPassSq*lowPassSq) != 0)
                huv =  Math.pow(Math.E, (-(duv*duv)/(2*lowPassSq*lowPassSq)));
            var huv2 = 1 - (huv1-huv);
            if(i == 0)
              newArray[idx] = new Complex(amplitudes[idx].re*huv2, amplitudes[idx].im*huv2);
            else 
              newArray[idx] = new Complex(newArray[idx].re*huv2, newArray[idx].im*huv2);
          }          
        }
      }   
      return newArray;
  }

  function filterButterworthBandReject(amplitudes, dims, lowPassFrequency, highPassFrequency, order) {
    var N = dims[1];
    var M = dims[0];
    var lowPass = lowPassFrequency.clone();
    var highPass = highPassFrequency.clone();
    ordinaCrescente(lowPass, highPass);
    var newArray = [];
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        var huv1 = 0; var huv = 0;
        for(var i = 0; i<lowPass.length;i++){
          var lowPassSq = Math.pow(lowPass[i], 2);
          var highPassSq = Math.pow(highPass[i], 2);
          if(highPassSq != 0)
            huv1 = 1/(1+(Math.pow((duv/highPassSq),2*order)));
          if(lowPassSq != 0)
            huv =  1/(1+(Math.pow((duv/lowPassSq),2*order)));
          var huv2 = 1 - (huv1 - huv);
          if(i == 0)
            newArray[idx] = new Complex(amplitudes[idx].re*huv2, amplitudes[idx].im*huv2);
          else 
            newArray[idx] = new Complex(newArray[idx].re*huv2, newArray[idx].im*huv2);
        }        
      }
    }
    return newArray;
  }

  
/**
 * Section of Pass Band filter
 * @param {matrix of spatial domain image} amplitudes 
 * @param {dimension of matrix} dims 
 * @param {low frequency of cut} lowPassFrequency or cutFrequency
 * @param {high frequency of cut} highPassFrequency or cutFrequency
 * @param {Order for the Butterworth filter} order 
 */
 
function filterIdealBandPass(amplitudes, dims, lowPassFrequency, highPassFrequency) {
  var N = dims[1];
  var M = dims[0];
  var newArray = [];var cont = 0;
  var lowPass2 = lowPassFrequency.clone();
  var highPass2 = highPassFrequency.clone();
  ordinaCrescente(lowPass2, highPass2);
  var lowPass = getNewArrayLow(lowPass2,highPass2);
  var highPass = getNewArrayHigh(lowPass2, highPass2);
  var newArray = [];var cont = 0;
  newArray = filterIdealBandReject(amplitudes,dims,lowPass,highPass);
  return newArray;
}

function filterGaussianBandPass(amplitudes, dims, lowPassFrequency, highPassFrequency) {
  var N = dims[1];
  var M = dims[0];
  var newArray = [];var cont = 0;
  var lowPass2 = lowPassFrequency.clone();
  var highPass2 = highPassFrequency.clone();
  ordinaCrescente(lowPass2, highPass2);
  var lowPass = getNewArrayLow(lowPass2,highPass2);
  var highPass = getNewArrayHigh(lowPass2, highPass2);
  var newArray = [];var cont = 0;
  newArray = filterGaussianBandReject(amplitudes,dims,lowPass,highPass);
  return newArray;
}

function filterButterworthBandPass(amplitudes, dims, lowPassFrequency, highPassFrequency, order) {
  var N = dims[1];
  var M = dims[0];
  var newArray = [];var cont = 0;
  var lowPass2 = lowPassFrequency.clone();
  var highPass2 = highPassFrequency.clone();
  ordinaCrescente(lowPass2, highPass2);
  var lowPass = getNewArrayLow(lowPass2,highPass2);
  var highPass = getNewArrayHigh(lowPass2, highPass2);
  var newArray = [];var cont = 0;
  newArray = filterButterworthBandReject(amplitudes,dims,lowPass,highPass, order);
  return newArray;
}


/**
 * GetMagnitude for single channel - return a matrix of int.
 * @param {matrix of spatial domain image} amplitudes 
 * @param {dimension of matrix} dims  
 */
function getMagnitudeImage(amplitudes, dims) {
  var N = dims[1];
  var M = dims[0];
  var newArray = [];
  var maxMagnitude = 0;
  var cc = 9e-3; // contrast constant

  for (var ai = 0; ai < amplitudes.length; ai++) {
    var mag = (amplitudes[ai].re*amplitudes[ai].re + amplitudes[ai].im*amplitudes[ai].im);
    if (mag > maxMagnitude) {
      maxMagnitude = mag;
    }
  }
  for (var k = 0; k < N; k++) { 
    for (var l = 0; l < M; l++) {
      var idx = (k*M + l);
      var logOfMaxMag = Math.log(cc*maxMagnitude+1);
      var magnitude = amplitudes[(k*dims[0] + l)].re * amplitudes[(k*dims[0] + l)].re + amplitudes[(k*dims[0] + l)].im * amplitudes[(k*dims[0] + l)].im; 
      var color = Math.log(cc*magnitude+1);
      color = Math.round(255*(color/logOfMaxMag));
      newArray[idx] = color;
    }
  }
  return newArray;
}

/**
 * 
 * @param {array of pixel in spacial domain.} pixelArray 
 */
function functionAddRandomNoise(pixelArray){
  var cont = 0; var contCicle = 0;
  for(var i = 0; i< pixelArray.length; i+=4){
    contCicle++;
    var noiseNumber = Math.floor(Math.random() * 50);   
    var blackOrWhite = Math.floor(Math.random() * 2);  
    if(noiseNumber == 7){
      var color = 0;
      if(blackOrWhite) 
        color = 0;
      else  
        color = 255;
      pixelArray[i] = color;
      pixelArray[i+1] = color;
      pixelArray[i+2] = color;
      pixelArray[i+3] = 255;
    }
  }
  return pixelArray;
}


/**
 *  SupportFunction
 */
function ordina(array1,array2){
  var continua=true
  var t1,t2
  var v1 = array1;
  var v2 = array2;
  do{
    continua=false
    for(i=1;i<v1.length;i++)
      if(v1[i]>v1[i-1]){
        t1 = v1[i]
        t2 = v2[i]
        v1[i]=v1[i-1]
        v2[i]=v2[i-1]
        v1[i-1]=t1
        v2[i-1]=t2
        continua=true
      }
  }while(continua)
}

Array.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
      if (i == 'clone') 
          continue;
      if (this[i] && typeof this[i] == "object") {
          newObj[i] = this[i].clone();
      } 
      else 
          newObj[i] = this[i]
  } return newObj;
};

function getMax(array){
  var max = 0;
  for(var i = 0;i < array.length; i++){
    if(array[i]> max)
      max = array[i];
  }
  return max;
}

function getNewArrayLow(lowPass, highPass){
  var newArrayLow = []; var newArrayHigh = [];
  if(lowPass.length == 1){
    newArrayLow[0] = 0;
    newArrayHigh[0] = lowPass[0];
    newArrayLow[1] = getMax(highPass);
    newArrayHigh[1] = dims[0];
    return newArrayLow;
  }
  else {
    var insideIndex = 1;
    newArrayLow[0] = 0;
    newArrayHigh[0] = lowPass[0];
    for(var i = 0; i < lowPass.length-1;i++){
      if(lowPass[i] == highPass[i])
        break;   
      if((lowPass[i+1] - highPass[i]) > 0){
        newArrayLow[insideIndex] = highPass[i];
        newArrayHigh[insideIndex] = lowPass[i+1];
        insideIndex++;
      }  
      else{
        lowPass[i+1] = highPass[i];
      }     
    }
    if(insideIndex == 1){
      newArrayLow[0] = 0;
      newArrayHigh[0] = lowPass[0];
      newArrayLow[1] = getMax(highPass);
      newArrayHigh[1] = dims[0];
    }
  }
  return newArrayLow;
}

function getNewArrayHigh(lowPass, highPass){
  var newArrayLow = []; var newArrayHigh = [];
  if(lowPass.length == 1){
    newArrayLow[0] = 0;
    newArrayHigh[0] = lowPass[0];
    newArrayLow[1] = getMax(highPass);
    newArrayHigh[1] = dims[0];
    return newArrayHigh;
  }
  else {
    var insideIndex = 1;
    newArrayLow[0] = 0;
    newArrayHigh[0] = lowPass[0];
    for(var i = 0; i < lowPass.length-1;i++){
      if(lowPass[i] == highPass[i])
        break;   
      if((lowPass[i+1] - highPass[i]) > 0){
        newArrayLow[insideIndex] = highPass[i];
        newArrayHigh[insideIndex] = lowPass[i+1];
        insideIndex++;
      }  
      else{
        lowPass[i+1] = highPass[i];
      }     
    }
    if(insideIndex == 1){
      newArrayLow[0] = 0;
      newArrayHigh[0] = lowPass[0];
      newArrayLow[1] = getMax(highPass);
      newArrayHigh[1] = dims[0];
    }
  }
  return newArrayHigh;
}

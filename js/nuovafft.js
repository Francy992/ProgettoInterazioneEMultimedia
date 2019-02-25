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
Complex.prototype.log = function()
{
	/*
	although 'It's just a matter of separating out the real and imaginary parts of jw.' is not a helpful quote
	the actual formula I found here and the rest was just fiddling / testing and comparing with correct results.
	http://cboard.cprogramming.com/c-programming/89116-how-implement-complex-exponential-functions-c.html#post637921
	*/
	if( !this.re )
		console.log(this.im.toString()+'j');
	else if( this.im < 0 )
		console.log(this.re.toString()+this.im.toString()+'j');
	else
		console.log(this.re.toString()+'+'+this.im.toString()+'j');
}
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
 
	var hN = N / 2;
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
function callCfft(amplitudes){
    var start = new Date();
    cfft(amplitudes);
		//console.log(amplitudes);
		amplitudes = shiftFFT(amplitudes, [512,512]);
		//console.log(amplitudes);
    var duration = +new Date() - start;
    console.log("Dentro callCfft, è durata: " + duration);
    return amplitudes;
}

function callICfft(amplitudes){
    var start = new Date();
    amplitudes = unshiftFFT(amplitudes, [512,512]);
    icfft(amplitudes);
    for(var i = 0; i < amplitudes.length; i++){
        amplitudes[i]= Math.trunc(amplitudes[i].re);
		}
    var duration = +new Date() - start;
    console.log("Dentro  inverse callCfft, è durata: " + duration);
    return amplitudes;
}
 

function filterLowPass(amplitudes, dims, lowPass) {
    var d0 = Math.pow(lowPass, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    console.log(amplitudes);
    console.log(newArray);

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

  function filterHighPass(amplitudes, dims, highPass) {
    var d0 = Math.pow(highPass, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    console.log(amplitudes);
    console.log(newArray);

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

  function aggiungiRumorePeriodico(amplitudes,dims, periodo){
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    var cont = 0;
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        if (duv==periodo) {
          newArray[idx] = new Complex(500000, 500000);
          cont++;
        }
        else {
            newArray[idx] = new Complex(amplitudes[idx].re, amplitudes[idx].im);//falle passare
        }
      }
    }
    console.log(cont);
    return newArray;
  }

  function eliminaRumorePeriodico(amplitudes, dims, periodo){
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        if (duv==periodo) {
          newArray[idx] = new Complex(0, 0);
        }
        else {
            newArray[idx] = new Complex(amplitudes[idx].re, amplitudes[idx].im);//falle passare
        }
      }
    }
    return newArray;
  }

  function filterButterworthLowPass(amplitudes, dims, cutFrequency, order) {
    var d0 = Math.pow(cutFrequency, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    var cont = 0, cont2=0;
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        var huv = 1/(1+(Math.pow((duv/d0),2*order)));
        //console.log("Duv: " + duv + ", d0: " + d0 + ", huv: " + huv + ", d0+huv: ", + (d0+huv));
        //console.log(huv);
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
    var cont = 0, cont2=0;
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        var huv = 1/(1+(Math.pow((d0/duv),2*order)));
        //console.log("Duv: " + duv + ", d0: " + d0 + ", huv: " + huv + ", d0+huv: ", + (d0+huv));
        //console.log(huv);
        newArray[idx] = new Complex(amplitudes[idx].re*huv, amplitudes[idx].im*huv);
      }
    }
    return newArray;
  }

  function filterLowPassGaussian(amplitudes, dims, cutFrequency) {
    var d0 = Math.pow(cutFrequency, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    var cont = 0, cont2=0;
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        var huv = Math.pow(Math.E, (-(duv*duv)/(2*d0*d0)));
        //console.log("Duv: " + duv + ", d0: " + d0 + ", huv: " + huv + ", d0+huv: ", + (d0+huv));
        //console.log(huv);
        newArray[idx] = new Complex(amplitudes[idx].re*huv, amplitudes[idx].im*huv);
      }
    }
    return newArray;
  }

  function filterHighPassGaussian(amplitudes, dims, cutFrequency) {
    var d0 = Math.pow(cutFrequency, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    var cont = 0, cont2=0;
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        var huv = Math.pow(Math.E, ((2*d0*d0)/-(duv*duv)));
        //console.log("Duv: " + duv + ", d0: " + d0 + ", huv: " + huv + ", d0+huv: ", + (d0+huv));
        //console.log(huv);
        newArray[idx] = new Complex(amplitudes[idx].re*huv, amplitudes[idx].im*huv);
      }
    }
    return newArray;
  }

  function filterIdealBandReject(amplitudes, dims, cutFrequency) {
    var d0 = Math.pow(cutFrequency, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        if ( (duv > (d0 - cutFrequency/2)) && (duv < (d0 + cutFrequency/2))) {
          newArray[idx] = new Complex(0, 0);
        }
        else {
          newArray[idx] = new Complex(amplitudes[idx].re, amplitudes[idx].im);//falle passare
        }
      }
    }
    return newArray;
  }

  function filterButterworthBandReject(amplitudes, dims, cutFrequency, order) {
    var d0 = Math.pow(cutFrequency, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        var num = duv*cutFrequency;
        var den = (duv*duv) - (d0*d0);
        var huv = 1/(1+Math.pow( num/den, (2*order)));
        newArray[idx] = new Complex(amplitudes[idx].re*huv, amplitudes[idx].im*huv);
      }
    }
    return newArray;
  }

  function filterGaussianBandReject(amplitudes, dims, cutFrequency) {
    var d0 = Math.pow(cutFrequency, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        var num =(duv*duv) - (d0*d0);
        var den = duv*cutFrequency;
        var tot = Math.pow((num/den),2);
        var huv = 1 - Math.pow(Math.E, -tot);
        newArray[idx] = new Complex(amplitudes[idx].re*huv, amplitudes[idx].im*huv);
      }
    }
    return newArray;
  }

  function filterGaussianBandPass(amplitudes, dims, cutFrequency) {
    var d0 = Math.pow(cutFrequency, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        var num =(duv*duv) - (d0*d0);
        var den = duv*cutFrequency;
        var tot = Math.pow((num/den),2);
        var huv = 1 - (1 - Math.pow(Math.E, -tot));
        newArray[idx] = new Complex(amplitudes[idx].re*huv, amplitudes[idx].im*huv);
      }
    }
    return newArray;
  }

  function filterAggiungiBanda(amplitudes, dims, cutFrequency) {
    var d0 = Math.pow(cutFrequency, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        //var huv = Math.pow(Math.E, ((2*d0*d0)/-(duv*duv)));
        //newArray[idx] = new Complex(amplitudes[idx].re*huv, amplitudes[idx].im*huv);
        if ( (duv > (d0 - cutFrequency/2)) && (duv < (d0 + cutFrequency/2))) {
          amplitudes[idx] = new Complex(1000000, 1000000);
        }
        else {
          amplitudes[idx] = new Complex(amplitudes[idx].re, amplitudes[idx].im);//falle passare
        }
      }
    }
    return amplitudes;
  }



function filter(amplitudes, dims, lowPass, highPass) {
    var lowPassSq = Math.pow(lowPass, 2);
    var highPassSq = Math.pow(highPass, 2);
    var N = dims[1];
    var M = dims[0];
    var newArray = [];
    for (var k = 0; k < N; k++) {
      for (var l = 0; l < M; l++) {
        var idx = k*M + l;
        var duv = Math.pow(k-M/2, 2) + Math.pow(l-N/2, 2);
        if (
          duv > lowPassSq && isNaN(highPass) ||
          duv < highPassSq && isNaN(lowPass) ||
          duv < lowPassSq && !isNaN(lowPass) && !isNaN(highPass) ||
          duv > highPassSq && !isNaN(lowPass) && !isNaN(highPass)
        ) {
            newArray[idx] = new Complex(0, 0);
        }
        else newArray[idx] =  new Complex(amplitudes[idx].re, amplitudes[idx].im);//falle passare
      }
    }
    return newArray;
  }



	
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


//test code
//var imaginario = cfft([1,1,1,1,0,0,0,0]);
//var inverso = icfft(imaginario);
//console.log( imaginario );
//console.log( inverso );
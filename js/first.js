//TODO: inserire rumore casuale in un immagine e scaricare il tutto.
//TODO: controllare come far attivare questo taglio nel caso di gaussiano/butterborth.
//TODO: Fare in modo che gli slider passabanda funzionino con glli array, compreso la funzione che applica il filtro.
//TODO: Non si aggiorna il valore del testo nello slider doppio.
//TODO: Da sistemare i passabanda e il setCirclePassaBanda.
//TODO: Controllareelimina banda  ideale.


var bandPassMin1 = [];
    bandPassMin1[0] = 0;
var bandPassMax1 = [];
    bandPassMax1[0] = 512;
var bandPassMin2 = [];
    bandPassMin2[0] = 0;
var bandPassMax2 = [];
    bandPassMax2[0] = 512;
//slider: 
var slider_1 = $("#slider_1").slider({
	formatter: function(value) {
        var sliderLowPassVal = $("#slider_1_val");
        sliderLowPassVal.val(value);
        frequency1 = value;
        recalculate1 = true;
	}
});
var slider_2 = $("#slider_2").slider({
	formatter: function(value) {
        var sliderHighPassVal = $("#slider_2_val");
        sliderHighPassVal.val(value);
        frequency2 = value;
        recalculate2 = true;
	}
});

$("#slider_1_val").on("change", function(){     
    $("#slider_1").slider("setValue",$(this).val());
    frequency1 = $(this).val();
    recalculate1 = true;
});
$("#slider_2_val").on("change", function(){
    $("#slider_2").slider("setValue",$(this).val());
    frequency2 = $(this).val();
    recalculate2 = true;
});


/**
 * PASSBAND SLIDER
 */


var sliderBandPass_1_0 = $("#bandPass_1").slider({
	formatter: function(value) {
        var sliderLowPassVal = $("#bandPass_1");
        sliderLowPassVal.val(value);
        $("#bandPass_1_min").text(bandPassMin1[0]);
        $("#bandPass_1_max").text(bandPassMax1[0]);
	}
});
var sliderBandPass_2_0 = $("#bandPass_2").slider({
	formatter: function(value) {
        var sliderLowPassVal = $("#bandPass_2");
        sliderLowPassVal.val(value);
        $("#bandPass_2_min").text(bandPassMin2[0]);
        $("#bandPass_2_max").text(bandPassMax2[0]);
	}
});

//Butterworth order change
$("#butterworth_1").on("change", function(){
    butterworthOrder1 = $(this).val();
    recalculate1 = true;
});
$("#butterworth_2").on("change", function(){
    butterworthOrder2 = $(this).val();
    recalculate2 = true;
});



//Vari livelli dell'immagine. Soltanto i valori, è un array e non un'immagine.
var redLevel = [];
var greenLevel = [];
var blueLevel = [];

//Matrice contenente i valori della magnitudo, necessaria per passarla ai vari filtri e far diventare nero di volta in volta il tutto, senza aggiornarla mai.
var matrixMagnitudoRgb1 = [];
var matrixMagnitudoRgb2 = [];
var redLevelMagnitudoRgb = [];
var greenLevelMagnidutoRgb = [];
var blueLevelMagnitudoRgb = [];

//Matrice contenente tutti i valori dei vari livelli della trasformata (non è un'immagine e contiene i complessi)
var matrixFourierRedLevel = [];
var matrixFourierGreenLevel = [];
var matrixFourierBlueLevel = [];

//Global frequency
var lowPassFrequency = 1;
var highPassFrequency = 1;

//For build function call name
var tipo1 = "ideal";
var cosa1 = "LowPass";
var tipo2 = "ideal";
var cosa2 = "LowPass";
var frequency1 = 1;
var frequency2 = 1;
var recalculate1 = true; // recalculate only if we change a parameter.
var recalculate2 = true;
var butterworthOrder1 = 1;
var butterworthOrder2 = 1;

           


//Immagine originale e variabile dimensioni globale.
var imgRiga1 = document.getElementById("imgRiga1");
var dims = [imgRiga1.naturalWidth, imgRiga1.naturalHeight];

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

var canvas1MagnitudeRiga1 = document.getElementById("canvas1MagnitudeRiga1");
canvas1MagnitudeRiga1.width = dims[0];
canvas1MagnitudeRiga1.height = dims[1];
var context1MagnitudeRiga1 = canvas1MagnitudeRiga1.getContext("2d");

var canvas1MagnitudeRiga2 = document.getElementById("canvas1MagnitudeRiga2");
canvas1MagnitudeRiga2.width = dims[0];
canvas1MagnitudeRiga2.height = dims[1];
var context1MagnitudeRiga2 = canvas1MagnitudeRiga2.getContext("2d");

//CanvasMagnitude RGB.
var canvas1Magnitude = document.getElementById("canvas1Magnitude");
canvas1Magnitude.width = dims[0];
canvas1Magnitude.height = dims[1];
var context1Magnitude = canvas1Magnitude.getContext("2d");

var canvas2Magnitude = document.getElementById("canvas2Magnitude");
canvas2Magnitude.width = dims[0];
canvas2Magnitude.height = dims[1];
var context2Magnitude = canvas2Magnitude.getContext("2d");

var canvas3Magnitude = document.getElementById("canvas3Magnitude");
canvas3Magnitude.width = dims[0];
canvas3Magnitude.height = dims[1];
var context3Magnitude = canvas3Magnitude.getContext("2d");



$( document ).ready(function() {
    /**
     * Slider section listener
     */
    slider_1.on("change", function(val){
        frequency1 = val.value.newValue;
        recalculate1 = true;
        if(cosa1 == "LowPass")
            setCirclePassBand(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, 0, frequency1, context1MagnitudeRiga1, "Circle of frequency");
        else 
            setCirclePassBand(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, frequency1, dims[1], context1MagnitudeRiga1, "Circle of frequency");
    });
    slider_2.on("change", function(val){
        frequency2 = val.value.newValue;
        recalculate2 = true;
        if(cosa2 == "LowPass")
            setCirclePassBand(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, 0, frequency2, context1MagnitudeRiga2, "Circle of frequency");
        else 
            setCirclePassBand(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, frequency2, dims[1], context1MagnitudeRiga2, "Circle of frequency");
    });

    sliderBandPass_1_0.on("change", function(val){
        bandPassMin1[0] = val.value.newValue[0];
        bandPassMax1[0] = val.value.newValue[1];
        recalculate1 = true;
        if(cosa1 == "BandReject"){
            setCircleBandReject(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, bandPassMin1, bandPassMax1, context1MagnitudeRiga1, "Circle of frequency");
        }
        else{
            setCirclePassBand(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, bandPassMin1, bandPassMax1, context1MagnitudeRiga1, "Circle of frequency");
        }
    });
    sliderBandPass_2_0.on("change", function(val){
        bandPassMin2[0] = val.value.newValue[0];
        bandPassMax2[0] = val.value.newValue[1];
        recalculate2 = true;
        if(cosa2 == "BandReject")
            setCircleBandReject(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, bandPassMin2, bandPassMax2, context1MagnitudeRiga2, "Circle of frequency");
        else
            setCirclePassBand(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, bandPassMin2, bandPassMax2, context1MagnitudeRiga2, "Circle of frequency");
    });


  /**
   * RadioButton section listener, here handle all event for change "cosa1" and "tipo1".
   */
    $('input[type=radio][name=tipo1]').change(function() {
        tipo1 = this.value;
        recalculate1 = true;
        if(this.value == "butterworth"){//show input n-order
            $("#butterworth_1_col").show();
        }
        else{
            $("#butterworth_1_col").hide();
        }

    });

    $('input[type=radio][name=tipo2]').change(function() {
        tipo2 = this.value;
        recalculate2 = true;
        if(this.value == "butterworth"){//show input n-order
            $("#butterworth_2_col").show();
        }
        else{
            $("#butterworth_2_col").hide();
        }
       
    });

    $('input[type=radio][name=cosa1]').change(function() {
        cosa1 = this.value;
        recalculate1 = true;
        if(this.value == "BandPass"){//show input n-order
            $("#bandPass_1_col").show();
            setCirclePassBand(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, bandPassMin1, bandPassMax1, context1MagnitudeRiga1, "Circle of frequency");
            $("#slider_1_col").hide();
        }
        else if(this.value == "BandReject"){
            $("#bandPass_1_col").show();
            $("#slider_1_col").hide();
            setCircleBandReject(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, bandPassMin1, bandPassMax1, context1MagnitudeRiga1, "Circle of frequency");
        }
        else if(this.value == "LowPass"){
            setCirclePassBand(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, 0, frequency1, context1MagnitudeRiga1, "Circle of frequency");
            $("#bandPass_1_col").hide();
            $("#slider_1_col").show();
        }
        else{//HighPassCase
            $("#bandPass_1_col").hide();
            $("#slider_1_col").show();
            setCirclePassBand(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, frequency1, dims[1], context1MagnitudeRiga1, "Circle of frequency");
        }
    });

    $('input[type=radio][name=cosa2]').change(function() {
        cosa2 = this.value;
        recalculate2 = true;
        if(this.value == "BandPass"){//show input n-order
            $("#bandPass_2_col").show();
            $("#slider_2_col").hide();
            setCirclePassBand(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, bandPassMin2[0], bandPassMax2[0], context1MagnitudeRiga2, "Circle of frequency");
        }
        else if(this.value == "BandReject"){
            $("#bandPass_2_col").show();
            $("#slider_2_col").hide();
            setCircleBandReject(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, bandPassMin2[0], bandPassMax2[0], context1MagnitudeRiga2, "Circle of frequency");
        }
        else if(this.value == "LowPass"){
            setCirclePassBand(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, 0, frequency2, context1MagnitudeRiga2, "Circle of frequency");
            $("#bandPass_2_col").hide();
            $("#slider_2_col").show();
        }
        else{//HighPassCase
            $("#bandPass_2_col").hide();
            $("#slider_2_col").show();
            setCirclePassBand(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, frequency2, dims[1], context1MagnitudeRiga2, "Circle of frequency");
        }
    });

    function mostraTutto(){
        $("#"+this.id).attr("disabled", true);
        $("#magnitude").hide();
        $('#messageError').text("Esecuzione operazione richiesta in corso...");
        $('#messageError').show();
        $('#spinner').show();
    }

    /**
     * DOWNLOAD SECTION
     */

    $("#downcanvas1Riga1").on("click", function(){
        var download = document.getElementById("downloadcanvas1Riga1");
        var image = document.getElementById("canvas1Riga1").toDataURL("image/png")
                    .replace("image/png", "image/octet-stream");
        download.setAttribute("href", image);
    });
    $("#downcanvas1Magnitude").on("click", function(){
        var download = document.getElementById("downloadcanvas1Magnitude");
        var image = document.getElementById("canvas1Magnitude").toDataURL("image/png")
                    .replace("image/png", "image/octet-stream");
        download.setAttribute("href", image);
    });
    $("#downcanvas2Magnitude").on("click", function(){
        var download = document.getElementById("downloadcanvas2Magnitude");
        var image = document.getElementById("canvas2Magnitude").toDataURL("image/png")
                    .replace("image/png", "image/octet-stream");
        download.setAttribute("href", image);
    });
    $("#downcanvas3Magnitude").on("click", function(){
        var download = document.getElementById("downloadcanvas3Magnitude");
        var image = document.getElementById("canvas3Magnitude").toDataURL("image/png")
                    .replace("image/png", "image/octet-stream");
        download.setAttribute("href", image);
    });
    $("#downcanvas1Riga2").on("click", function(){
        var download = document.getElementById("downloadcanvas1Riga2");
        var image = document.getElementById("canvas1Riga2").toDataURL("image/png")
                    .replace("image/png", "image/octet-stream");
        download.setAttribute("href", image);
    }); 
    $("#downcanvas2Riga2").on("click", function(){
        var download = document.getElementById("downloadcanvas2Riga2");
        var image = document.getElementById("canvas2Riga2").toDataURL("image/png")
                    .replace("image/png", "image/octet-stream");
        download.setAttribute("href", image);
    });

    /**
     * Button go operation listener
     */
    $('#go').on("click", function(){
        mostraTutto();
        setTimeout(function(){
            if(recalculate1){
                if(tipo1 != "butterworth"){
                    if(cosa1 == "BandPass" || cosa1 == "BandReject"){
                        console.log("Bau");
                        window[tipo1+cosa1](matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, bandPassMin1, bandPassMax1, context1Riga2, "1° Filtro: " + tipo1+cosa1);
                    }
                    else
                        window[tipo1+cosa1](matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, frequency1, context1Riga2, "1° Filtro: " + tipo1+cosa1);
                }
                else{
                    if(cosa1 == "BandPass" || cosa1 == "BandReject"){
                        window[tipo1+cosa1](matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, bandPassMin1, bandPassMax1, butterworthOrder1, context1Riga2, "1° Filtro: " + tipo1+cosa1);
                    }
                    else //LOwPass/HighPass No butterworth
                        window[tipo1+cosa1](matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, frequency1, butterworthOrder1, context1Riga2, "1° Filtro: " + tipo1+cosa1);
                } 
                recalculate1 = false;
            }
            if(recalculate2){
                if(tipo2 != "butterworth"){
                    if(cosa2 == "BandPass" || cosa2 == "BandReject"){
                        console.log("Bau");
                        window[tipo2+cosa2](matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, bandPassMin2, bandPassMax2, context2Riga2, "2° Filtro: " + tipo2+cosa2);
                    }
                    else
                        window[tipo2+cosa2](matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, frequency2, context2Riga2, "2° Filtro: " + tipo2+cosa2);
                }
                else{
                    if(cosa2 == "BandPass" || cosa2 == "BandReject"){
                        window[tipo2+cosa2](matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, bandPassMin2, bandPassMax2, butterworthOrder2, context2Riga2, "1° Filtro: " + tipo2+cosa2);
                    }
                    else //LOwPass/HighPass No butterworth
                        window[tipo2+cosa2](matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, frequency2, butterworthOrder2, context2Riga2, "2° Filtro: " + tipo2+cosa2);
                } 
                recalculate2 = false;
            }
            $('#messageError').text("");
            $('#messageError').hide();
            $('#spinner').hide();
            $("#compare").show();
            $("#showMagnitudo").show();
        }, 400);

        $("#"+this.id).attr("disabled", false);
    });

    $("#showMagnitudo").on("click", function(){
        $("#magnitude").show();
        $("#compare").hide();
        $("#showMagnitudo").hide();
    });

    /**
    * Inizialize section and fast fourier transformate.
    */
    //Draw temporany matrix
    context1Riga1.drawImage(imgRiga1,0,0);
    var imgMatrixOriginal = context1Riga1.getImageData(0, 0, dims[0], dims[1]);
    //Get single level of spatial domain
    redLevel = getLevel(imgMatrixOriginal, 0);
    greenLevel = getLevel(imgMatrixOriginal, 1);
    blueLevel = getLevel(imgMatrixOriginal, 2);
    //Get single level of frequency domain
    matrixFourierRedLevel = callCfft(redLevel, dims);
    matrixFourierGreenLevel = callCfft(greenLevel, dims);
    matrixFourierBlueLevel = callCfft(blueLevel, dims);
    $('#spinner').show(); 
    //call method:
    setTimeout(function(){
        setMagnitudeToContext(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, context1Riga1, "Magnitudo RGB."); 
        setMagnitudeToContext(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, context1MagnitudeRiga1, "Magnitudo RGB.");
        setMagnitudeToContext(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, context1MagnitudeRiga2, "Magnitudo RGB.");
        redLevelMagnitudoRgb = setMagnitudeSingleChannelToContext(matrixFourierRedLevel, dims, context1Magnitude, "Magnitudo canale rosso."); 
        blueLevelMagnitudoRgb = setMagnitudeSingleChannelToContext(matrixFourierBlueLevel, dims, context2Magnitude, "Magnitudo canale blue."); 
        greenLevelMagnitudoRgb = setMagnitudeSingleChannelToContext(matrixFourierGreenLevel, dims, context3Magnitude, "Magnitudo canale verde."); 
        $("#go").removeAttr("disabled");
        $('#spinner').hide(); 
    }, 400);
       



    
    /**
     * Load new image
     */
    $("#fileUploader").change(function(){
        if (this.files && this.files[0]) {
            $("#magnitude").show();
            $("#compare").hide();
            $("#showMagnitudo").hide();
            var reader = new FileReader();
            var oldSrc = $('#imgRiga1').attr('src');

            reader.onload = function (e) {
                $('#imgRiga1').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);

            reader.onloadend = function(){
                if(imgRiga1.naturalWidth > 1024 || imgRiga1.naturalHeight > 1024){
                    $('#messageError').text("Le dimensioni dell'immagine sono troppo grandi.");
                    $('#messageError').show();
                    $('#imgRiga1').attr('src', oldSrc);
                }
                else{
                    $('#spinner').show(); 
                    setTimeout(function(){
                        $('#messageError').text("");
                        $('#messageError').hide();
                        dims = [imgRiga1.naturalWidth, imgRiga1.naturalHeight];
                        setMaxValue(dims[0]);
                        imgRiga1 = document.getElementById("imgRiga1");
                        canvas1Riga1 = document.getElementById("canvas1Riga1");
                        canvas1Riga1.width = dims[0];
                        canvas1Riga1.height = dims[1];
                        context1Riga1 = canvas1Riga1.getContext("2d");
                        context1Riga1.drawImage(imgRiga1,0,0);
                        var imgMatrixOriginal = context1Riga1.getImageData(0, 0, dims[0], dims[1]);

                        //ReInizialize context and canvas.
                        

                        canvas1Riga2 = document.getElementById("canvas1Riga2");
                        canvas1Riga2.width = dims[0];
                        canvas1Riga2.height = dims[1];
                        context1Riga2 = canvas1Riga2.getContext("2d");

                        canvas2Riga2 = document.getElementById("canvas2Riga2");
                        canvas2Riga2.width = dims[0];
                        canvas2Riga2.height = dims[1];
                        context2Riga2 = canvas2Riga2.getContext("2d");

                        //CanvasMagnitude RGB.
                        canvas1Magnitude.width = dims[0];
                        canvas1Magnitude.height = dims[1];
                        context1Magnitude = canvas1Magnitude.getContext("2d");

                        canvas2Magnitude.width = dims[0];
                        canvas2Magnitude.height = dims[1];
                        context2Magnitude = canvas2Magnitude.getContext("2d");

                        canvas3Magnitude.width = dims[0];
                        canvas3Magnitude.height = dims[1];
                        context3Magnitude = canvas3Magnitude.getContext("2d");

                        canvas1MagnitudeRiga1.width = dims[0];
                        canvas1MagnitudeRiga1.height = dims[1];
                        context1MagnitudeRiga1 = canvas1MagnitudeRiga1.getContext("2d");

                        canvas1MagnitudeRiga2.width = dims[0];
                        canvas1MagnitudeRiga2.height = dims[1];
                        context1MagnitudeRiga2 = canvas1MagnitudeRiga2.getContext("2d");


                        //Get single level of spatial domain
                        redLevel = getLevel(imgMatrixOriginal, 0);
                        greenLevel = getLevel(imgMatrixOriginal, 1);
                        blueLevel = getLevel(imgMatrixOriginal, 2);
                        //Get single level of frequency domain
                        matrixFourierRedLevel = callCfft(redLevel, dims);
                        matrixFourierGreenLevel = callCfft(greenLevel, dims);
                        matrixFourierBlueLevel = callCfft(blueLevel, dims);

                        //call method:
                        matrixMagnitudoRgb1 = matrixMagnitudoRgb2 = setMagnitudeToContext(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, context1Riga1, "Magnitudo RGB."); 
                        setMagnitudeSingleChannelToContext(matrixFourierRedLevel, dims, context1Magnitude, "Magnitudo canale rosso."); 
                        setMagnitudeSingleChannelToContext(matrixFourierBlueLevel, dims, context2Magnitude, "Magnitudo canale blue."); 
                        setMagnitudeSingleChannelToContext(matrixFourierGreenLevel, dims, context3Magnitude, "Magnitudo canale verde."); 
                        redLevelMagnitudoRgb = setMagnitudeSingleChannelToContext(matrixFourierRedLevel, dims, context1Magnitude, "Magnitudo canale rosso."); 
                        blueLevelMagnitudoRgb = setMagnitudeSingleChannelToContext(matrixFourierBlueLevel, dims, context2Magnitude, "Magnitudo canale blue."); 
                        greenLevelMagnitudoRgb = setMagnitudeSingleChannelToContext(matrixFourierGreenLevel, dims, context3Magnitude, "Magnitudo canale verde."); 
                        setCirclePassBand(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, 0, frequency1, context1MagnitudeRiga1, "Circle of frequency");
                        setCirclePassBand(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, dims, 0, frequency1, context1MagnitudeRiga2, "Circle of frequency");
                        
                        //reupload = true;
                        recalculate1 = true;
                        recalculate2 = true;
                        $('#spinner').hide(); 
                        $('').show();
                    }, 400);
                }
            }
        }
    });

    /**
     * Support function - set max value on slider and input type number
     * @param {*} val 
     */
    function setMaxValue(val){
        $("#slider_1_val").attr("max", val);
        $("#slider_2_val").attr("max", val);
        $("#slider_1").slider('setAttribute', 'max', val);
        $("#slider_1").slider('refresh');
        $("#slider_2").slider('setAttribute', 'max', val);
        $("#slider_2").slider('refresh');
        $("#bandPass_1").slider('setAttribute', 'max', val);
        $("#bandPass_1").slider('refresh');
        $("#bandPass_2").slider('setAttribute', 'max', val);
        $("#bandPass_2").slider('refresh');
        $("#bandPass_1_max").text(val);
        $("#bandPass_2_max").text(val);

        frequency1 = 1;
        frequency2 = 1;
    }

  //LowPass
  //idealLowPass(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 35, context1Riga2, "Filtro low pass ideale");
  //gaussianLowPass(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 35, context2Riga2, "Filtro low pass gaussiano");
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
  //idealBandPass(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 1, context2Riga2, "Filtro passa banda ideale");
  //gaussianBandPass(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 3, context2Riga2, "Filtro passa banda gaussiano");
  //butterworthBandPass(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 1, 2, context1Riga2, "Filtro passa banda butterworth");

  //SpecialFilter
  //doublePassBand(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, 3, 15, context2Riga2, "Filtro mix passa alto e passa basso");
  //setMagnitudeToContext(matrixFourierRedLevel, matrixFourierBlueLevel, matrixFourierGreenLevel, dims, context1Riga1, "Magnitudo RGB."); 
  //setMagnitudeSingleChannelToContext(matrixFourierRedLevel, dims, context1Riga1, "Magnitudo canale rosso."); 
  //setMagnitudeSingleChannelToContext(matrixFourierBlueLevel, dims, context1Riga2, "Magnitudo canale blue."); 
  //setMagnitudeSingleChannelToContext(matrixFourierGreenLevel, dims, context1Riga1, "Magnitudo canale verde."); 

});



var contSlider = 1;
function addSlider(){
    console.log("Dentro addSlider contSlider vale: " + contSlider);
    //Add  html code.
    var html = '<label for="bandPass_1_'+contSlider+'"><strong>Seleziona le frequenze di taglio del filtro:</strong></label><br/>'+
                '<span id="bandPass_1_min_'+contSlider+'" style="margin-right:15px;"><b>0</b></span>'+
                '     <input id="bandPass_1_'+contSlider+'" type="text" class="span2" value="" data-slider-min="0" data-slider-max="'+dims[1]+'" data-slider-step="1" data-slider-value="[0,'+dims[1]+']"/>'+
                ' <span id="bandPass_1_max_'+contSlider+'" style="margin-left:15px;"><b>'+dims[1]+'</b></span>';
    $("#bandPass_1_col").prepend(html);
    //Inizialize array position
    bandPassMin1[contSlider] = 0;
    bandPassMax1[contSlider] = dims[1];
    //TODO: Inizializza gli altri slider
    //Register the slider
    window["sliderBandPass_1_"+contSlider] = $("#bandPass_1_"+contSlider).slider({
        formatter: function(value) {
            var sliderLowPassVal = $("#bandPass_1_"+contSlider);
            sliderLowPassVal.val(value);
            var pos = this.id.charAt(this.id.length-1);
            $("#bandPass_1_min_"+contSlider).text(bandPassMin1[""+pos+""]);
            $("#bandPass_1_max_"+contSlider).text(bandPassMax1[""+pos+""]);
        }
    });
    //Listen change Slider
    window["sliderBandPass_1_"+contSlider].on("change", function(val){
        var pos = this.id.charAt(this.id.length-1);
        bandPassMin1[""+pos+""] = val.value.newValue[0];
        bandPassMax1[""+pos+""] = val.value.newValue[1];
        recalculate1 = true;
        console.log("Prima di invocare la funzione ")
        if(cosa1 == "BandReject"){
            printCircleMultiple(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, context1MagnitudeRiga1, "Circle of frequency");
        }
        else{
            printCircleMultiple(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, context1MagnitudeRiga1, "Circle of frequency");
        }
    });

    $("#bandPass_1_"+contSlider).slider('refresh');

    //SLIDER 2
    
    



    contSlider++;
}

//TODO: Funzione che chiama i setCircle in base a quanti slider ho aggiunto.
function printCircleMultiple(redLevelMagnitudoRgb, greenLevelMagnitudoRgb, blueLevelMagnitudoRgb, context1MagnitudeRiga1, message){
    var redLevelMagnitudo = redLevelMagnitudoRgb;
    var greenLevelMagnitudo = greenLevelMagnitudoRgb;
    var blueLevelMagnitudo = blueLevelMagnitudoRgb;
    if(cosa1 == "BandReject"){
        setCircleBandRejectModify(redLevelMagnitudo, greenLevelMagnitudo, blueLevelMagnitudo, dims, bandPassMin1, bandPassMax1, context1MagnitudeRiga1, message);
    }
    else{
        setCirclePassBandModify(redLevelMagnitudo, redLevelMagnitudo, redLevelMagnitudo, dims, bandPassMin1, bandPassMax1, context1MagnitudeRiga1, message);
    }

}

function confrontaArray(array1, array2){
    for(var i=0;i<array1.length;i++){
        if(array1[i].re != array2.re){
            return true;
        }
    }
    return false;
}
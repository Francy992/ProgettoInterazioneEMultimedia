/* 
 * Free FFT and convolution (JavaScript) from http://bigwww.epfl.ch/demo/ip/algorithms/fft.js /--> http://bigwww.epfl.ch/demo/ip/demos/FFT/
 * 
 * Copyright (c) 2014 Project Nayuki
 * https://www.nayuki.io/page/free-small-fft-in-multiple-languages
 * 
 * (MIT License)
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */

"use strict";

(function(window) {
    var fft = {};

    /*
     * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
     * The vector can have any length. This is a wrapper function.
     */
    fft.transform = function(real, imag) {
        if ( real.length != imag.length )
            throw "Mismatched lengths";

        var n = real.length;
        if ( n == 0 )
            return;
        else if ( (n & (n - 1)) == 0 )  // Is power of 2
            transformRadix2( real, imag );
        else
            log( "FFT : unsupported size, size must be a power of 2, got " + n, "error" );
    };


    /*
     * Computes the inverse discrete Fourier transform (IDFT) of the given complex vector, storing the result back into the vector.
     * The vector can have any length. This is a wrapper function. This transform does not perform scaling, so the inverse is not a true inverse.
     */
    fft.inverseTransform = function(real, imag) {
        fft.transform( imag, real );
        for (var i = 0, N = real.length; i < N; i++) {
            imag[i] /= N;
            real[i] /= N;
        }
    };

    /**
     * [in-place] Swap pixels along the two directions by half of the dimension.
     *
     * Allows to change the center from the top-left corner to the center of the
     * image and vice-versa. Elements shifted off one end wrap around and are shifted onto
     * the other end. That means the output image size is the same that the input image.
     *
     * @param {ImageAccess} image - input image
     Swapped image
     */
    fft.circularShift = function(image) {
        var nx = image.width;
        var ny = image.height;
        var xshift = nx / 2;
        var yshift = ny / 2;
        var rowin = [];
        var rowout = [];
        for (var y = 0; y < ny; y++) {
            rowin = image.getRow( y );
            arraycopy( rowin, xshift, rowout, 0, nx - xshift );
            arraycopy( rowin, 0, rowout, nx - xshift, xshift );
            image.putRow( y, rowout );
        }
        var colin = [];
        var colout = [];
        for (var x = 0; x < nx; x++) {
            colin = image.getColumn( x );
            arraycopy( colin, yshift, colout, 0, ny - yshift );
            arraycopy( colin, 0, colout, ny - yshift, yshift );
            image.putColumn( x, colout );
        }

        function arraycopy(src, srcPos, dest, destPos, length) {
            var n = destPos + length;
            for (var i = srcPos, j = destPos; j < n; j++, i++) {
                dest[j] = src[i];
            }

        }
    };

    /*
     * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
     * The vector's length must be a power of 2. Uses the Cooley-Tukey decimation-in-time radix-2 algorithm.
     */
    function transformRadix2(real, imag) {
        // Initialization
        if ( real.length != imag.length )
            throw "Mismatched lengths";
        var n = real.length;
        if ( n == 1 )  // Trivial transform
            return;
        var levels = -1;
        for (var i = 0; i < 32; i++) {
            if ( 1 << i == n )
                levels = i;  // Equal to log2(n)
        }
        if ( levels == -1 )
            throw "Length is not a power of 2";
        var cosTable = new Array( n / 2 );
        var sinTable = new Array( n / 2 );
        for (var i = 0; i < n / 2; i++) {
            cosTable[i] = Math.cos( 2 * Math.PI * i / n );
            sinTable[i] = Math.sin( 2 * Math.PI * i / n );
        }

        // Bit-reversed addressing permutation
        for (var i = 0; i < n; i++) {
            var j = reverseBits( i, levels );
            if ( j > i ) {
                var temp = real[i];
                real[i] = real[j];
                real[j] = temp;
                temp = imag[i];
                imag[i] = imag[j];
                imag[j] = temp;
            }
        }

        // Cooley-Tukey decimation-in-time radix-2 FFT
        for (var size = 2; size <= n; size *= 2) {
            var halfsize = size / 2;
            var tablestep = n / size;
            for (var i = 0; i < n; i += size) {
                for (var j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
                    var tpre = real[j + halfsize] * cosTable[k] + imag[j + halfsize] * sinTable[k];
                    var tpim = -real[j + halfsize] * sinTable[k] + imag[j + halfsize] * cosTable[k];
                    real[j + halfsize] = real[j] - tpre;
                    imag[j + halfsize] = imag[j] - tpim;
                    real[j] += tpre;
                    imag[j] += tpim;
                }
            }
        }

        // Returns the integer whose value is the reverse of the lowest 'bits' bits of the integer 'x'.
        function reverseBits(x, bits) {
            var y = 0;
            for (var i = 0; i < bits; i++) {
                y = (y << 1) | (x & 1);
                x >>>= 1;
            }
            return y;
        }
    }

    // Export
    window.fft = fft;

})( window );
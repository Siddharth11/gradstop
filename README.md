#gradStop.js

####JavaScript micro library (1.1 kB gzipped) to generate monotone color schemes and equidistant gradient stops


###Usage:

    var gradient1 = gradStop({
       stops: 5,
       inputFormat: 'hex',
       colorArray: ['#343838', '#00DFFC']
    });
    
    console.log(gradient1);
    // rgb(52,56,56), rgb(39,97,105), rgb(26,139,154), rgb(13,181,203), rgb(0,223,252)


![alt text][1]


  [1]: https://cdn.rawgit.com/Siddharth11/gradStop.js/master/gradient%20strip.png



    var gradient2 = gradStop({
       stops: 10,
       inputFormat: 'hex',
       colorArray: ['#343838', '#f6f6f6', '#00DFFC']
    });
    
    console.log(gradient2);
    // rgb(52,56,56), rgb(90,94,94), rgb(129,132,132), rgb(168,170,170), rgb(207,208,208), 
    // rgb(196,241,248), rgb(147,236,249), rgb(98,232,250), rgb(49,227,251), rgb(0,223,252)


![alt text][2]


  [2]: https://rawgit.com/Siddharth11/gradStop.js/master/gradient%20strip2.png




####Default Parameters:
 * inputFormat: 'hex' (supports hex, rgb and hsl)
 * stops: 5
 * colorArray: ['#fff', '#000']

Both shorthand(#fff) and standard(#ffffff) format hex values are supported.

###[Demo](http://codepen.io/Siddharth11/full/RPvJmO)

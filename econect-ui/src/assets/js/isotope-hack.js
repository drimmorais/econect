jQuery(document).ready(function (a) {
    "use strict";


    var el = a(".isotope-grid");
    console.log(el);

    var imgLoaded = imagesLoaded(el);
    console.log(imgLoaded);

    function onAlways(instance) {
        console.log('all images are loaded');
    }
    // bind with .on()
    imgLoaded.on('always', onAlways);
    // unbind with .off()
    imgLoaded.off('always', onAlways);

    // var i = a(".isotope-grid").imagesLoaded(function () {

    //     console.log('aew');
    //     console.log(i);

    //     i.isotope({
    //         itemSelector: ".grid-item",
    //         transitionDuration: "0.7s",
    //         masonry: {
    //             columnWidth: ".grid-sizer",
    //             gutter: ".gutter-sizer"
    //         }
    //     })
    // })
});
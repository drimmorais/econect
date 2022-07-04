jQuery(document).ready(function (a) {
    "use strict";
    var m = a(".product-carousel");
    m.length && m.owlCarousel({
        items: 1,
        loop: !1,
        dots: !1,
        URLhashListener: !0,
        startPosition: "URLHash",
        onTranslate: e
    });

});
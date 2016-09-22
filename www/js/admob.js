/**
 * 
 * Google AddMob by Ghayyas Mubashir (TeamClouders)
 * 
 */


var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-7631554899487555/1555263029',
        interstitial: 'ca-app-pub-7631554899487555/9166354221'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-7631554899487555/1555263029',
        interstitial: 'ca-app-pub-7631554899487555/9166354221'
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-7631554899487555/1555263029',
        interstitial: 'ca-app-pub-7631554899487555/9166354221'
    };
}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}

function initApp() {
    if (! AdMob ) { 
        console.log('ad not ready');
      //  alert( 'admob plugin not ready' ); 
    return; 
}

    AdMob.createBanner( {
        adId: admobid.banner, 
        isTesting: false,
        overlap: false, 
        offsetTopBar: false, 
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        bgColor: 'black'
    } );
    
    AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        autoShow: true
    });
    window.setInterval(function(){
        AdMob.showInterstitial();
    },10000);
}
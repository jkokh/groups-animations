var windowSize = $(window).width();
var windowHeight = $(window).height();

// Reload the page on window resize or change device orientation
setTimeout(function () {
	window.onresize = function () {
		if (windowSize !== $(window).width()) {
			location.reload();
		}
	}
}, 100);

var name = findGetParameter('name');
if (!name) {
	name = 'groups';
}

var langName = findGetParameter('lang');
if (!langName) {
	langName = 'en';
}

// Languages

var lang = window.languages[langName];

var scrollbarIcon, scrollbarIconTap, activitiesLineImage;

var appName;

function replaceAppName(str, appName) {
	return str.replace('{{appName}}', appName);
}

switch (name) {
	case 'groupapp':
		appName = lang.groupApp.appName;
		iconIntroduce = 'images/group-contacts-icon.png';
		scrollbarIcon = 'images/group-contacts-scrollbar.png';
		scrollbarIconTap = 'images/group-contacts-scrollbar-tap.png';
		activitiesLineImage = 'images/group-contacts-line.png';
		$('#introHeaderText').html(replaceAppName(lang.groupApp.introHeader, appName));
		$('#introSubheaderText').html(replaceAppName(lang.groupApp.introSubheader, appName));
		break;
	default:
		appName = lang.groups.appName;
		iconIntroduce = 'images/group-icon.png';
		scrollbarIcon = 'images/group-scrollbar.png';
		scrollbarIconTap = 'images/group-scrollbar-tap.png';
		activitiesLineImage = 'images/group-line.png';
		$('#introHeaderText').html(replaceAppName(lang.groups.introHeader, appName));
		$('#introSubheaderText').html(replaceAppName(lang.groups.introSubheader, appName));
		break;
}

for (var i = 0; i < lang.captions.length; i++) {
	lang.captions[i] = replaceAppName(lang.captions[i], appName);
}

$('#enableText').html(replaceAppName(lang.enable, appName));
$('#tryItText').html(replaceAppName(lang.tryIt, appName));
$('#countdownText').html(replaceAppName(lang.countdown, appName));

$('#icon-introduce').css('background-image', 'url(' + iconIntroduce + ')');
$('.scrollbar-icon').css('background-image', 'url(' + scrollbarIcon + ')');
$('.scrollbar-icon-tap').css('background-image', 'url(' + scrollbarIconTap + ')');
$('#activities-line').css('background-image', 'url(' + activitiesLineImage + ')');

var actualWidth = 640; // actual width of images

var scale = windowSize / actualWidth;

var tl = new TimelineLite();

// TODO replace it by Qbix method
function findGetParameter(parameterName) {
	var result = false,
		tmp = [];
	location.search
		.substr(1)
		.split("&")
		.forEach(function (item) {
			tmp = item.split("=");
			if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
		});
	return result;
}

function changeCaption(text) {
	$("#caption").text(text)
}

$('body').show();

tl.timeScale(1);

// INITIALIZE ANIMATIONS
// make all steps invisible
$('.step, #activities-header #activities-list').css({opacity: 0});
tl.to('.step', 0, {display: 'none'});
tl.to('.pointer-hand', 0, {width: 120 * scale, height: 150 * scale, opacity: 0});
tl.to('.menu', 0, {bottom: 0, height:  818 * scale, opacity: 0});

tl.to('.menu-scrollbar-holder', 0, {left: 17 * scale, width:  606 * scale, height:  221 * scale, top: 224 * scale});
tl.to('.menu-scrollbar', 0, {left: 0, width: 1735 * scale});
tl.to('.menu-more-button-taped', 0, {width: 120 * scale, height: 120 * scale, opacity: 0});

tl.to('#activities-holder', 0, {height: windowHeight});
tl.to('#activities-header', 0, {width: 640 * scale, height: 92 * scale});
tl.to('#activities-list', 0, {width: 640 * scale, height: 2912 * scale, top: -3 * scale});
tl.to('#activities-line', 0, {width: 640 * scale, height: 88 * scale, top: 2824 * scale});
tl.to('#switch-on', 0, {width: 128 * scale, height: 78 * scale, top: 96 * scale, left: 403 * scale, opacity: 0});
tl.to('#done-fade', 0, {width: 92 * scale, height: 32 * scale, top: 32 * scale, left: 538 * scale, opacity: 0});
tl.to('.cancel-fade', 0, {width: 156 * scale, height: 52 * scale, opacity: 0});
tl.to('#pointer-hand-drag-group', 0, {left: 529 * scale, top: 39 * scale, width: 120 * scale, height: 160 * scale});
tl.to('.scrollbar-icon', 0, {width: 120 * scale, height: 190 * scale, top: 21 * scale, left: 15 * scale, opacity: 0});
tl.to('.scrollbar-icon-tap', 0, {
	width: 120 * scale,
	height: 120 * scale,
	top: 21 * scale,
	left: 15 * scale,
	opacity: 0
});
tl.to('#arrow', 0, {width: 164 * scale, height: 212 * scale, opacity: 0});
tl.to('#countdown', 0, {opacity: 0});


// STEP 1 (Introduce)
tl.to('#step-1', 0.3, {opacity: 1, display: 'flex'});
tl.from('#icon-introduce', 1, {scale: 0.8, opacity: 0});
tl.from('#step-1 .header', 1, {delay: 1, opacity: 0, top: 50 * scale}, '-=2');
tl.from('#step-1 .subheader', 1, {opacity: 0, top: 50 * scale}, '-=0.5');
tl.to('#step-1 .header-text', 0.5, {delay: 4, opacity: 0, top: 20 * scale});

// STEP 2 (Share button)
tl.to('#share-button-fake-container', 0, {height: 180 * scale});
tl.to('#share-button-fake', 0, {width: 75 * scale, height: 95 * scale, opacity: 1});
tl.to('#step-2', 1, {opacity: 1, display: 'block'});
tl.from('#step-2', 1, {opacity: 0}, '-=2');


tl.to('#step-2 .pointer-hand', 0, {top: 23 * scale, left: 400 * scale, opacity: 0});
tl.to('#step-2 .pointer-hand', 0.3, {opacity: 1});
tl.to('#step-2 .pointer-hand', 0.5, {left: 300 * scale});
tl.to('#share-button-fake', 0.3, {opacity: 0.5});
tl.to('#step-2 .pointer-hand', 0.3, {opacity: 0, display: 'none'});

// STEP 3 (Menu)
tl.addLabel('step-3-open');
tl.to('#step-3 .menu-more-button-taped', 0, {top: 21 * scale, right: 17 * scale});
tl.to('#step-3', 0, {display: 'block'});

tl.to('#step-3', 0.3, {opacity: 1});
tl.to('#step-3 .menu', 0, {bottom: '-100%'}, 'step-3-open');
tl.to('#step-3 .menu', 0.5, {opacity: 1, bottom: 0}, 'step-3-open');

tl.addLabel('caption-1-open');
tl.call(changeCaption, [lang.captions[0]]);
tl.to('.caption-holder', 0, {display: 'block'});
tl.to('#caption', 0, {top: 250 * scale, scale: 0});
tl.to('.caption-holder', 0, {display: 'block'});
tl.to('#caption', 0.4, {scale: 1, opacity: 1});

tl.to('#step-3 .pointer-hand', 0, { top: 400 * scale, left: 450 * scale}, 'caption-1-open');
tl.to('#step-3 .pointer-hand', 0.3, { opacity: 1, delay: 1});

tl.addLabel('step-3-scrollbar-drag-start');
tl.to('#step-3 .pointer-hand', 0.5, { x: -300 * scale});
tl.to('#step-3 .pointer-hand', 0.3, { opacity: 0});
tl.to('#step-3 .menu-scrollbar', 1, {x: -1127 * scale, ease: Power2.easeOut}, 'step-3-scrollbar-drag-start');
tl.to('#step-3 .pointer-hand', 0, { top: 380 * scale, left: 817 * scale});
tl.to('#step-3 .pointer-hand', 0.3, { opacity: 1});
tl.to('#step-3 .pointer-hand', 0.3, { top: 317 * scale, left: 817 * scale}, '-=0.3');
tl.to('#step-3 .menu-more-button-taped', 0.3, {opacity: 1});

tl.addLabel('caption-1-close');
tl.to('#caption', 0.2, {scale: 0, opacity: 0});
tl.to('.caption-holder', 0, {display: 'none'});

// STEP 4 (Activities)
tl.to('#step-4', 0, {display: 'block', y: '100%'});
tl.to('#step-4', 0.5, {opacity: 1, y: '0%'});
tl.to('#step-3', 0, {display: 'none'});

tl.addLabel('caption-2-open');
tl.call(changeCaption, [lang.captions[1]]);
tl.to('.caption-holder', 0, {display: 'block'});
tl.to('#caption', 0, {top: 480 * scale, scale: 0, x: '-50%'});
tl.to('#caption', 0.4, {scale: 1, opacity: 1});

tl.to('#step-4 .pointer-hand', 0, { top: 655 * scale, left: 300 * scale}, 'caption-2-open');
tl.to('#step-4 .pointer-hand', 0.4, {opacity: 1});
tl.addLabel('step-4-scroll');
tl.to('#step-4 .pointer-hand', 0.5, {top: 295 * scale});
tl.to('#step-4 .pointer-hand', 0.5, {opacity: 0}, '-=0.2');
tl.to('#activities-list', 1.2, {y: '-100%', top: windowHeight}, 'step-4-scroll');

tl.addLabel('caption-2-close');
tl.to('#caption', 0.4, {scale: 0, opacity: 0});
tl.to('.caption-holder', 0, {display: 'none'});

tl.from('.pointer-hand-drag-group', 0.5, {opacity: 0}, 'caption-2-close');
tl.to('#activities-line', 0.3, {opacity: 0.8}, '+=0.3');

tl.addLabel('caption-3-open');
tl.call(changeCaption, [lang.captions[2]]);
tl.to('.caption-holder', 0, {display: 'block'});
tl.to('#caption', 0, {top: 480 * scale, scale: 0, x: '-50%'});
tl.to('#caption', 0.4, {scale: 1, opacity: 1});

tl.to('#activities-line', 2, {top: 6 * scale}, 'caption-3-open');
tl.to('#activities-list', 2, {y: '0%', top: 84 * scale}, 'caption-3-open');
tl.to('#activities-line', 0.3, {opacity: 1});


tl.addLabel('caption-3-close');
tl.to('#caption', 0.4, {scale: 0, opacity: 0});
tl.to('.caption-holder', 0, {display: 'none'});

tl.to('#pointer-hand-drag-group', 0.5, {delay: 0.5, opacity: 0}, 'caption-3-close');

tl.to('#step-4 .pointer-hand', 0, {top: 140 * scale, left: 450 * scale});
tl.to('#step-4 .pointer-hand', 0.5, {opacity: 1});

tl.addLabel('caption-4-open');
tl.call(changeCaption, [lang.captions[3]]);
tl.to('.caption-holder', 0, {display: 'block'});
tl.to('#caption', 0, { scale: 0, x: '-50%'});
tl.to('#caption', 0.4, {scale: 1, opacity: 1});
tl.to('#step-4 .pointer-hand', 0.3, {delay: 0.2, top: 140 * scale, left: 490 * scale}, 'caption-4-open');
tl.to('#switch-on', 0.3, {opacity: 1}, '-=0.3');
tl.to('#step-4 .pointer-hand', 0.3, {delay: 0.5, top: 140 * scale, left: 490 * scale});
tl.to('#step-4 .pointer-hand', 0.3, {opacity: 0});
tl.to('#step-4 .pointer-hand', 0.3, {opacity: 1, rotation: 45, top: 55 * scale, left: 530 * scale});
tl.to('#done-fade', 0.3, {opacity: 1});

tl.addLabel('caption-4-close');
tl.to('#caption', 0.4, {scale: 0, opacity: 0});
tl.to('.caption-holder', 0, {display: 'none'});

tl.to('#step-4 .pointer-hand', 0.3, {delay: 0.2, opacity: 0}, 'caption-4-close');

tl.addLabel('step-4-close');
tl.to('#step-4', 0.5, {y: '100%'});
tl.to('#step-4', 0, {display: 'none', y: '100%'});

// STEP 5
tl.to('#share-button-fake', 0, {opacity: 1});
tl.to('#step-5', 0, {display: 'block', opacity: 1}, 'step-4-close');
tl.to('#step-5 .menu', 0, {bottom: 0, opacity: 1}, 'step-4-close');
tl.to('#step-5 .cancel-fade', 0, {bottom: 40 * scale, left: 245 * scale}, 'step-4-close');
tl.to('#step-5 .menu-scrollbar', 0, {clearProps:'left', right: 0}, 'step-4-close');
tl.to('#step-5 .pointer-hand', 0, { top: 690 * scale, left: 450 * scale, rotation: -45});
tl.to('#step-5 .pointer-hand', 0.3, { opacity: 1});
tl.to('#step-5 .pointer-hand', 0.7, { left: 390 * scale });
tl.to('#step-5 .cancel-fade', 0.3, { opacity: 1 });
tl.to('#step-5 .menu', 0.5, {bottom: '-100%'});
tl.to('#step-5', 0.3, {opacity: 0}, '-=0.3');

tl.addLabel('caption-5-open');
tl.call(changeCaption, [lang.captions[4]]);
tl.to('.caption-holder', 0, {display: 'block'});
tl.to('#caption', 0, {top: 250 * scale, scale: 0, x: '-50%'});
tl.to('#caption', 0.4, {scale: 1, opacity: 1});

tl.to('#step-2', 0.8, {opacity: 1, display: 'block'}, '-=0.8');
tl.to('#step-2 .pointer-hand', 0, {left: 400 * scale}, 'caption-5-open');
tl.to('#step-2 .pointer-hand', 0.3, {opacity: 1, display: 'block'});
tl.to('#step-2 .pointer-hand', 0.5, {left: 300 * scale});
tl.to('#share-button-fake', 0.3, {opacity: 0.5});
tl.to('#step-2 .pointer-hand', 0.3, {opacity: 0, display: 'none'});

// STEP 6 (Menu)
tl.addLabel('step-6-open');
tl.to('#step-6 .scrollbar-icon', 0, {display: 'block', opacity: 1});
tl.to('#step-6', 0, {display: 'block'});
tl.to('#step-6 .menu', 0, {bottom: '-100%'}, 'step-6-open');

tl.to('#step-6', 0.3, {opacity: 1}, 'step-6-open');
tl.to('#step-6 .menu', 0.5, {opacity: 1, bottom: 0}, 'step-6-open');

tl.to('#step-6 .pointer-hand', 0, { top: 380 * scale, left: 160 * scale});
tl.to('#step-6 .pointer-hand', 0.3, { opacity: 1});
tl.to('#step-6 .pointer-hand', 0.3, { top: 300 * scale, left: 88 * scale, delay: 0.5});
tl.to('#step-6 .scrollbar-icon-tap', 0.3, { opacity: 1, display: 'block', delay: 1});

tl.addLabel('caption-5-close');
tl.to('#caption', 0.4, {scale: 0, opacity: 0});
tl.to('.caption-holder', 0, {display: 'none'});


tl.to('#step-7', 1, {opacity: 1, display: 'table'});
tl.from('#step-7 h1', 1, {opacity: 0});
tl.to('#arrow', 0, {y: -50 * scale}, '-=0.2');
tl.to('#arrow', 1, {
	y: 0,
	opacity: 1, onComplete: function () {
		var countdown = $('#countdown span.digit');
		var time = 5;
		countdown.html(time);
		var interval = setInterval(function () {
			countdown.html(time - 1);
			time--;
			if (time === 0) {
				clearInterval(interval);
				tl.restart();
			}
		}, 1000);
	}
});
tl.to('#countdown', 0.5, {opacity: 1});
tl.to('#step-1, #step-2, #step-3, #step-4, #step-5, #step-6', 0, {display: 'none'});
tl.to('#step-7', 1, {delay: 3.5, opacity: 0});
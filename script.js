
//====================================================================================================================================================


function openForm() {
    var elems = document.getElementsByClassName('header-burger');
    for (var i = 0; i < elems.length; i += 1) {
        elems[i].style.right = '0px';
    }
}

function closeForm() {
    var elems = document.getElementsByClassName('header-burger');
    for (var i = 0; i < elems.length; i += 1) {
        elems[i].style.right = '-1000px';
    }
}


//====================================================================================================================================================


const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}


//====================================================================================================================================================


$(function () {
  $(".button").mouseover(function(){
        var elems = document.getElementsByClassName('button-slide');
    	for (var i = 0; i < elems.length; i += 1) {
    	    elems[i].style.bottom = '0px';
    	}
   });
   
    $(".button").mouseout(function(){
        var elems = document.getElementsByClassName('button-slide');
    	for (var i = 0; i < elems.length; i += 1) {
    	    elems[i].style.bottom = '-100%';
    	}
   });
});
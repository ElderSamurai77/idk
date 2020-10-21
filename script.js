"use strict"


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
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);
}

//====================================================================================================================================================


$(function() {
    $(".button").mouseover(function() {
        var elems = document.getElementsByClassName('button-slide');
        for (var i = 0; i < elems.length; i += 1) {
            elems[i].style.bottom = '0px';
        }
    });

    $(".button").mouseout(function() {
        var elems = document.getElementsByClassName('button-slide');
        for (var i = 0; i < elems.length; i += 1) {
            elems[i].style.bottom = '-100%';
        }
    });
});

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide__item");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
//====================================================================================================================================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        // formData.append('image', formImage.files[0]);

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert("Ошибка)");
                form.classList.remove('_sending');
            }
        } else {
            alert('Заполните обязательные поля');
        }

    }


    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    //Функция теста email
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    // //Получаем инпут file в переменную
    // const formImage = document.getElementById('formImage');
    // //Получаем див для превью в переменную
    // const formPreview = document.getElementById('formPreview');

    // //Слушаем изменения в инпуте file
    // formImage.addEventListener('change', () => {
    //     uploadFile(formImage.files[0]);
    // });

    // function uploadFile(file) {
    //     // провераяем тип файла
    //     if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
    //         alert('Разрешены только изображения.');
    //         formImage.value = '';
    //         return;
    //     }
    //     // проверим размер файла (<2 Мб)
    //     if (file.size > 2 * 1024 * 1024) {
    //         alert('Файл должен быть менее 2 МБ.');
    //         return;
    //     }

    //     var reader = new FileReader();
    //     reader.onload = function(e) {
    //         formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
    //     };
    //     reader.onerror = function(e) {
    //         alert('Ошибка');
    //     };
    //     reader.readAsDataURL(file);
    // }
});
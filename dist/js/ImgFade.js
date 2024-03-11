class ImgFade {
    setup(){
        [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.onload = function() {
                img.removeAttribute('data-src');
            };
        });
    }
}

export const imgFade = new ImgFade()
document.addEventListener('DOMContentLoaded', imgFade.setup)

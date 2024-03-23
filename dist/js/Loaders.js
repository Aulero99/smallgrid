class Loaders {
    loadAllImg(){
        Array.prototype.forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.onload = function() {
                img.removeAttribute('data-src');
            };
        });
    }
    loadAllImgInId(id){
        Array.prototype.forEach.call(document.getElementById(id).querySelectorAll('img[data-src]'), function(img) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.onload = function() {
                img.removeAttribute('data-src');
            };
        });
    }
}

export const loaders = new Loaders()
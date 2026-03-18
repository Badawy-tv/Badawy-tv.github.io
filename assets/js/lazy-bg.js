
document.addEventListener('DOMContentLoaded', function(){
    function lazyLoadBackgrounds() {
        document.querySelectorAll('[data-bg]').forEach(function(el){
            if (el.getAttribute('data-bg-loaded')) return;
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.style.backgroundImage = 'url(' + el.getAttribute('data-bg') + ')';
                el.setAttribute('data-bg-loaded', 'true');
            }
        });
    }
    lazyLoadBackgrounds();
    window.addEventListener('scroll', lazyLoadBackgrounds);
    window.addEventListener('resize', lazyLoadBackgrounds);
});

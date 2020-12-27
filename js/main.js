window.addEventListener('load', () => {
    document.querySelector('.sec-div').addEventListener('click', e => {
        if (e.target.closest('.sec-link')) {
            setTimeout(() => window.scrollBy(0, -90));
        }
    });

    let scroller = document.querySelector('.scroller');
    let ul = scroller.querySelector('ul');
    let listItems = ul.querySelectorAll('li');


    let stage = 0;
    let lastElem = listItems[0];
    let delay = +scroller.getAttribute('delay') || 5000;

    setStage(0);

    let id = setInterval(() => {
        setStage(stage + 1);
    }, delay);

    document.addEventListener('click', e => {
        if (e.target.closest('.scroller-next-button')) {
            setStage(stage + 1);
            clearInterval(id);
            id = setInterval(() => {
                setStage(stage + 1);
            }, delay);
        } else if (e.target.closest('.scroller-prev-button')) {
            setStage(stage - 1);
            clearInterval(id);
            id = setInterval(() => {
                setStage(stage + 1);
            }, delay);
        }
    });

    function setStage(s) {
        s = s % listItems.length;
        if (s < 0) {
            s = listItems.length + s;
        }

        lastElem.style.marginRight = '0';
        lastElem.style.marginLeft = '0';

        let width = 0;
        for (let i = 0; i < s; i++) {
            width -= listItems[i].offsetWidth;
        }
        lastElem = listItems[s];
        stage = s;
        let indent = (scroller.clientWidth - lastElem.offsetWidth) / 2;
        lastElem.style.marginLeft = indent + 'px';
        lastElem.style.marginRight = indent + 'px';
        ul.style.transform = `translateX(${width}px)`;
    }

    let selectors = ['.pF']; //Your selectors here

    //script setup
    let lastScroll = pageYOffset;
    let elems = selectors.map(s => document.querySelector(s));

    document.addEventListener('scroll', () => {
        let shift = pageYOffset - lastScroll;
        elems.forEach(e => {
            if (e) {
                e.currentScroll = Math.max(0, Math.min(e.offsetHeight, (e.currentScroll || 0) + shift));
                e.style.transform = `translateY(${-e.currentScroll}px)`;
            }
        });
        lastScroll = pageYOffset;
    });

});
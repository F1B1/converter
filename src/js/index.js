'use strict'

import event from "./modules/events";

import { canvasCircle } from "./modules/canvas";

import { tabs } from "./modules/tabs";

window.addEventListener('DOMContentLoaded', ()=>{
    const menuIcon = document.querySelector('.icon-menu'),
          menuBody = document.querySelector('.header__list');
    
    menuIcon.addEventListener("click", function(e) {
        menuIcon.classList.toggle('active')
        menuBody.classList.toggle('active')
        document.body.classList.toggle('hidden')
    });

    document.querySelector('.header__item-button').addEventListener("click", function(e) {
        document.querySelector('.header__sub-list').classList.toggle('active')
        document.querySelector('.header__item-button').classList.toggle('active')
    });

    event()
    canvasCircle()

    tabs()
})

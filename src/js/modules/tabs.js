export function tabs(){
    const   tabContent = document.querySelectorAll('.transaction__content'),
    tabTitle = document.querySelectorAll('.transaction__item'),
    tabParent = document.querySelector('.transaction__list');

    function showTab(i = 0){
    tabContent[i].classList.remove('hide')
    tabTitle[i].classList.add('active')
    }

    function hideTab(){
    tabContent.forEach(item=>{
        item.classList.add('hide')
    })
    tabTitle.forEach(item=>{
        item.classList.remove('active')
    })
    }

    hideTab()
    showTab()

    tabParent.addEventListener("click", function(e) {
    const target = e.target
    if(target && target.classList.contains('transaction__item')){
        tabTitle.forEach((item, i)=>{
            if(target == item){
                hideTab()
                showTab(i)
            }
        })
    }
    });
}
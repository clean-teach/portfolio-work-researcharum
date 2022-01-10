// Utils
let scrollBaseValue = 0;
function getScrollDirection(){
    let result;
    if(scrollBaseValue < window.scrollY) result = 'DOWN';
    else result = 'UP';
    scrollBaseValue = window.scrollY;
    return result;
}

// Popup js
const popupArea = document.querySelector('#popup-area');

function openPopup(popup){
    document.body.style.overflow = "hidden";
    popupArea.style.display = 'flex';
    popupArea.querySelector('.popup-box').style.display = 'none';
    popupArea.querySelector(popup).style.display = 'block';
}
function closePopup(){
    document.body.style.overflow = "scroll";
    popupArea.style.display = 'none';
    popupArea.querySelectorAll('.popup-box').forEach(popup => {
        popup.style.display = 'none';
    });
}
if(popupArea){
    popupArea.querySelectorAll('.btn-close').forEach(btnClose => {
        btnClose.addEventListener('click', function(){
            closePopup();
        });
    }); 
}

// Header js
(function(){
    const header = document.querySelector('header');
    const btnMainMenu = document.querySelector('#btn-main-menu');
    const gnbBtns = document.querySelector('header .gnb').querySelectorAll('a');
    const mainDropdownMenu = document.querySelector('.depth-sub');
    const mainDropdownMenuH = mainDropdownMenu.offsetHeight;
    const mainDropdownMenuDepth01List = mainDropdownMenu.querySelectorAll('.depth-01>li');
    const mainDropdownMenuBtns = mainDropdownMenu.querySelectorAll('a');
    const searchArea = document.querySelector('#header-search-area');

    let currentMainMenu = false;

    // setDimmed(header);
    // function setDimmed(target){
    //     const tgClone = target.cloneNode(true);
    //     const documentHeight = document.documentElement.offsetHeight;
    //     const dimBox = document.createElement('div');
    //     dimBox.style.height = documentHeight + 'px';
    //     dimBox.style.backgroundColor = `rgba(0,0,0,.6)`;
    //     dimBox.appendChild(tgClone);
    //     console.log(dimBox);
    // }

    function showDropdownMenu(dropdownMenu){
        header.classList.add('on');
        dropdownMenu.style.transition = .4 + 's';
        dropdownMenu.style.height = mainDropdownMenuH + 'px';
        mainDropdownMenuBtns.forEach(btn=>{
            btn.style.transition = .4 + 's';
            btn.style.transitionDelay = .1 + 's';
            btn.style.opacity = 1;
        });
        dropdownMenu.classList.add('on');
        btnMainMenu.classList.add('close');
        currentMainMenu = true;
    }
    function hideDropdownMenu(dropdownMenu){
        header.classList.remove('on');
        dropdownMenu.style.height = 0;
        mainDropdownMenuBtns.forEach(btn=>{
            btn.style.opacity = 0;
        });
        gnbBtns.forEach((btn, i, arr) => {
            btn.classList.remove('on');
        });
        dropdownMenu.classList.remove('on');
        btnMainMenu.classList.remove('close');
        currentMainMenu = false;
    }

    function showSearchArea(searchArea){
        document.body.style.overflow = "hidden";
        searchArea.classList.add('on');
        hideDropdownMenu(mainDropdownMenu);
    }
    function hideSearchArea(searchArea){
        document.body.style.overflow = "scroll";
        searchArea.classList.remove('on');
    }

    hideDropdownMenu(mainDropdownMenu);
    header.querySelector('.gnb').addEventListener('mouseenter', function(){
        showDropdownMenu(mainDropdownMenu);
    });
    mainDropdownMenu.querySelector('.depth-01').addEventListener('mouseleave', function(){
        hideDropdownMenu(mainDropdownMenu);
    });
    btnMainMenu.addEventListener('click', function(){
        if(this.classList.value === 'close'){
            hideDropdownMenu(mainDropdownMenu);
        }else{
            showDropdownMenu(mainDropdownMenu);
        }
    });

    mainDropdownMenuDepth01List.forEach((li, i, arr) => {
        arr[i].addEventListener('mouseover',function(){
            const current = i;
            gnbBtns.forEach((btn, i, arr) => {
                btn.classList.remove('on');
                arr[current].classList.add('on');
            });
        });
    });

    document.querySelector('#btn-search-toggle').addEventListener('click', function(){
        if(searchArea.classList.value === 'on'){
            hideSearchArea(searchArea);
        }else{
            showSearchArea(searchArea);
        }
    });


    // scroll 상태에 따른 Local Navigation Button Style
    function setLnbStyle(e) {
        if(e && getScrollDirection() === 'DOWN'){
            actionHeaderToggle().hide();
        } else if(e && getScrollDirection() === 'UP'){
            actionHeaderToggle().show();
        }
    }
    function actionHeaderToggle(){
        if(document.documentElement.scrollTop >= window.innerHeight && !currentMainMenu) {
            return {
                hide: function(){
                    header.style['top'] = `-${header.offsetHeight}px`;
                    header.style['transition'] = '1s';
                },
                show: function(){
                    header.style['top'] = 0;
                    header.style['transition'] = '1s';
                }
            };
        }else{
            return {
                hide: function(){
                    null;
                },
                show: function(){
                    null;
                }
            };
        }
    }
    
    document.addEventListener('scroll', function(e) {
        setLnbStyle(e);
    });
}())
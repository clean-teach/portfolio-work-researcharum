// Utils
let scrollBaseValue = 0;
function getScrollDirection(){
    let result;
    if(scrollBaseValue < window.scrollY) result = 'DOWN';
    else result = 'UP';
    scrollBaseValue = window.scrollY;
    return result;
}

// 종목 선택 버튼 클릭시, 데이터 업데이트
function setStockItemList(){
    window.event.preventDefault();
    const researchListArea = document.querySelector('#research-list-area');
    const stockItemSummaryArea = document.querySelector('.stock-item-summary-area');
    const htmlInnerStockItemSummary = `
    <div class="tit-wrap">
        <img src="../img/icon-chart-01.svg" alt="그래프가 차트 아이콘">
        <div class="txt-wrap">
            <h3>
                <dl>
                    <dt>[종목]</dt>
                    <dd>에이치엔에스하이텍 (044990, KONEX)</dd>
                </dl>
            </h3>
        </div>
    </div>
    `;
    stockItemSummaryArea.innerHTML = htmlInnerStockItemSummary;
    stockItemSummaryArea.style.display = 'block';
}

// Popup js
const popupArea = document.querySelector('#popup-area');

function openPopup(popup){
    document.body.style.overflowY = "hidden";
    popupArea.style.display = 'flex';
    popupArea.querySelector('.popup-box').style.display = 'none';
    popupArea.querySelector(popup).style.display = 'block';
}
function closePopup(){
    document.body.style.overflowY = "scroll";
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
    const mainDropdownMenuContArea = mainDropdownMenu.querySelector('.cont-area');
    const mainDropdownMenuH = mainDropdownMenuContArea.offsetHeight;
    const mainDropdownMenuDepth01List = mainDropdownMenu.querySelectorAll('.depth-01>li');
    const mainDropdownMenuBtns = mainDropdownMenu.querySelectorAll('a');
    const btnMainSearch = document.querySelector('#btn-search-toggle')
    const searchArea = document.querySelector('.header-search-area');

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

    function setHeightDropdownMenu(){
        if(window.innerWidth >= 1680){
            mainDropdownMenuContArea.style.height = 
            mainDropdownMenuH + 'px';
        }else{
            mainDropdownMenuContArea.style.height = 
            (window.innerHeight - 85) + 'px';
        }
    }

    function showDropdownMenu(){
        document.body.style.overflowY = "hidden";
        header.classList.add('on');
        mainDropdownMenu.style.display = 'block';
        setHeightDropdownMenu();
        mainDropdownMenu.classList.add('on');
        setTimeout(function() {
            mainDropdownMenuContArea.style.transition = .4 + 's';
            mainDropdownMenuBtns.forEach(btn=>{
                btn.style.transition = .4 + 's';
                btn.style.transitionDelay = .1 + 's';
                btn.style.opacity = 1;
            });
        }, 1);
        btnMainMenu.classList.add('close');
        currentMainMenu = true;
    }
    function hideDropdownMenu(){
        document.body.style.overflowY = "scroll";
        header.classList.remove('on');
        mainDropdownMenu.style.display = 'none';
        mainDropdownMenu.classList.remove('on');
        mainDropdownMenuContArea.style.height = 0;
        mainDropdownMenuBtns.forEach(btn=>{
            btn.style.opacity = 0;
        });
        gnbBtns.forEach((btn, i, arr) => {
            btn.classList.remove('on');
        });
        btnMainMenu.classList.remove('close');
        currentMainMenu = false;
    }

    function showSearchArea(){
        hideDropdownMenu();
        document.body.style.overflowY = "hidden";
        header.classList.add('on');
        header.querySelector('#btn-main-menu').style.display = 'none';
        searchArea.classList.add('on');
        btnMainSearch.classList.add('close');
    }
    function hideSearchArea(){
        document.body.style.overflowY = "scroll";
        header.classList.remove('on');
        header.querySelector('#btn-main-menu').style.display = 'flex';
        searchArea.classList.remove('on');
        btnMainSearch.classList.remove('close');
    }

    hideDropdownMenu();
    header.querySelector('.gnb').addEventListener('mouseenter', function(){
        showDropdownMenu();
    });
    mainDropdownMenu.querySelector('.cont-area').addEventListener('mouseleave', function(){
        if(window.innerWidth >= 1024){
            hideDropdownMenu();
        }
    });
    btnMainMenu.addEventListener('click', function(){
        if(this.classList.value === 'close'){
            hideDropdownMenu();
        }else{
            showDropdownMenu();
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

    btnMainSearch.addEventListener('click', function(){
        let current = false;
        searchArea.classList.forEach(i => {
            if(i === 'on'){
                current = true;
            }else{
                current = false;
            }
        });
        if(current){
            hideSearchArea();
        }else{
            showSearchArea();
        }
    });


    // scroll 상태에 따른 Local Navigation Button Style
    function setLnbStyle(e) {
        if(e && getScrollDirection() === 'DOWN' && window.innerWidth > 1024){
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

    window.addEventListener('resize', function(){
        setHeightDropdownMenu();
    });
    
    document.addEventListener('scroll', function(e) {
        setLnbStyle(e);
    });
}())
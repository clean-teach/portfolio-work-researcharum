(function(){
    const header = document.querySelector('header');
    const mainDropdownMenu = document.querySelector('.depth-sub');
    const mainDropdownMenuH = mainDropdownMenu.offsetHeight;
    const searchArea = document.querySelector('#header-search-area');
    console.log(mainDropdownMenuH);

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
        dropdownMenu.style.display = 'block';
        dropdownMenu.classList.add('on');
        // dropdownMenu.style.transform = 'scaleY(1)';
        // dropdownMenu.style.transition = '.4s';
    }
    function hideDropdownMenu(dropdownMenu){
        header.classList.remove('on');
        dropdownMenu.style.display = 'none';
        dropdownMenu.classList.remove('on');
        // dropdownMenu.style.transform = 'scaleY(0)';
    }

    header.querySelector('.gnb').addEventListener('mouseenter', function(){
        showDropdownMenu(mainDropdownMenu);
    });
    mainDropdownMenu.querySelector('.depth-01').addEventListener('mouseleave', function(){
        hideDropdownMenu(mainDropdownMenu);
    });

    function showSearchArea(searchArea){
        document.body.style.overflow = "hidden";
        searchArea.classList.add('on');
        hideDropdownMenu(mainDropdownMenu);
    }
    function hideSearchArea(searchArea){
        document.body.style.overflow = "scroll";
        searchArea.classList.remove('on');
    }

    document.querySelector('#btn-search-toggle').addEventListener('click', function(){
        console.log(searchArea.classList.value === 'on');
        console.log(searchArea.classList.value);
        if(searchArea.classList.value === 'on'){
            hideSearchArea(searchArea);
        }else{
            showSearchArea(searchArea);
        }
    });
}())
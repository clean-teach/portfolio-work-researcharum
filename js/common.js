(function(){
    const header = document.querySelector('header');
    const mainDropdownMenu = document.querySelector('.depth-sub');
    const searchArea = document.querySelector('#header-search-area');

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
        // dropdownMenu.style.transform = 'scaleY(1)';
        // dropdownMenu.style.transition = '.4s';
    }
    function hideDropdownMenu(dropdownMenu){
        header.classList.remove('on');
        dropdownMenu.style.display = 'none';
        // dropdownMenu.style.transform = 'scaleY(0)';
    }

    header.querySelector('.gnb').addEventListener('mouseenter', function(){
        showDropdownMenu(mainDropdownMenu);
    });
    mainDropdownMenu.querySelector('.depth-01').addEventListener('mouseleave', function(){
        hideDropdownMenu(mainDropdownMenu);
    });

    document.querySelector('#btn-search-toggle').addEventListener('click', function(){
        searchArea.classList.toggle('on');
        hideDropdownMenu(mainDropdownMenu);
    });
}())
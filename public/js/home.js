const toggleBtn = document.querySelector('.navbar_toggleBtn');
const menu = document.querySelector('.navbar_menu')
const user = document.querySelector('.navbar_user')
const menu_element = document.querySelectorAll('.navbar_menu a')


toggleBtn.addEventListener('click', ()=>{
    menu.classList.toggle('active');
    user.classList.toggle('active');
});

menu_element[0].addEventListener('click', ()=>{
    alert('로그인 하셔야 합니다!');
});

menu_element[1].addEventListener('click', ()=>{
    alert('로그인 하셔야 합니다!');
});

menu_element[2].addEventListener('click', ()=>{
    alert('로그인 하셔야 합니다!');
});
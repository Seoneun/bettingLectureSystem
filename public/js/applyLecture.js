const toggleBtn = document.querySelector('.navbar_toggleBtn');
const menu = document.querySelector('.navbar_menu');
const user = document.querySelector('.navbar_user');
const user_info = document.getElementById('user_info');
const menu_element = document.querySelectorAll('.navbar_menu a');
const remain_points = document.querySelector('.remain_points');

toggleBtn.addEventListener('click', ()=>{
    menu.classList.toggle('active');
    user.classList.toggle('active');
});

function getCookie(name) {

    var nameOfCookie = name + "=";

    var x = 0;

    while (x <= document.cookie.length) {

         var y = (x + nameOfCookie.length); 

         if (document.cookie.substring(x, y) == nameOfCookie) {

              if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)

                   endOfCookie = document.cookie.length;

              return unescape(document.cookie.substring(y, endOfCookie));

         }

         x = document.cookie.indexOf(" ", x) + 1;
         if (x == 0)
              break;

    }
    return ""; 

}

var cookie = getCookie('user');
var points = getCookie('points');

user_info.innerText = decodeURIComponent(cookie);
remain_points.innerText = "남은 포인트: " + String(points);
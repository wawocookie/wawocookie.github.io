let allData = {};
let button_group = document.querySelectorAll(".category-group label")
let currentData = [];
const color_group = document.querySelector('.color-group')
const create_category = ["color", "storage", "network"];


const xhr = new XMLHttpRequest();
xhr.open('get', 'https://raw.githubusercontent.com/wawocookie/wawocookie.github.io/main/Javascript/ipad/ipad.json');
xhr.send();

//等抓完資料再進行
xhr.onload = function () {
    allData = JSON.parse(xhr.response);
}

button_group.forEach(button => {
    button.addEventListener('click', change.bind(undefined, button.attributes['for'].value))
})
let feature_list
function change(category) {
    currentData = allData[category];

    let set = new Set()
    let feature_list = ['color','storage','network']

    feature_list.forEach(feature => {

        //每一項資料的feature抓出來塞進set 取不重複的
        currentData.forEach(item => {
            set.add(item[feature])
        })

    
        let allstring = "";
        set.forEach(item => {

            //比對依樣 準備取src
            let product = currentData.filter(data=>{
                data[feature] === item
            })


            allstring += `
       <div class="color col">
            <input type="radio" id="#blue" name="${feature}">
            <label for="#blue">
                <div class="pic w-100 text-center">
                    <img src="img/blue.png" alt="" class="">
                </div>
                <h3 >${item}</h3>
            </label>
         </div>`
        })

        set.clear()
   
        let block = document.querySelector(`.${feature}_group`)
        block.innerHTML = "";
        block.innerHTML = allstring;

    })




}
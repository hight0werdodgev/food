class MenuItem {
    constructor(img, title, description, price, ...classes) {
        this.img = img;
        this.title = title;
        this.description = description;
        this.price = price;
        this.classes =classes;
    }

    render() {
        const str = 
        `
        <div class="menu__item">
            <img src="${this.img}" alt="vegy">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        </div>
        `;
        return str;
    }
}

class Repository {

}

const data = [
    [
        'img/tabs/vegy.jpg',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '229',
    ],
    [
        'img/tabs/elite.jpg',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        '550',
    ],
    [
        'img/tabs/post.jpg',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        '430',
    ],
];

const div = document.querySelector('#block');
let text = '';

data.forEach(item => {
    text += new MenuItem(...item).render();
});

div.innerHTML = text;


//forms

const forms = document.querySelectorAll('form');

console.log(forms);

const message = {
    'loading': 'Загрузка...',
    'success': 'Спасибо!',
    'failure': 'Всё пропало!',
};

forms.forEach(item => {
    postData(item);
    console.log(item);
});

function postData (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json');
        let formData = new FormData(form);

        const object = {};

        formData.forEach(function(value, key) {
            object[key] =value;
        });

        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener('load', () => {
            if(request.status === 200) {
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            } else {
                statusMessage.textContent = message.failure;
            }
        });
    });
}


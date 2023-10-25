let a = document.querySelectorAll('.text a')
let modal = document.querySelector('.modal')
let modal2 = document.querySelector('.modal2')
let closed = document.querySelector('.close')
let closed1 = document.querySelector('.closed')
let bas = " http://localhost:8080"
let form = document.querySelector('.change_todo')
let form1 = document.querySelector('.change_todo1')
let form_ipn1 = document.querySelector('#one')
let form_ipn2 = document.querySelector('#twoo')
let form_ipn3 = document.querySelector('#thre')
let form_ipn4 = document.querySelector('#four')
let form_ipn5 = document.querySelector('#fife')
let form_ipn6 = document.querySelector('#onee')
let form_ipn7 = document.querySelector('#two')
let form_ipn8 = document.querySelector('#three')
let form_ipn9 = document.querySelector('#fours')
let form_ipn10 = document.querySelector('#fifeth')
let btn1 = document.querySelector('.btn1')

closed.onclick = () => {
    modal.classList.add('none')
    modal.classList.remove('show')
}
closed1.onclick = () => {
    modal2.classList.add('none2')
    modal2.classList.remove('show2')
}

let discrip = document.querySelector('.article')

a.forEach(a_silk => {
    if (a_silk.innerHTML === "Таблица") {
        a_silk.style.color = "grey"
    }

})
form.onsubmit = (e) => {
    e.preventDefault()

    let dashboard = {
        id: Math.random(),
        name: form_ipn1.value,
        username: form_ipn2.value,
        date: form_ipn4.value,
        task: form_ipn5.value,
        time: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
    }
    fetch(bas + "/todos", {
        method: "post",
        body: JSON.stringify(dashboard),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.status === 200 || res.status === 201) {
            fetch(bas + "/todos")
                .then((res) => res.json())
                .then((res) => reload(res))
        }
    })
}

fetch(bas + '/todos')
    .then((res) => res.json())
    .then((res) => reload(res))

let btn = document.querySelector('.btn')
let btn2 = document.querySelector('.btn2')
function reload(arr) {
    discrip.innerHTML = ""
    
    for (let item of arr) {
        let article = document.createElement('article'),
            text_art = document.createElement('div'),
            h1 = document.createElement('h1'),
            p = document.createElement('p'),
            div = document.createElement('div'),
            span = document.createElement('span'),
            span1 = document.createElement('span'),
            p1 = document.createElement('p');


        article.classList.add('grid')
        text_art.classList.add('text_art')
        h1.classList.add('h1')
        p.classList.add('p')
        div.classList.add('soan')
        p1.classList.add('p1')



        h1.innerHTML = item.name
        p.innerHTML = item.task
        span.innerHTML = item.date
        span1.innerHTML = item.time
        p1.innerHTML = item.username


        if (p.innerHTML === "Не выполнено") {
            p.style.color = "red"
        }
        if (p.innerHTML === "В прогрессе") {
            p.style.color = "blue"
        }
        if (p.innerHTML === "выполнено") {
            p.style.color = "green"
        }
        discrip.append(article)
        article.append(text_art)
        text_art.append(h1, p1, div)
        div.append(span, span1)
        article.append(p)

        btn.onclick = () => {
            modal.classList.add('show')
            modal.classList.remove('none')
        }
        article.onclick = () => {
            modal2.classList.add('show2')
            modal2.classList.remove("none2")

        }
        btn2.onclick = () => {
            fetch(bas + "/todos/" + item.id, {
                method: "delete"
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    article.remove()
                }
            })
        }
    }
}

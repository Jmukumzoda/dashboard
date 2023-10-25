let container = document.querySelector('.container')
let discrip = document.querySelector('.discrip')
let a = document.querySelectorAll('.text a')
let text = document.querySelector('.text ')
let h1_and_btn = document.querySelector('.h1_and_btn')
let form = document.querySelector('.change_todo')
let form_ipn1 = document.querySelector('#one')
let form_ipn2 = document.querySelector('#twoo')
let form_ipn3 = document.querySelector('#thre')
let form_ipn4 = document.querySelector('#four')
let form_ipn5 = document.querySelector('#fife')

let modal = document.querySelector('.modal')
let closed = document.querySelector('.close')
let bas = " http://localhost:8080"
a.forEach(a_silk => {
    if (a_silk.innerHTML === "Плитка") {
        a_silk.style.color = "grey"
    }

})
closed.onclick = () => {
    modal.classList.add('none')
    modal.classList.remove('show')
}
form.onsubmit = (e) => {
    e.preventDefault()

    let dashboard = {
        name: form_ipn1.value,
        username: form_ipn2.value,
        date: form_ipn3.value,
        title4: form_ipn4.value,
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
console.log(a);
fetch(bas + '/todos')
    .then((res) => res.json())
    .then((res) => reload(res))

function reload(arr) {
    discrip.innerHTML = ""

    let a = document.createElement('a')
    for (let item of arr) {
        let tablet = document.createElement('table'),
            tr = document.createElement('tr'),
            h4 = document.createElement('h4'),
            h5 = document.createElement('h5'),
            p = document.createElement('p'),
            p1 = document.createElement('p'),
            p2 = document.createElement('p');
        // hr = document.createElement("hr");
        tr.classList.add('tr')
        tablet.classList.add('tab')
        h5.classList.add('h5')


        h4.innerHTML = item.name
        h5.innerHTML = item.username
        p.innerHTML = item.date
        p1.innerHTML = item.time
        p2.innerHTML = item.task
        a.href = "./index2.html"
        a.innerHTML = "Плитка"
        a.style.color = "grey"


        if (p2.innerHTML === "Не выполнено") {
            p2.style.color = "red"
        }
        if (p2.innerHTML === "В прогрессе") {
            p2.style.color = "blue"
        }
        discrip.append(tablet)
        tablet.append(tr)
        tr.append(h4, h5, p, p1, p2)
        text.append(a)

        h1_and_btn.onclick = () => {
            modal.classList.add('show')
            modal.classList.remove('none')

        }
    }
}
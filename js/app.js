const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()

let carrito = {}
document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizar()


    }

})

cards.addEventListener('click', e =>{
    addCarrito(e)
})

items.addEventListener('click', e => {
    btnAccion(e)
})

const fetchData = async() => {
try {
    const res = await fetch('api.json')
    const data = await res.json()
   // console.log(data)
    pintarCards(data)
} catch(error) {
    console.log(error)
}
}

const pintarCards = data =>{
    //console.log(data)
    data.forEach(servicios => {
        templateCard.querySelector('h5').textContent = servicios.title
        templateCard.querySelector('p').textContent = servicios.precio
        templateCard.querySelector('img').setAttribute("src",servicios.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id = servicios.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
        
    })
    cards.appendChild(fragment)
}

const addCarrito = e => {
    //console.log(e.target)
    //console.log(e.target.classList.contains('btn-dark'))
    if (e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto =>{
// console.log(objeto)
 const servicios={
    id: objeto.querySelector('.btn-dark').dataset.id,
    title: objeto.querySelector('h5').textContent,
    precio: objeto.querySelector('p').textContent,
    cantidad: 1
 }
  //para Aumentar cantidad
  if(carrito.hasOwnProperty(servicios.id)){
    servicios.cantidad = carrito[servicios.id].cantidad + 1
  }
 //copia del servicio
  carrito[servicios.id] = {...servicios}
  actualizar()
}

const actualizar = () =>
{
   // console.log(carrito)
    items.innerHTML ='0'
    Object.values(carrito).forEach(servicios =>{
        templateCarrito.querySelector('th').textContent = servicios.id
        templateCarrito.querySelectorAll('td')[0].textContent = servicios.title
        templateCarrito.querySelectorAll('td')[1].textContent = servicios.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = servicios.id
        templateCarrito.querySelector('.btn-danger').dataset.id = servicios.id
        templateCarrito.querySelector('span').textContent = servicios.cantidad * servicios.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}


const pintarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length == 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Seleccione su Servicios a su Gusto</th>
        `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad }) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0)
    
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () =>{
        carrito = {} 
        actualizar()
    })
 
}

const btnAccion  = e => {
    //boton aumentar
    if(e.target.classList.contains('btn-info')) {
        
        const servicios = carrito[e.target.dataset.id]
        servicios.cantidad++
        carrito[e.target.dataset.id] = { ...servicios}
        actualizar()
    }

    if(e.target.classList.contains('btn-danger')){
        const servicios = carrito[e.target.dataset.id]
        servicios.cantidad--
        if (servicios.cantidad == 0){
            delete carrito[e.target.dataset.id]
        }
        actualizar()
    }
    e.stopPropagation()

    //boton disminuir
}
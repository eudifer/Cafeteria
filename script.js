// Café Ejemplo: menú por categorías, horario con día actual y validación del formulario.

// Datos del menú (ficticios)
const MENU = {
  'Café': [
    { nombre: 'Espresso', detalle: 'Corto e intenso', precio: 1800 },
    { nombre: 'Latte', detalle: 'Espresso con leche vaporizada', precio: 2600 },
    { nombre: 'Cappuccino', detalle: 'Con espuma de leche', precio: 2500 },
  ],
  'Té e infusiones': [
    { nombre: 'Té chai', detalle: 'Con especias y leche', precio: 2400 },
    { nombre: 'Té verde', detalle: 'Hojas enteras', precio: 1900 },
    { nombre: 'Infusión de menta', detalle: 'Hierbas frescas', precio: 1900 },
  ],
  'Para comer': [
    { nombre: 'Tostada con palta', detalle: 'Pan de masa madre', precio: 4200 },
    { nombre: 'Croissant', detalle: 'Mantequilla, horneado hoy', precio: 2300 },
    { nombre: 'Queque de limón', detalle: 'Porción individual', precio: 2700 },
  ],
};

// Horario por día. getDay() devuelve 0 para domingo.
const HORARIO = [
  { dia: 'Domingo', abre: 10, cierra: 15 },
  { dia: 'Lunes', abre: 8, cierra: 19 },
  { dia: 'Martes', abre: 8, cierra: 19 },
  { dia: 'Miércoles', abre: 8, cierra: 19 },
  { dia: 'Jueves', abre: 8, cierra: 19 },
  { dia: 'Viernes', abre: 8, cierra: 19 },
  { dia: 'Sábado', abre: 9, cierra: 18 },
];

const formatoPrecio = (n) => '$' + n.toLocaleString('es-CL');
const hora = (h) => String(h).padStart(2, '0') + ':00';

// ----- Menú -----
const contenedorTabs = document.getElementById('tabs');
const lista = document.getElementById('platos');

function mostrarCategoria(categoria) {
  lista.innerHTML = '';
  MENU[categoria].forEach((p) => {
    const li = document.createElement('li');
    li.className = 'plato';
    li.innerHTML =
      '<div class="plato-fila"><span></span><span class="plato-precio"></span></div><p></p>';
    li.querySelector('span').textContent = p.nombre;
    li.querySelector('.plato-precio').textContent = formatoPrecio(p.precio);
    li.querySelector('p').textContent = p.detalle;
    lista.appendChild(li);
  });
  contenedorTabs.querySelectorAll('button').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.textContent === categoria));
  });
}

Object.keys(MENU).forEach((categoria) => {
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.textContent = categoria;
  boton.addEventListener('click', () => mostrarCategoria(categoria));
  contenedorTabs.appendChild(boton);
});
mostrarCategoria(Object.keys(MENU)[0]);

// ----- Horario -----
const ahora = new Date();
const hoy = HORARIO[ahora.getDay()];

const cuerpo = document.getElementById('tabla-horario');
// Muestra de lunes a domingo
[1, 2, 3, 4, 5, 6, 0].forEach((i) => {
  const d = HORARIO[i];
  const fila = document.createElement('tr');
  if (i === ahora.getDay()) fila.className = 'hoy-fila';
  fila.innerHTML = '<td></td><td></td>';
  fila.children[0].textContent = d.dia;
  fila.children[1].textContent = hora(d.abre) + ' – ' + hora(d.cierra);
  cuerpo.appendChild(fila);
});

document.getElementById('hoy-dia').textContent = hoy.dia;
document.getElementById('hoy-horas').textContent = hora(hoy.abre) + ' – ' + hora(hoy.cierra);

const horaDecimal = ahora.getHours() + ahora.getMinutes() / 60;
const abierto = horaDecimal >= hoy.abre && horaDecimal < hoy.cierra;
const estado = document.getElementById('estado');
estado.textContent = abierto ? 'Abierto ahora' : 'Cerrado ahora';
estado.classList.toggle('cerrado', !abierto);

// ----- Formulario -----
const formulario = document.getElementById('formulario');
const ok = document.getElementById('ok');

function marcarError(campo, mensaje) {
  const error = document.getElementById('error-' + campo.id);
  error.textContent = mensaje;
  campo.setAttribute('aria-invalid', mensaje ? 'true' : 'false');
  return !mensaje;
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  ok.textContent = '';

  const nombre = formulario.nombre;
  const correo = formulario.correo;
  const mensaje = formulario.mensaje;

  const valido = [
    marcarError(nombre, nombre.value.trim().length < 2 ? 'Escribe tu nombre.' : ''),
    marcarError(correo, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim()) ? '' : 'Escribe un correo válido, por ejemplo nombre@correo.com.'),
    marcarError(mensaje, mensaje.value.trim().length < 10 ? 'Escribe un mensaje de al menos 10 letras.' : ''),
  ].every(Boolean);

  if (valido) {
    // Esta demo no envía nada: solo muestra que los datos son correctos.
    ok.textContent = 'Los datos están completos. Esta demo no envía el mensaje.';
    formulario.reset();
  }
});

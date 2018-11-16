const text = require('./text.txt')
const typer = new Typer.Typer({interval: 0.2})
const typeContainer = document.querySelector('.type-container')
typer.type(typeContainer, text)
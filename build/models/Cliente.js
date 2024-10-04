"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    constructor(nombre, direccion, telefono) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.mascotas = [];
    }
    agregarMascota(mascota) {
        this.mascotas.push(mascota);
    }
}
exports.Cliente = Cliente;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mascota = void 0;
class Mascota {
    constructor(nombre, tipo, edad) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.edad = edad;
        this.historial = [];
    }
}
exports.Mascota = Mascota;

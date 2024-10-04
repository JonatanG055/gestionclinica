import { Mascota } from "./Mascota";

export class Cliente {
    public mascotas: Mascota[] = [];
    
    constructor(
        public nombre: string,
        public direccion: string,
        public telefono: string
    ) {}
    
    agregarMascota(mascota: Mascota) {
        this.mascotas.push(mascota);
    }
}

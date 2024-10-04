export class Mascota {
    public historial: { fecha: string; motivo: string; tratamiento: string }[] = [];

    constructor(
        public nombre: string,
        public tipo: string,
        public edad: number
    ) {}
}

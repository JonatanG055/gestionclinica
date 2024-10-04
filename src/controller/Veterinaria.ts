import { Console } from 'console';
import * as readline from 'readline';
import { Mascota } from '../models/Mascota';
import { Cliente } from '../models/Cliente';

export class Veterinaria {
    public interface: readline.Interface;
    private registrarClientes: Cliente[] = [];

    constructor() {
        this.interface = readline.createInterface({
            output: process.stdout,
            input: process.stdin
        });
    }

    private agregarMascotaCliente(nombreCliente: string) {
        const existeCliente = this.registrarClientes.find(cl => cl.nombre === nombreCliente);
        if (!existeCliente) {
            console.log("Este cliente no está registrado");
            return;
        }

        this.interface.question('Digite el nombre de la mascota: ', (mascota) => {
            this.interface.question('Digite el tipo de animal: ', (tipo) => {
                this.interface.question('Digite la edad: ', (edad) => {
                    const nuevaMascota = new Mascota(
                        mascota,
                        tipo,
                        parseInt(edad)
                    );
                    existeCliente.agregarMascota(nuevaMascota);
                    console.log(`La mascota fue registrada para el cliente ${nombreCliente}`);
                    this.menu();
                });
            });
        });
    }

    private registrarCliente() {
        this.interface.question('Digite el nombre del cliente: ', (nombre) => {
            this.interface.question('Digite la dirección: ', (direccion) => {
                this.interface.question('Digite el teléfono: ', (telefono) => {
                    const existeCliente = this.registrarClientes.find(cl => cl.nombre === nombre);
                    if (existeCliente) {
                        console.log('El cliente con ese nombre ya existe');
                        this.menu();
                        return;
                    } else {
                        const nuevoCliente = new Cliente(nombre, direccion, telefono);
                        this.registrarClientes.push(nuevoCliente);
                        console.log('El cliente se agregó con éxito');
                        this.menu();
                    }
                });
            });
        });
    }

    private registrarVisita(mascotaNombre: string) {
        const clienteConMascota = this.registrarClientes.find(cliente => 
            cliente.mascotas.some(mascota => mascota.nombre === mascotaNombre)
        );

        if (!clienteConMascota) {
            console.log('No se encontró una mascota con ese nombre.');
            this.menu();
            return;
        }

        this.interface.question('Digite la fecha de la visita: ', (fecha) => {
            this.interface.question('Digite el motivo de la consulta: ', (motivo) => {
                this.interface.question('Digite el tratamiento aplicado: ', (tratamiento) => {
                    const mascota = clienteConMascota.mascotas.find(m => m.nombre === mascotaNombre);
                    if (mascota) {
                        mascota['historial'] = mascota['historial'] || []; // Inicializar historial si no existe
                        mascota['historial'].push({
                            fecha,
                            motivo,
                            tratamiento
                        });
                        console.log(`Visita registrada para la mascota ${mascotaNombre}`);
                    }
                    this.menu();
                });
            });
        });
    }

    private listarTodo() {
        if (this.registrarClientes.length === 0) {
            console.log('No hay nada registrado');
            return;
        }
        console.log('Esta es la lista de los clientes:');

        this.registrarClientes.forEach(cliente => {
            console.log(`Cliente: ${cliente.nombre}\nTeléfono: ${cliente.telefono}\nDirección: ${cliente.direccion}`);
            if (cliente.mascotas.length === 0) {
                console.log(`  - Sin mascotas registradas`);
            } else {
                cliente.mascotas.forEach(mascota => {
                    console.log(`  - Nombre: ${mascota.nombre}, Tipo: ${mascota.tipo}, Edad: ${mascota.edad} años`);
                    // Listar historial de visitas
                    if (mascota['historial'] && mascota['historial'].length > 0) {
                        console.log(`    Historial de visitas:`);
                        mascota['historial'].forEach(visita => {
                            console.log(`      - Fecha: ${visita.fecha}, Motivo: ${visita.motivo}, Tratamiento: ${visita.tratamiento}`);
                        });
                    } else {
                        console.log(`    - Sin historial de visitas`);
                    }
                });
            }
        });
    }

    public menu() {
        console.log('*** Bienvenido a la veterinaria ***');
        console.log('1. Registrar cliente');
        console.log('2. Agregar mascota al cliente');
        console.log('3. Registrar visitas');
        console.log('4. Listar todo');
        console.log('5. Salir del programa'); // Opción para salir
    
        this.interface.question('Dame una opción: ', (opcion) => {
            switch (opcion) {
                case "1":
                    this.registrarCliente();
                    break;
                case "2":
                    this.interface.question('Digite el nombre del cliente: ', (nombreCliente) => {
                        this.agregarMascotaCliente(nombreCliente);
                    });
                    break;
                case "3":
                    this.interface.question('Digite el nombre de la mascota: ', (mascotaNombre) => {
                        this.registrarVisita(mascotaNombre);
                    });
                    break;
                case "4":
                    this.listarTodo();
                    this.menu();
                    break;
                case "5": // Salir del programa
                    console.log('Gracias por utilizar el sistema de veterinaria. ¡Adiós!');
                    this.interface.close(); // Cierra la interfaz readline
                    break;
                default:
                    console.log('Opción no válida, intente de nuevo.');
                    this.menu();
                    break;
            }
        });
    }    
}

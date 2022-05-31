export class NuevoUsuario {
    nombre: string;
    nombreUsuario: string;
    email: string;
    password: string;
    dni: string;
    fechaNacimiento: Date;
    constructor(nombre: string, nombreUsuario: string, email: string, password: string, dni: string, fechaNacimiento: Date) {
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
        this.dni=dni;
        this.fechaNacimiento=fechaNacimiento;
    }
}

export interface ActorDTO{ //ActorDTO es para lectura
    id: number;
    nombre: string;
    fechaDeNacimiento: Date;
    foto?: string;
}

export interface ActorCreacionDTO{
    nombre: string;
    fechaNacimiento: Date;
    foto?: File;
}

export interface actorAutoCompleteDTO{
    id: number;
    nombre: string;
    personaje: string;
    foto: string;
}
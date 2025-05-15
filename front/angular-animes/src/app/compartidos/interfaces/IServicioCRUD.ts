import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaginacionDTO } from "../modelos/PaginacionDTO";

export interface IServicioCRUD<TDTO, TCreacionTDTO> {
    obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<TDTO[]>>;
    obtenerPorId(id: number): Observable<TDTO>;
    actualizar(id: number, entidad: TCreacionTDTO): Observable<any>;
    crear(entidad: TCreacionTDTO): Observable<any>;
    borrar(id: number): Observable<any>;
}
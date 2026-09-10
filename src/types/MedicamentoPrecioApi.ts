export type NombreFarmacia =
    | "Farmatodo"
    | "Farmadón"
    | "Farmapaz"
    | "Farmatina";

export type Moneda = "Bs" | "REF";

export interface MedicamentoBase {
    id: string;
    patologia: string;
    principioActivo: string;
    dosis: string[];
    alias?: string[];
    presentacionReferencia: number;
}

export interface MedicamentoPrecioApi {
    id: number;
    medicamento_base_id: string;
    farmacia: NombreFarmacia;
    nombre_producto_farmacia: string;
    principio_activo: string;
    dosis: string | string[];
    laboratorio: string;
    es_combo: boolean;
    presentacion: string;
    cantidad_unidades: number;
    forma_farmaceutica: string;
    precio_original: number;
    moneda: Moneda;
    precio_bs: number;
    precio_unitario: number;
    precio_normalizado: number;
    disponibilidad: boolean;
    url_producto: string;
    score_similitud: number;
    tasa_bcv_usd: number | null;
    fecha_actualizacion: string;
    tiene_componentes_mixtos: boolean;
}

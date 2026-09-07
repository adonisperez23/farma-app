export interface Product {
    id: number
    title: string
    subtitle: string
    pharmacyName: string
    pharmacyId: string
    price: number
    stock: boolean
    isBestPrice: boolean
    condition: string
}

export const products: Product[] = [
    {
        id: 1,
        title: "Losartán Potásico 50mg",
        subtitle: "Genfar • 30 Tabletas",
        pharmacyName: "Farmadón",
        pharmacyId: "farmadon",
        price: 2.5,
        stock: true,
        isBestPrice: true,
        condition: "hipertension",
    },
    {
        id: 2,
        title: "Losartán Potásico 50mg",
        subtitle: "Nefrotal • 30 Tabletas",
        pharmacyName: "Farmatodo",
        pharmacyId: "farmatodo",
        price: 3.1,
        stock: true,
        isBestPrice: false,
        condition: "hipertension",
    },
    {
        id: 3,
        title: "Losartán Potásico 50mg",
        subtitle: "Simetican • 30 Tabletas",
        pharmacyName: "FarmaAhorro",
        pharmacyId: "farmaahorro",
        price: 3.45,
        stock: true,
        isBestPrice: false,
        condition: "hipertension",
    },
]

export const initialCartItems = [
    {
        id: 1,
        title: "Losartán Potásico 50mg",
        pharmacy: "Farmadón",
        price: 2.5,
    },
]

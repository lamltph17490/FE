export interface ProductSize {
    _id?:string;
    sizeName: string;
    amount: number
}

export interface ProductColor {
    _id?:string
    colorName: string
    sizes: Array<ProductSize>
}

export interface Tprd {
    _id?: string,
    name?: string,
    image: string
    price?: string | number
    desc?: string
    status:string
    slug: string
    categoryId: {
        name: string
    }
    sliderId: string
    colors: Array<ProductColor>
}
export interface userErr {
    error: "string"
}

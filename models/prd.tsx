export interface ProductSize {
    sizeName: string;
    amount: number
}

export interface ProductColor {
    colorName: string
    sizes: Array<ProductSize>
}

export interface Tprd {
    _id?: string,
    name?: string,
    image: string
    price?: string | number
    desc?: string
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

export interface Tblog {
    createdAt: Date
    _id?: string,
    title: string,
    slug: string,
    thumbnail: string,
    desc: string,
    content: string,
    categoryId: {
        name: string
    },
}
export interface userErr {
    error: "string"
}
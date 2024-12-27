export interface Billboard{
    id:string;
    label:string;
    imageUrl:string
}
export interface Category{
    id:string
    name:string
    billboard:Billboard
}
export interface Product{
    id:string;
    category:Category
    name:string;
    isFeatured:boolean
    size:Size
    price:string
    color:Color
    images:Images[]
}
export interface Size{
    id:string
    name:string
    value: string

}
export interface Color{
    id:string
    name:string
    value: string

}
export interface Images{
    id: string
    url: string
}
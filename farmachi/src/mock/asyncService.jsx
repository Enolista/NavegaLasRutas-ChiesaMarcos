const products = [
    {
        id:'01',
        name:'Ibupirac 400mg',
        price:13840.78,
        description:'Ibuprofeno 400mg 20 Cápsulas Blandas',
        stock:15,
        category:'nuevos',
        img:'https://www.ibupirac.com.ar/img/banneribupirac-400.webp'
    },
    {
        id:'02',
        name:'Geniol Forte',
        price:4771.91,
        description:'Paracetamol 650 mg 16 Comprimidos',
        stock:18,
        category:'ofertas',
        img:'https://paf.ag/geniol/moderado.webp'
    },
    {
        id:'03',
        name:'BLOKIUM 50',
        price:15559.80,
        description:'Diclofenac sódico 75 mg 15 Comprimidos',
        stock:105,
        category:'mas vendidos',
        img:'https://cdn.casasco.com.ar/wp-content/uploads/2015/09/blokium-75_2-500x292-1.jpg'
    },
    {
        id:'04',
        name:'ELGYDOL 10',
        price:10474.90,
        description:'Ketorolac 10 mg 10 comprimidos recubiertos ',
        stock:88,
        category:'nuevos',
        img:'https://sidus.com.ar/uploads/Productos/2024/PACKAGING-Elgydol-10mg-x-10.png'
    }

]

//Promesa
//devuelve todos los productos
export const getProducts = () => {
    return new Promise((resolve, reject)=>{
        let error= false
        setTimeout(()=>{
            if(error){
                reject('No hay data ')
            }else{
                resolve(products)
            }
        },1000)
    })
}

//devuelva 1 solo producto

export const getOneProduct = (id)=>{
    return new Promise((resolve)=>{
        let productFound= products.find((prod)=> prod.id === id)
        setTimeout(()=>{
            // resolve(products[0])
            resolve(productFound)
        },1000)
    })
}

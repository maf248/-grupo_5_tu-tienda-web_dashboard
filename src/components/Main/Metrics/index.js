import React from 'react';
import Card from './Card';

const Metrics = ({title, totalProducts, totalUsers, products, users, categories}) => {

    const arrayFinal = users.map(user => {
        const propiedades = Object.keys(user) 
        const valores = Object.values(user)
        const arrayPropiedades = []
        const arrayValores = [];
        let arrayPropiedadesYValores = [];

        for(let i = 0; i < propiedades.length ; i++) {
            arrayPropiedades.push(propiedades[i])
        }
        for(let i = 0; i < valores.length ; i++) {
            arrayValores.push(valores[i])
        }

        arrayPropiedadesYValores = [
            arrayPropiedades[0] + ': ' + arrayValores[0],
            arrayPropiedades[1] + ': ' + arrayValores[1],
            arrayPropiedades[2] + ': ' + arrayValores[2],
            arrayPropiedades[3] + ': ' + arrayValores[3],
            arrayPropiedades[4] + ': ' + arrayValores[4],
            arrayPropiedades[5] + ': ' + arrayValores[5],
            arrayPropiedades[6] + ': ' + arrayValores[6],
            arrayPropiedades[7] + ': ' + arrayValores[7],
            arrayPropiedades[8] + ': ' + arrayValores[8],
            arrayPropiedades[9] + ': ' + arrayValores[9],
            arrayPropiedades[10] + ': ' + arrayValores[10],
        ]
        
       return arrayPropiedadesYValores
       
    })

    const arrayConIgualdadesProducto = arrayFinal.map(
        unArray => {
            let productoMasRepetidoArray = []

            
            for (let i = 0; i < unArray.length ; i++) {

                let propiedadDelArray = `${unArray[i]}`
                if (propiedadDelArray === unArray[5]) {

                    productoMasRepetidoArray = `${unArray[i]}`
                    
                }
                
            }

            return productoMasRepetidoArray

        }
    )

    let productoMasContratado = 0
    
    let repetidos = {};

    arrayConIgualdadesProducto.forEach( valor => {
      repetidos[valor] = (repetidos[valor] || 0) + 1;
    });


    let  repetidosArrayValues = Object.values(repetidos);
    let  repetidosArrayProps = Object.keys(repetidos);

        
    productoMasContratado = Math.max(...repetidosArrayValues);


    for (let i = 0; i < repetidosArrayValues.length ; i++) {

        if (repetidosArrayValues[i] === productoMasContratado) {
            productoMasContratado  = repetidosArrayProps[i]
        }
    }

    productoMasContratado = Number(productoMasContratado[productoMasContratado.length-1])

    products.map( product => {
        if (product.id === productoMasContratado) {

            productoMasContratado = product.name
            return productoMasContratado
                
        }
        return null;
    })

    const arrayConIgualdadesCategoria = arrayFinal.map(
        unArray => {
            let categoriaMasRepetidaArray = []

            
            for (let i = 0; i < unArray.length ; i++) {

                let propiedadDelArray = `${unArray[i]}`
                if (propiedadDelArray === unArray[6]) {

                    categoriaMasRepetidaArray = `${unArray[i]}`
                    
                }
                
            }
            
            return categoriaMasRepetidaArray

        }
    )

    let categoriaMasContratada = 0
    let categoriasRepetidas = {};

    arrayConIgualdadesCategoria.forEach(valor => {
        categoriasRepetidas[valor] = (categoriasRepetidas[valor] || 0) + 1;
    });

    let  categoriasRepetidasArrayValues = Object.values(categoriasRepetidas);
    let  categoriasRepetidasArrayProps = Object.keys(categoriasRepetidas);
    


    categoriaMasContratada = Math.max(...categoriasRepetidasArrayValues);


    for (let i = 0; i < categoriasRepetidasArrayValues.length ; i++) {

        if (categoriasRepetidasArrayValues[i] === categoriaMasContratada) {
            categoriaMasContratada  = categoriasRepetidasArrayProps[i]
        }
    }

    categoriaMasContratada = Number(categoriaMasContratada[categoriaMasContratada.length-1]) 







    



    




    return (
        <>

console.log(categories)
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
				<h1 className="h3 mb-0 text-gray-800">{title}</h1>
			</div>

			<div className="row">

				<Card 
                    border="primary"
                    text="primary"
                    icon="fas fa-clipboard-list"
                    title="Cantidad de productos"
                    value={totalProducts}
                />
                <Card 
                    border="success"
                    text="success"
                    icon="fas fa-dollar-sign"
                    title="Producto más contratado"
                    value={productoMasContratado}
                />
                <Card 
                    border="success"
                    text="success"
                    icon="fas fa-dollar-sign"
                    title="Categoría más contratada"
                    value=""
                />
                <Card 
                    border="warning"
                    text="warning"
                    icon="fas fa-user-check"
                    title="Cantidad de usuarios"
                    value={totalUsers}
                />
			</div>
        </>
    );
}

export default Metrics;

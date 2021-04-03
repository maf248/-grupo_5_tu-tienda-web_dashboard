import React from 'react';
import Card from './Card';

const Metrics = ({title, totalProducts, totalUsers, products, users, categories}) => {
    
    /*---CALCULO DE PRODUCTO Y CATEGORIA MAS CONTRATADOS----*/
    /*-Se obtienen los ID de productos y categorías de cada usuario en arrays-*/
    let userProducts = [];
    let userCategories = [];
    
    users.map(user => {
        
        if (user.product_id != null) {
            userProducts.push(user.product_id)
        }
        if (user.category_id != null) {
            userCategories.push(user.category_id)
        }
        return null;
    })
    /*-Se obtienen los valores más repetidos de dichos arrays-*/
    function masPopular(arr){
        return arr.sort((a,b) =>
              arr.filter(v => v===a).length
            - arr.filter(v => v===b).length
        ).pop();
    }

    let productoMasContratado = masPopular(userProducts);
    let categoriaMasContratada = masPopular(userCategories);

    /*-Se obtienen los nombres de producto y categoría más contratados a travez de sus id-*/
    products.map(product => {
        if (product.id === productoMasContratado) {
            productoMasContratado = product.name
            return productoMasContratado
        }
        if (product.Categories[0].id === categoriaMasContratada) {
            categoriaMasContratada = product.Categories[0].name;
        } else if (product.Categories[1].id === categoriaMasContratada) {
            categoriaMasContratada = product.Categories[1].name;
        } else if (product.Categories[2].id === categoriaMasContratada) {
            categoriaMasContratada = product.Categories[2].name;
        }
        return null;
    })

    return (
        <>

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
                    value={categoriaMasContratada}
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
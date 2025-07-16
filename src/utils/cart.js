export const getCart = async () => {

    try{

        let cart = localStorage.getItem("cart")

        if(cart === null){

            const emptyCart = [];
            localStorage.setItem("cart", JSON.stringify(emptyCart));
            return emptyCart;

        }


        

        const parsedcart = JSON.parse(cart)

        return Array.isArray(parsedcart) ? parsedcart : [];

    }catch (error) { 
    
        console.error("Error retrieving cart:", error);
        return [];
    }


}

export const addToCart = async (product , qty) => {

    try {

        let cart = await getCart()
        const productIndex = cart.findIndex((p) => p.productId === product.productId);


        if (productIndex == -1){

            cart.push({

                productId: product.productId,
                name: product.name,
                altNames: product.altNames,
                price: product.price,
                labeledPrice: product.labeledPrice,
                image: product.images[0],
                quantity: qty,
                



            })

        

        }else {

            cart[productIndex].quantity += qty

            if(cart[productIndex].quantity <= 0){
                cart = cart.filter((p) => p.productId !== product.productId);


            }

        }



        localStorage.setItem("cart", JSON.stringify(cart))
        return cart;


    } catch (error) { 
        console.error("Error adding to cart:", error);
        return;
    }


}

export const removeFromCart = async (productId) => {

    try {

        let cart = await getCart()
        const productIndex = cart.findIndex((product) => product.productId === productId)

        if (productIndex !== -1) {

            cart.splice(productIndex, 1)
            localStorage.setItem("cart", JSON.stringify(cart))
            return cart;

        } else {

            console.warn("Product not found in cart:", productId)
            return cart;

        }

    } catch (error) {

        console.error("Error removing from cart:", error);
        return;

    }

}

export const getTotal = async ()=> {

    const cart = await getCart();

    let total = 0;

    cart.forEach((product)=>{
        total += product.price * product.quantity
    })

    return total.toFixed(2);

}

export const getTotalForLabeledPrice = async () =>{

    const cart = await getCart();

    let total = 0;

    cart.forEach((product)=>{
        total += product.labeledPrice * product.quantity
    })

    return total.toFixed(2);
}
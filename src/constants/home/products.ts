import type { Product } from "../../types/products";

export const products: Product[] = [
    {
        name: "Anti Hair Loss Alopecia",
        category: "Shampoo",
        price: 265.85,
        image: "images/products/product.png",
        discount: 15
    },
    {
        name: "Anti Hair Loss Alopecia",
        category: "Shampoo",
        price: 55.99,
        image: "images/products/product.png",
        size: ["8 Oz", "15 Oz", "20 Oz"]
    },
    {
        name: "Anti Hair Loss Alopecia",
        category: "Shampoo",
        price: 55.99,
        image: "images/products/product.png",
        size: ["8 Oz", "15 Oz"]
    },
    {
        name: "Anti Hair Loss Alopecia",
        category: "Shampoo",
        price: 265.85,
        image: "images/products/product.png",
        discount: 15
    },
    {
        name: "Anti Hair Loss Alopecia",
        category: "Shampoo",
        price: 55.99,
        image: "images/products/product.png",
        size: ["8 Oz", "15 Oz", "20 Oz"]
    },
    {
        name: "Anti Hair Loss Alopecia",
        category: "Shampoo",
        price: 55.99,
        image: "images/products/product.png",
        size: ["8 Oz", "15 Oz"]
    }
]

export const slides: { imageLeft: string, product: Product }[] = [
    {
        imageLeft: "/images/home/sliderLeft1.png",
        product: {
            image: "/images/home/sliderRight1.png",
            name: "Anti Hair Loss Alopecia",
            price: 55.99,
        }
    },
    {
        imageLeft: "/images/home/sliderLeft2.png",
        product: {
            image: "/images/home/sliderRight2.png",
            name: "Power Hair Spray",
            price: 99.50,
        }
    },
    {
        imageLeft: "/images/home/sliderLeft2.png",
        product: {
            image: "/images/home/sliderRight2.png",
            name: "Power Hair Spray",
            price: 99.50,
        }
    }
]

export const aboutIngredients: { image: string, name: string }[] = [
    {
        image: "/images/about/organic-aloe-vera.png",
        name: "Organic Aloe Vera"
    },
    {
        image: "/images/about/blueberry-extract.png",
        name: "Blueberry Extract"
    },
    {
        image: "/images/about/rosemary-extract.png",
        name: "Rosemary Extract"
    },
]
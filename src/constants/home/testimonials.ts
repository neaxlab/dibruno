import type { Testimonial } from "../../types/testimonials";

export const testimonials: Testimonial[] = [
    {
        images: ["/images/testimonials/testimonials-1-before.png", "/images/testimonials/testimonials-1-after.png"],
        product: {
            image: "/images/products/product-testimonials.png",
            name: "Perfect Combo",
            price: 258.28,
            discount: 10
        }
    },
    {
        images: ["/images/testimonials/testimonials-2-before.png", "/images/testimonials/testimonials-2-after.png"],
        product: {
            image: "/images/products/product-testimonials.png",
            name: "Perfect Combo",
            price: 258.28,
            discount: 10
        }
    },
    {
        images: ["/images/testimonials/testimonials-3-before.png", "/images/testimonials/testimonials-3-after.png"],
        product: {
            image: "/images/products/product-testimonials.png",
            name: "Perfect Combo",
            price: 258.28,
            discount: 10
        }
    },
    {
        images: ["/images/testimonials/testimonials-4-before.png", "/images/testimonials/testimonials-4-after.png"],
        product: {
            image: "/images/products/product-testimonials.png",
            name: "Perfect Combo",
            price: 258.28,
            discount: 10
        }
    },
    
]

export const socialMediaAbout: { image: string, icon: string, url: string, alt: string }[] = [
    {
        image: "/images/about/social-media-1.png",
        icon: "/images/about/social-media-icon-2.png",
        url: "https://www.instagram.com/dibrunolab/?hl=en",
        alt: "Instagram"
    },
    {
        image: "/images/about/social-media-2.png",
        icon: "/images/about/social-media-icon-1.png",
        url: "https://www.facebook.com/dibrunolab/?locale=es_LA",
        alt: "Facebook"
    },
    {
        image: "/images/about/social-media-3.png",
        icon: "/images/about/social-media-icon-2.png",
        url: "https://www.instagram.com/dibrunolab/?hl=en",
        alt: "Instagram"
    }
]
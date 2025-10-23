

export default function TestimonialsCard({ testimonial }: { testimonial: { url: string, alt: string, class: string }[] }) {
    return (
        <div className="w-full h-[85vh] flex flex-col">
            {testimonial.map((testimonial, index) => (
                <img 
                    key={index}
                    src={testimonial.url} 
                    alt={testimonial.alt} 
                    className="w-full h-1/2 object-cover" 
                />
            ))}
        </div>
    )
}
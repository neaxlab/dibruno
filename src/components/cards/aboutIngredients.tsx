export const AboutIngredients = ({ image, name }: { image: string, name: string }) => {
    return (
        <article className="flex flex-col gap-10 p-4 w-[212px] justify-between text-d-primary bg-[#FFFFFF] rounded-3xl">
            <img src={image} alt={name} className="h-[150px] aspect-square object-cover" />
            <p className="text-center">{name}</p>
        </article>
    )
}
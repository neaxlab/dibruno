import './Bullet.css'
export const Bullet = () => {
    return (
        <div className="relative size-[50px] flex items-center justify-center opacity-66 rounded-full">
            <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-[#94B1B7] opacity-60 animate-width-pulse-27"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[27px] bg-[#94B1B7DB] rounded-full flex items-center justify-center z-10">
                <div className="size-[10px] bg-primary-lotion rounded-full"></div>
            </div>

        </div>
    )
}
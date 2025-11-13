import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';




export default function CommentsCarousel({ comments }: { comments: { name: string, comment: string, title: string, date: string, rating: number }[] }) {
    const getStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return { fullStars, hasHalfStar, emptyStars };
    };
    return (
        <div className="w-full h-full mb-16 sm:hidden block">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar]}
                direction='horizontal'
                loop={false}
                slidesPerView={1.3}
                spaceBetween={10}

            >
                {comments.map((comment, index) => {
                    const { fullStars, hasHalfStar, emptyStars } = getStars(comment.rating);
                    const gradientId = `half-star-${index}`;
                    return (<SwiperSlide key={index}> 
                        <article className="flex flex-col py-8 px-4 bg-[#FFFFFF] justify-between gap-8 h-full min-h-[410px]">
                            <span>
                                <div className="flex flex-row items-center gap-4 mb-3">
                                    <div className="flex gap-1">
                                        {/* Estrellas completas */}
                                        {Array.from({ length: fullStars }).map(() => (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#1EC469" />
                                            </svg>
                                        ))}

                                        {/* Media estrella */}
                                        {hasHalfStar && (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <defs>
                                                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="50%" stop-color="#1EC469" />
                                                        <stop offset="50%" stop-color="#D8D8D8" />
                                                    </linearGradient>
                                                </defs>
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill={`url(#${gradientId})`} />
                                            </svg>
                                        )}

                                        {/* Estrellas vacías */}
                                        {Array.from({ length: emptyStars }).map(() => (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#D8D8D8" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-sm leading-[120%] tracking-[-0.26px] text-[#565656]">{comment.date}</p>
                                </div>
                                <p className="text-xl font-normal leading-[120%] tracking-[-0.4px] text-[#000000] mb-2">{comment.title}</p>
                                <p className="text-sm leading-[150%] tracking-[-0.56px] text-[#1D1D1D]">{comment.comment}</p>
                            </span>
                            <h3 className="text-sm font-medium leading-[100%] tracking-[0.28px] text-[#000000]">{comment.name}</h3>
                        </article>
                    </SwiperSlide>)
                })}
            </Swiper>
        </div>
    )
}
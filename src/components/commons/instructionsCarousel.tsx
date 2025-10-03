import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import {instructions} from '../../constants/home/instructions';
const instructionsData = Object.values(instructions);



export default function TestimonialsCarousel() {
    return (
        <section className="sm:hidden w-full h-full font-sans px-section-m-gap-x pb-section-m-gap-y">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar]}
                direction='horizontal'
                loop={false}
                slidesPerView={1}
                spaceBetween={12}
                className='w-full h-full overflow-visible relative'
            >
                {instructionsData.map((instruction, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-max-[493px] w-full">
                            <img src={instruction.image} alt={instruction.alt} className="w-full h-full object-cover" />
                            <a href={instruction.url} className="absolute bottom-[65px] left-4 text-d-button text-[#FEFEFE] text-center border-[1.5px] border-[#FEFEFE] rounded-full pl-5 py-4" style={{width: 'calc(100% - 32px)'}}>
                                LEARN MORE
                            </a>
                        </div>
                        <div className="flex flex-col gap-2 p-7 bg-primary-bright">
                            <h1 className="text-d-title-2">HOW TO USE?</h1>
                            <div className="flex flex-col gap-4" id="instructions-content">
                                {instruction.instructions.map((instruction, instructionIndex) => (
                                <div key={instructionIndex} className="flex flex-row gap-2 items-center">
                                    <div className="flex flex-col gap-1">
                                        <h1 className="text-2xl font-medium">{`${instructionIndex + 1}. ${instruction.title}`}</h1>
                                            <p className="text-d-products text-primary-granite font-normal">{instruction.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
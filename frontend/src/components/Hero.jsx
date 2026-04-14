import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import ebus from "../assets/ebus.png";
import women from "../assets/women.png";
import student from "../assets/student.png";
import nathjal from "../assets/nathjal.png";

function Hero() {

  const slides = [
    {
      title: "MSRTC E-Bus Service",
      desc: "Eco-friendly electric buses for sustainable travel.",
      img: ebus
    },
    {
      title: "Women Reservation Scheme",
      desc: "Special travel reservation benefits for women passengers.",
      img: women
    },
    {
      title: "Student Bus Pass",
      desc: "Affordable monthly passes for students.",
      img: student
    },
    {
      title: "Nathjal Drinking Water",
      desc: "Safe and affordable bottled water by MSRTC.",
      img: nathjal
    }
  ];

  return (
    <section className="w-full">

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop={true}
      >

        {slides.map((slide, index) => (

          <SwiperSlide key={index}>

            <div className="relative w-full h-[600px]">

              {/* BACKGROUND IMAGE */}

              <img
                src={slide.img}
                className="absolute w-full h-full object-cover"
                alt="msrtc scheme"
              />

              {/* DARK OVERLAY */}

              <div className="absolute inset-0 bg-black/40"></div>

              {/* TEXT CONTENT */}

              <div className="relative z-10 h-full flex items-center px-24">

                <div className="max-w-xl text-white">

                  <h1 className="text-6xl font-bold mb-6">
                    {slide.title}
                  </h1>

                  <p className="text-xl mb-6">
                    {slide.desc}
                  </p>

                  <button className="bg-red-600 px-8 py-3 rounded-full text-white font-semibold hover:bg-red-700 transition">
                    Learn More
                  </button>

                </div>

              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </section>
  );
}

export default Hero;
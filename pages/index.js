import React from 'react';
import dynamic from "next/dynamic";

const SlideCarousel = dynamic(() => import("components/common/slide-carousel"), { ssr: false });

export default function Example(props) {
  const ONOBOARDING_CAROUSEL_CONFIG = {
    "onboardingType": "done_auto",
    "autoScrollSpeed": 1500,
    "btn_skip_en": "SKIP",
    "btn_skip_ba": "Skip ba",
    "btn_next_en": "Next",
    "btn_next_ba": "Next ba",
    "btn_done_en": "Done",
    "btn_done_ba": "Done ba",
    "item": [
      {
        "title": "Jago UTBK!",
        "sub_title": "Taklukkan UTBK dengan persiapan maksimal yang udah meloloskan ratusan ribu alumni",
        "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png"
      },
      {
        "title": "Jago ngerjain PTS & PAS!",
        "sub_title": "Belajar materi langsung ngerti. Latihan soal dan tryout dibuat semirip mungkin sama ujian",
        "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-a443312f-41ee-4c4b-920b-2fc780d4fec7-file.png"
      },
      {
        "title": "90,000+ konten & fitur GRATIS",
        "sub_title": "Bisa belajar bareng video konsep & latihan. Tanya soal Matematika di Foto Soal dan langsung dapat jawaban",
        "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-c8d8dcd4-670a-405d-8183-5c8463429fc4-file.png"
      },
      {
        "title": "Belajar langsung ngerti dengan Fitur Premium",
        "sub_title": "Video animasi, Live Class bahas konsep, Live Class jawab soal, rangkuman dan flashcard",
        "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-c13f159e-1f0c-4832-94bf-a3c657872b68-file.png"
      },
      {
        "title": "Zenius untuk Semua",
        "sub_title": "Gak cuma buat murid SD, SMP & SMA. Guru dan Orang Tua juga bisa mendampingi anak belajar di Zenius",
        "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-856f8aad-0738-413a-9df9-1431c3e86953-file.png"
      }
    ]
  }

  return (
    <SlideCarousel
      CAROUSEL={ONOBOARDING_CAROUSEL_CONFIG}
    />
  )
}


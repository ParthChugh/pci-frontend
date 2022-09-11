// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    "content_assets": [
      {
        type: "carousel",
        data: {
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
              "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png",
              "href": "/bahan_kimia"
            },
            {
              "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-a443312f-41ee-4c4b-920b-2fc780d4fec7-file.png",
              "href": "/bahan_kimia"
            },
            {
              "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-c8d8dcd4-670a-405d-8183-5c8463429fc4-file.png",
              "href": "/bahan_kimia"
            },
            {
              "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-c13f159e-1f0c-4832-94bf-a3c657872b68-file.png",
              "href": "/bahan_kimia"
            },
            {
              "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-856f8aad-0738-413a-9df9-1431c3e86953-file.png",
              "href": "/bahan_kimia"
            }
          ]
        }
      },
      {
        type: "category",
        data: {
          heading: "Kategori Produk",
          readMoreHref: "/categories",
          item: [
            {
              "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png",
              "title": "Pasir & Agregat",
              "href": "/pasir_and_agregat"
            },
            {
              "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png",
              "title": "Fly Ash",
              "href": "/fly_ash"
            },
            {
              "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png",
              "title": "Semen",
              "href": "/semen"
            },
            {
              "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png",
              "title": "Bahan Kimia",
              "href": "/bahan_kimia"
            }
          ]
        }
      },
      {
        type: "product",
        data: {
          heading: "Rekomendasi Produk",
          readMoreHref: "/categories",
          item: [
            {
              "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png",
              "title": "Pasir Rangkas",
              "currency": "Rp.",
              "price": "42.000",
              "href": "/products/pasir-rangkas-001"
            },
            {
              "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png",
              "title": "Batu Belah",
              "currency": "Rp.",
              "price": "54.000",
              "href": "/products/pasir-rangkas-002"
            },
            {
              "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png",
              "title": "Batu Kapur",
              "currency": "Rp.",
              "price": "66.000",
              "href": "/products/pasir-rangkas-003"
            },
            {
              "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png",
              "title": "Batu Belah",
              "currency": "Rp.",
              "price": "78.000",
              "href": "/products/pasir-rangkas-004"
            }
          ]
        }
      },
      {
        type: "promotion",
        data: {
          heading: "Bergabung dan Jadi Supplier Dengan BRIK",
          subHeading: "Jual produk sesuai keinginan anda dan biarkan kami yang mengelola semuanya",
          buttonText: "Ajukan Sekarang"
        }
      }
    ]
  })
}

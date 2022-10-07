// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json(
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
            "url": "https://www.zenius.net/blog/wp-content/uploads/2022/03/Blog-Learning-Guide_Blog-Banner-1-1-1.png",
            "href": "/bahan_kimia"
          },
          {
            "url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-a443312f-41ee-4c4b-920b-2fc780d4fec7-file.png",
            "href": "/bahan_kimia"
          },
          {
            "url": "https://www.zenius.net/blog/wp-content/uploads/2022/03/Blog-Learning-Guide_Blog-Banner-1-1-1.png",
            "href": "/bahan_kimia"
          },
          {
            "url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-c13f159e-1f0c-4832-94bf-a3c657872b68-file.png",
            "href": "/bahan_kimia"
          },
          {
            "url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-856f8aad-0738-413a-9df9-1431c3e86953-file.png",
            "href": "/bahan_kimia"
          }
        ],
        parentCategory: [
          {
            name: "Home",
            href: "/"
          },
          {
            name: "Pasir & Agregat",
            href: "/Pasir-and-Agregat"
          },
          {
            name: "Pasir Rangkas",
            href: "/pasir-rangkas"
          }
        ],
        details: {
          name: "Pasir Rangkas",
          price: "66.000",
          discount: "20",
          discountMessage: "*Termasuk ppn 10%. Biaya pengiriman dihitung saat melakukan checkout.",
          details: {
            variantsHeading: "Varian Produk",
            readMoreHref: "/variants",
            variants: [
              {
                name: "CNP 100 x 50 x 1,8",

              },
              {
                name: "CNP 100 x 50 x 2,0"
              },
            ],
            minimum: 2,
            buyNowButton: "Beli Sekarang",
            addToCart: "Masukkan Keranjang",
            descriptionHeading: "Deskripsi Produk",
            categoryName: "Kategori: Pasir & Agregat",
            description: "Pasir Rangkas adalah pasir yang berasal dari daerah di provinsi Banten yang bernama Rangkas bitung, pasir jenis ini memiliki mutu yang cukup baik terutama sebagai bahan campuran adukan pembentuk beton ataupun sebagai bahan campuran adukan biasa. Sebagai supplier kebutuhan konstruksi bangunan, kami menjual pasir jenis ini dengan harga yang bersaing dan harga yang dapat di nego. minimum pemesanan untuk pasir jenis ini adalah 1(satu) Truck atau lebih kurang 6,5 M3.",

          },
          products: {
            name: "Rekomendasi Produk",
            rows: [
              {
                "id": "81035a8b-64ab-4d44-b9b2-b7524f0e0364",
                "CreatedById": null,
                "UpdatedById": null,
                "ParentId": null,
                "level": null,
                "hasChildren": true,
                "name": "Batu",
                "description": "Semua hal berbau batu.",
                "metadata": null,
                "createdAt": "2022-08-12T05:12:51.558Z",
                "updatedAt": "2022-09-16T16:16:15.640Z",
                "price": "42.000",
                "currency": "Rp.",
                "ProductCategoryXFiles": [
                  {
                    "id": "b634d7a5-6b1a-4da9-8aaf-4eadb4b00f37",
                    "CreatedById": null,
                    "UpdatedById": null,
                    "ProductCategoryId": "81035a8b-64ab-4d44-b9b2-b7524f0e0364",
                    "FileId": "37d82675-aa96-4cd8-b4ae-2ff30bd80b54",
                    "type": "photo",
                    "metadata": null,
                    "createdAt": "2022-09-16T16:16:15.745Z",
                    "updatedAt": "2022-09-16T16:16:15.745Z",
                    "File": {
                      "id": "37d82675-aa96-4cd8-b4ae-2ff30bd80b54",
                      "CreatedById": null,
                      "UpdatedById": null,
                      "type": "jpeg",
                      "name": "Btu Split Mentah",
                      "url": "https://cdn.brik.id/ProductCategory/81035a8b-64ab-4d44-b9b2-b7524f0e0364/photo/Btu Split Mentah.jpg_1663344975643.jpeg",
                      "metadata": null,
                      "createdAt": "2022-09-16T16:16:15.741Z",
                      "updatedAt": "2022-09-16T16:16:15.741Z"
                    }
                  }
                ]
              },
              {
                "id": "274d353a-508f-425e-a762-0af088740157",
                "CreatedById": null,
                "UpdatedById": null,
                "ParentId": null,
                "level": null,
                "hasChildren": null,
                "name": "Besi Beton & Wiremesh",
                "description": "Besi Beton & Wiremesh",
                "metadata": null,
                "createdAt": "2022-08-12T05:12:51.923Z",
                "updatedAt": "2022-09-16T06:39:42.882Z",
                "price": "54.000",
                "currency": "Rp.",
                "ProductCategoryXFiles": [
                  {
                    "id": "bf60f402-c4c5-4e66-9030-792a3fdb1b9e",
                    "CreatedById": null,
                    "UpdatedById": null,
                    "ProductCategoryId": "274d353a-508f-425e-a762-0af088740157",
                    "FileId": "165e1adf-643d-4d0e-bccd-c23713c41825",
                    "type": "photo",
                    "metadata": null,
                    "createdAt": "2022-09-16T06:26:43.293Z",
                    "updatedAt": "2022-09-16T06:26:43.293Z",
                    "File": {
                      "id": "165e1adf-643d-4d0e-bccd-c23713c41825",
                      "CreatedById": null,
                      "UpdatedById": null,
                      "type": "jpeg",
                      "name": "Besi Beton Polos",
                      "url": "https://cdn.brik.id/ProductCategory/274d353a-508f-425e-a762-0af088740157/photo/Besi Beton Polos.jpg_1663309603146.jpeg",
                      "metadata": null,
                      "createdAt": "2022-09-16T06:26:43.288Z",
                      "updatedAt": "2022-09-16T06:26:43.288Z"
                    }
                  }
                ]
              }
            ]
          }
        }
      }
    },
  )
}

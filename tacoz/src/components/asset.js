db.products.insertMany([
  {
    name: "Lamb Taco",
    category: "tacos",
    price: 7.99,
    rating: 4.8,
    orders: 120,
    description: "Tender spiced lamb, fresh salsa, and a squeeze of lime, all wrapped in a soft tortilla.",
    image: "https://tb-static.uber.com/prod/image-proc/processed_images/b752cf4aaacbcf97fdcfcc8ebd0e996f/70aa2a4db7f990373ca9c376323e3dea.jpeg",
    deliveryPrice: 2.99,
    offer: "20% OFF",
    orderingOptions: [
      { type: "call", label: "Call to Order", action: "tel:+919876543210" },
      { type: "whatsapp", label: "WhatsApp Order", action: "https://wa.me/919876543210" },
      { type: "ubereats", label: "Uber Eats", action: "https://www.ubereats.com/gb/store/hello-tacos/P5WjPrDqWdyye8UKSxKsrQ?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25223f95a33e-b0ea-59dc-b27b-c50a4b12acad%2522%252C%2522sectionUuid%2522%253A%2522cdc855c1-f1b3-43f4-a931-3b45f09a0d04%2522%252C%2522subsectionUuid%2522%253A%252256a6759d-7f20-442c-bade-d48fdcfa7b10%2522%252C%2522itemUuid%2522%253A%2522e61535a8-5fb1-46bf-8d23-6214f289e1ff%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMjEwMyUyMFNpbW1vbnMlMjBEcml2ZSUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMjI3NWQzN2YwLWI2YWEtNDExOS0zM2Q4LTlmYTlkNzU0OTdhMyUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJ1YmVyX3BsYWNlcyUyMiUyQyUyMmxhdGl0dWRlJTIyJTNBNTIuNDUyOTQ4MiUyQyUyMmxvbmdpdHVkZSUyMiUzQS0xLjk5NjAwNjklN0Q%3D&ps=1" },
      { type: "justeat", label: "Just Eat", action: "https://www.justeat.com" },
      { type: "deliveroo", label: "Deliveroo", action: "https://deliveroo.com" }
    ],
    item_id: 1757172012908,
    id: 1757172198636
  },
  {
    name: "Beef Burrito Deluxe",
    category: "burrito",
    price: 14.99,
    rating: 4.7,
    orders: 95,
    description: "Juicy beef, beans, rice, and cheese wrapped in a warm tortilla",
    image: "https://example.com/images/beef-burrito.jpg",
    deliveryPrice: 2.99,
    offer: "15% OFF",
    orderingOptions: [
      { type: "call", label: "Call to Order", action: "tel:+919876543211" },
      { type: "whatsapp", label: "WhatsApp Order", action: "https://wa.me/919876543211" },
      { type: "ubereats", label: "Uber Eats", action: "https://www.ubereats.com" },
      { type: "justeat", label: "Just Eat", action: "https://www.justeat.com" },
      { type: "deliveroo", label: "Deliveroo", action: "https://deliveroo.com" }
    ],
    item_id: 1757172012910,
    id: 1757172198638
  }
]);

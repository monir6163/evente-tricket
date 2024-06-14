export const events = [
  {
    _id: 1,
    title: "Concert in the Park",
    description:
      "Join us for a night of live music at the city park with performances by local bands.",
    price: 25.0,
    country: "USA",
    location: "Central Park, New York City, NY",
    dates: ["2024-07-20", "2024-07-21"],
    image:
      "https://eventic.mtrsolution.com/uploads/events/5f9e7fcb22268143316849.jpg",
    category: "Music",
    audience: "All ages",
    year: 2024,
  },
  {
    _id: 2,
    title: "Tech Conference 2024",
    description:
      "A three-day event featuring keynotes from tech industry leaders, workshops, and networking opportunities.",
    price: 499.99,
    country: "USA",
    location: "Moscone Center, San Francisco, CA",
    dates: ["2024-09-15", "2024-09-17"],
    image:
      "https://eventic.mtrsolution.com/uploads/events/5f9e7fcb22268143316849.jpg",
    category: "Technology",
    audience: "Adults",
    year: 2024,
  },
  {
    _id: 3,
    title: "Art Exhibition: Modern Masters",
    description:
      "Explore the works of contemporary artists in this exclusive exhibition.",
    price: 15.0,
    country: "France",
    location: "Louvre Museum, Paris",
    dates: ["2024-08-01", "2024-08-31"],
    image:
      "https://eventic.mtrsolution.com/uploads/events/5f9e7fcb22268143316849.jpg",
    category: "Art",
    audience: "All ages",
    year: 2024,
  },
  {
    _id: 4,
    title: "Food Festival 2024",
    description:
      "Experience a variety of cuisines from around the world at our annual food festival.",
    price: 10.0,
    country: "Canada",
    location: "Downtown Vancouver, BC",
    dates: ["2024-06-20", "2024-06-22"],
    image:
      "https://eventic.mtrsolution.com/uploads/events/5f9e7fcb22268143316849.jpg",
    category: "Food & Drink",
    audience: "All ages",
    year: 2024,
  },
  {
    _id: 5,
    title: "Marathon for Charity",
    description:
      "Run for a cause in our annual charity marathon. All proceeds go to local shelters.",
    price: 50.0,
    country: "UK",
    location: "Hyde Park, London",
    dates: ["2024-10-05"],
    image:
      "https://eventic.mtrsolution.com/uploads/events/5f9e7fcb22268143316849.jpg",
    category: "Sports",
    audience: "All ages",
    year: 2024,
  },
];

export const sliderEvents = [
  {
    id: 1,
    title: "Concert in the Park",
    description:
      "Join us for a night of live music at the city park with performances by local bands.",
    location: "Central Park, New York City, NY",
    dates: {
      start: "2024-08-01",
      end: "2024-08-31",
      time: "9:00 AM - 5:00 PM",
    },
    btnText: "Learn More",
    btnLink: "/events/concert-in-the-park",
    image:
      "https://eventic.mtrsolution.com/uploads/events/65cb2dfc546f6974272954.jpg",
  },
  {
    id: 2,
    title: "Tech Conference 2024",
    description:
      "A three-day event featuring keynotes from tech industry leaders, workshops, and networking opportunities.",
    location: "Moscone Center, San Francisco, CA",
    dates: {
      start: "2024-08-01",
      end: "2024-08-31",
      time: "9:00 AM - 5:00 PM",
    },
    btnText: "Learn More",
    btnLink: "/events/tech-conference-2024",
    image:
      "https://eventic.mtrsolution.com/uploads/events/5f9e7fcb22268143316849.jpg",
  },
  {
    id: 3,
    title: "Art Exhibition: Modern Masters",
    description:
      "Explore the works of contemporary artists in this exclusive exhibition.",
    location: "Louvre Museum, Paris",
    dates: {
      start: "2024-08-01",
      end: "2024-08-31",
      time: "9:00 AM - 5:00 PM",
    },
    btnText: "Learn More",
    btnLink: "/events/art-exhibition-modern-masters",
    image:
      "https://eventic.mtrsolution.com/uploads/events/5f9db4dc0d9c5696554595.jpg",
  },
];

export const categories = [
  {
    id: 1,
    name: "Music",
    image:
      "https://eventic.mtrsolution.com/uploads/events/5f9db4dc0d9c5696554595.jpg",
  },
  {
    id: 2,
    name: "Technology",
    image:
      "https://eventic.mtrsolution.com/uploads/events/5f9e7fcb22268143316849.jpg",
  },
  {
    id: 3,
    name: "Art",
    image:
      "https://eventic.mtrsolution.com/uploads/events/5f9e7fcb22268143316849.jpg",
  },
  {
    id: 4,
    name: "Food & Drink",
    image:
      "https://eventic.mtrsolution.com/uploads/events/5f9e7fcb22268143316849.jpg",
  },
  {
    id: 5,
    name: "Sports",
    image:
      "https://eventic.mtrsolution.com/uploads/events/5f9e7fcb22268143316849.jpg",
  },
];

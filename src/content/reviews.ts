export interface Review {
  id: number;
  reviewerName: string;
  rating: number;
  reviewText: string;
  date: string;
  sourceUrl: string;
  verified: boolean;
  avatar?: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    reviewerName: "Gandhi",
    rating: 5,
    reviewText:
      "Great experience working with Mainext. Delivery was clear and updates were always on time.",
    date: "2026-01-07",
    sourceUrl: "https://maps.google.com/",
    verified: true
  },
  {
    id: 2,
    reviewerName: "Ragul S",
    rating: 5,
    reviewText:
      "Professional support from planning to deployment. The team understood our business needs quickly.",
    date: "2026-02-02",
    sourceUrl: "https://maps.google.com/",
    verified: true
  },
  {
    id: 3,
    reviewerName: "Priya M",
    rating: 5,
    reviewText:
      "Helpful communication and practical solutions. We saw immediate improvements in operations.",
    date: "2026-02-28",
    sourceUrl: "https://maps.google.com/",
    verified: true
  }
];

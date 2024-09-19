import { NextApiRequest, NextApiResponse } from 'next';

const testimonials = [
  { id: '1', content: 'MEL Laundry has made my life so much easier. Clean clothes, no hassle!', author: 'Dralagar George.' },
  { id: '2', content: 'The 24/7 availability is a game-changer. I can do laundry on my schedule.', author: 'Sarah M.' },
  { id: '3', content: 'Affordable and efficient. MEL Laundry is my go-to for all my laundry needs.', author: 'Michael K.' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(testimonials);
}
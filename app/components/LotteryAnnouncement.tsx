"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { urlFor } from '../lib/sanity';
import styles from '../styless/Home.module.css';

interface Winner {
  name: string;
  prize: string;
  image: any;
}

interface Promotion {
  title: string;
  description: string;
  videoUrl: string;
  winners: Winner[];
  active: boolean;
  startDate: string;
  endDate: string;
}

export default function LotteryAnnouncement() {
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivePromotion() {
      try {
        const response = await fetch('/api/promotions');
        const data = await response.json();
        setPromotion(data);
      } catch (error) {
        console.error('Error fetching promotion:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchActivePromotion();
  }, []);

  if (loading) return null;
  if (!promotion?.active) return null;

  return (
    <section className={styles.announcementSection}>
      <div className={styles.announcementCard}>
        <h2 className={styles.announcementTitle}>{promotion.title}</h2>
        <p>{promotion.description}</p>

        {promotion.videoUrl && (
          <div className={styles.videoWrapper}>
            <iframe
              src={promotion.videoUrl}
              title="Promotion Video"
              className={styles.announcementVideo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {promotion.winners?.length > 0 && (
          <div className={styles.winnersSection}>
            <h3>Congratulations to Our Winners!</h3>
            <div className={styles.winnerRow}>
              {promotion.winners.map((winner, index) => (
                <div key={index} className={styles.winner}>
                  <Image
                    src={urlFor(winner.image).url()}
                    alt={winner.name}
                    width={100}
                    height={100}
                    className={styles.winnerImage}
                  />
                  <h4>{winner.name}</h4>
                  <p>{winner.prize}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 
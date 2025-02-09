"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styless/Home.module.css';

interface Winner {
  phoneNumber: string;
  prize: number;
}

interface LotteryData {
  drawingDate: string;
  winners: Winner[];
  videoUrl: string;
}

export default function LotteryAnnouncement() {
  const [lotteryData, setLotteryData] = useState<LotteryData | null>(null);

  useEffect(() => {
    async function fetchLotteryData() {
      try {
        const response = await fetch('/api/lottery');
        const data = await response.json();
        setLotteryData(data);
      } catch (error) {
        console.error('Failed to fetch lottery data:', error);
      }
    }

    fetchLotteryData();
  }, []);

  if (!lotteryData) return null;

  return (
    <motion.section
      className={styles.announcementSection}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { scale: 1.02, transition: { duration: 0.3 } }
      }}
    >
      <div className={styles.announcementCard}>
        <h2 className={styles.announcementTitle}>MEL Laundry Lottery Winners!</h2>
        <p className={styles.announcementDate}>
          Drawing held on {new Date(lotteryData.drawingDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>

        {lotteryData.videoUrl && (
          <div className={styles.videoWrapper}>
            <video 
              controls 
              className={styles.announcementVideo}
              playsInline
              preload="metadata"
            >
              <source src={lotteryData.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <div className={styles.winnersSection}>
          <h3>Congratulations to Our Winners!</h3>
          <div className={styles.winnersList}>
            {lotteryData.winners.map((winner, index) => (
              <motion.div 
                key={index}
                className={styles.winnerItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className={styles.winnerNumber}>
                  {winner.phoneNumber.replace(/(\d{2})(\d{3})(\d{3})(\d{2})/, '**-***-$3-$4')}
                </span>
                <span className={styles.winnerPrize}>KSh {winner.prize}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
} 
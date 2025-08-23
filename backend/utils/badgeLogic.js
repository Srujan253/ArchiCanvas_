// File: utils/badgeLogic.js

const badgeTiers = [
    { name: 'Novice Artist', threshold: 3, color: 'yellow-400' },
    { name: 'Rising Star', threshold: 5, color: 'blue-400' },
    { name: 'Master Creator', threshold: 10, color: 'purple-400' },
    { name: 'Legendary', threshold: 20, color: 'red-400' },
];

exports.calculateBadges = (productCount) => {
    const earnedBadges = [];
    for (const tier of badgeTiers) {
        if (productCount >= tier.threshold) {
            earnedBadges.push({
                name: tier.name,
                earnedAt: `${tier.threshold} Artworks`,
                color: tier.color
            });
        }
    }
    return earnedBadges;
};
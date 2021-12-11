export default function decideQuality = (byte) => {
  // rough numbers used
  if (byte < 700_000) return 80;
  if (byte > 700_000) return 70;
  if (byte > 1_000_000) return 65; // 1mb
  if (byte > 1_500_000) return 60;
  if (byte > 2_000_000) return 55;
  if (byte > 3_000_000) return 50;
  if (byte > 4_000_000) return 45;
  if (byte > 5_000_000) return 40;

  return 30;
};

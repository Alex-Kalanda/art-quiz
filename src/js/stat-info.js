import helpers from './helpers.js';

const STAT_CONFIG = {
  PAINTERS: 24,
  PAINTINGS: 24,
};

export const stat = {
  painters: helpers.getGameInitStat(STAT_CONFIG.PAINTERS),
  paintings: helpers.getGameInitStat(STAT_CONFIG.PAINTINGS),
};

export const settings = {
  music: {
    status: true,
    volume: 0.1,
  },
  sound: {
    status: true,
    volume: 0.4,
  },
  timer: {
    status: false,
    time: 20,
  },
};

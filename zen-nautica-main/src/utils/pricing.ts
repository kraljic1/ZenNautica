interface SeasonalPrice {
  start: string;
  end: string;
  prices: {
    [key: string]: number;
  };
  minimumDays?: {
    [key: string]: number;
  };
}

const seasonalPrices: SeasonalPrice[] = [
  {
    start: '01-01',
    end: '03-31',
    prices: {
      'Calipso 21': 120,
      'Eolo 650 Day': 220,
      'Brava 22': 120,
      'Salpa 20': 140,
      'Eolo 730 Day': 250,
      'Merry Fisher 795': 350
    },
    minimumDays: {
      'Merry Fisher 795': 4
    }
  },
  {
    start: '04-01',
    end: '05-31',
    prices: {
      'Calipso 21': 150,
      'Eolo 650 Day': 250,
      'Brava 22': 150,
      'Salpa 20': 170,
      'Eolo 730 Day': 300,
      'Merry Fisher 795': 420
    },
    minimumDays: {
      'Merry Fisher 795': 4
    }
  },
  {
    start: '06-01',
    end: '06-30',
    prices: {
      'Calipso 21': 180,
      'Eolo 650 Day': 300,
      'Brava 22': 180,
      'Salpa 20': 200,
      'Eolo 730 Day': 350,
      'Merry Fisher 795': 460
    },
    minimumDays: {
      'Merry Fisher 795': 4
    }
  },
  {
    start: '07-01',
    end: '08-31',
    prices: {
      'Calipso 21': 250,
      'Eolo 650 Day': 350,
      'Brava 22': 250,
      'Salpa 20': 270,
      'Eolo 730 Day': 400,
      'Merry Fisher 795': 500
    },
    minimumDays: {
      'Merry Fisher 795': 4
    }
  },
  {
    start: '09-01',
    end: '09-30',
    prices: {
      'Calipso 21': 180,
      'Eolo 650 Day': 300,
      'Brava 22': 180,
      'Salpa 20': 200,
      'Eolo 730 Day': 300,
      'Merry Fisher 795': 450
    },
    minimumDays: {
      'Merry Fisher 795': 4
    }
  },
  {
    start: '10-01',
    end: '12-31',
    prices: {
      'Calipso 21': 120,
      'Eolo 650 Day': 220,
      'Brava 22': 120,
      'Salpa 20': 140,
      'Eolo 730 Day': 250,
      'Merry Fisher 795': 350
    },
    minimumDays: {
      'Merry Fisher 795': 4
    }
  }
];

export const getDiscountPercentage = (days: number): number => {
  if (days > 10) return 20;
  if (days > 5) return 15;
  if (days > 3) return 5;
  return 0;
};

const isDateInRange = (date: Date, startMonth: number, startDay: number, endMonth: number, endDay: number): boolean => {
  const month = date.getMonth() + 1; // JavaScript months are 0-based
  const day = date.getDate();

  // Convert dates to comparable numbers (MMDD format)
  const dateNum = month * 100 + day;
  const startNum = startMonth * 100 + startDay;
  const endNum = endMonth * 100 + endDay;

  return dateNum >= startNum && dateNum <= endNum;
};

export const getMinimumDays = (date: Date, boatName: string): number => {
  const season = seasonalPrices.find(season => {
    const [startMonth, startDay] = season.start.split('-').map(Number);
    const [endMonth, endDay] = season.end.split('-').map(Number);
    return isDateInRange(date, startMonth, startDay, endMonth, endDay);
  });

  return season?.minimumDays?.[boatName] || 1;
};

export const calculateDailyPrice = (date: Date, boatName: string): number => {
  if (!date || !boatName) return 0;

  const season = seasonalPrices.find(season => {
    const [startMonth, startDay] = season.start.split('-').map(Number);
    const [endMonth, endDay] = season.end.split('-').map(Number);
    return isDateInRange(date, startMonth, startDay, endMonth, endDay);
  });

  if (!season || !season.prices[boatName]) return 0;
  return season.prices[boatName];
};

export const calculateTotalPrice = (startDate: Date | null, endDate: Date | null, boatName: string): number => {
  if (!startDate || !endDate || !boatName) return 0;

  let total = 0;
  const currentDate = new Date(startDate);
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Check minimum days requirement
  const minimumDays = getMinimumDays(startDate, boatName);
  if (days < minimumDays) {
    return 0; // Return 0 if minimum days requirement is not met
  }

  while (currentDate <= endDate) {
    total += calculateDailyPrice(currentDate, boatName);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const discountPercentage = getDiscountPercentage(days);
  if (discountPercentage > 0) {
    total = total * (1 - discountPercentage / 100);
  }

  return Math.round(total);
};

export const calculateDailyPriceWithDiscount = (date: Date, totalDays: number, boatName: string): { 
  original: number;
  discounted: number;
  discountPercentage: number;
} => {
  const originalPrice = calculateDailyPrice(date, boatName);
  const discountPercentage = getDiscountPercentage(totalDays);
  const discountedPrice = Math.round(originalPrice * (1 - discountPercentage / 100));
  
  return {
    original: originalPrice,
    discounted: discountedPrice,
    discountPercentage
  };
};
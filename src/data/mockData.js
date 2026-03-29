// ─── Team Colors ───
export const TEAM_COLORS = {
  'Red Bull Racing': { primary: '#3671C6', secondary: '#FFD700' },
  'Ferrari': { primary: '#E8002D', secondary: '#FFEB3B' },
  'Mercedes': { primary: '#27F4D2', secondary: '#000000' },
  'McLaren': { primary: '#FF8000', secondary: '#47C7FC' },
  'Aston Martin': { primary: '#229971', secondary: '#CEDC00' },
  'Alpine': { primary: '#FF87BC', secondary: '#0093CC' },
  'Williams': { primary: '#64C4FF', secondary: '#012564' },
  'AlphaTauri': { primary: '#6692FF', secondary: '#FFFFFF' },
  'Alfa Romeo': { primary: '#C92D4B', secondary: '#2B2B2B' },
  'Haas': { primary: '#B6BABD', secondary: '#E10600' },
};

// ─── Drivers ───
export const DRIVERS = [
  { id: 1, firstName: 'Max', lastName: 'Verstappen', team: 'Red Bull Racing', number: 1, country: 'NED', points: 575, position: 1, wins: 19, podiums: 28, poles: 12, fastestLaps: 10, image: null },
  { id: 2, firstName: 'Lando', lastName: 'Norris', team: 'McLaren', number: 4, country: 'GBR', points: 510, position: 2, wins: 8, podiums: 22, poles: 8, fastestLaps: 6, image: null },
  { id: 3, firstName: 'Charles', lastName: 'Leclerc', team: 'Ferrari', number: 16, country: 'MON', points: 472, position: 3, wins: 6, podiums: 20, poles: 10, fastestLaps: 5, image: null },
  { id: 4, firstName: 'Carlos', lastName: 'Sainz', team: 'Ferrari', number: 55, country: 'ESP', points: 428, position: 4, wins: 4, podiums: 18, poles: 5, fastestLaps: 3, image: null },
  { id: 5, firstName: 'Oscar', lastName: 'Piastri', team: 'McLaren', number: 81, country: 'AUS', points: 398, position: 5, wins: 3, podiums: 14, poles: 3, fastestLaps: 4, image: null },
  { id: 6, firstName: 'Lewis', lastName: 'Hamilton', team: 'Ferrari', number: 44, country: 'GBR', points: 356, position: 6, wins: 2, podiums: 12, poles: 4, fastestLaps: 3, image: null },
  { id: 7, firstName: 'George', lastName: 'Russell', team: 'Mercedes', number: 63, country: 'GBR', points: 340, position: 7, wins: 2, podiums: 10, poles: 6, fastestLaps: 2, image: null },
  { id: 8, firstName: 'Sergio', lastName: 'Perez', team: 'Red Bull Racing', number: 11, country: 'MEX', points: 285, position: 8, wins: 1, podiums: 8, poles: 2, fastestLaps: 1, image: null },
  { id: 9, firstName: 'Fernando', lastName: 'Alonso', team: 'Aston Martin', number: 14, country: 'ESP', points: 240, position: 9, wins: 0, podiums: 6, poles: 1, fastestLaps: 2, image: null },
  { id: 10, firstName: 'Pierre', lastName: 'Gasly', team: 'Alpine', number: 10, country: 'FRA', points: 180, position: 10, wins: 0, podiums: 4, poles: 0, fastestLaps: 1, image: null },
  { id: 11, firstName: 'Lance', lastName: 'Stroll', team: 'Aston Martin', number: 18, country: 'CAN', points: 120, position: 11, wins: 0, podiums: 2, poles: 0, fastestLaps: 0, image: null },
  { id: 12, firstName: 'Esteban', lastName: 'Ocon', team: 'Alpine', number: 31, country: 'FRA', points: 98, position: 12, wins: 0, podiums: 1, poles: 0, fastestLaps: 0, image: null },
  { id: 13, firstName: 'Alex', lastName: 'Albon', team: 'Williams', number: 23, country: 'THA', points: 75, position: 13, wins: 0, podiums: 0, poles: 0, fastestLaps: 1, image: null },
  { id: 14, firstName: 'Yuki', lastName: 'Tsunoda', team: 'AlphaTauri', number: 22, country: 'JPN', points: 62, position: 14, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, image: null },
  { id: 15, firstName: 'Valtteri', lastName: 'Bottas', team: 'Alfa Romeo', number: 77, country: 'FIN', points: 48, position: 15, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, image: null },
  { id: 16, firstName: 'Nico', lastName: 'Hulkenberg', team: 'Haas', number: 27, country: 'GER', points: 42, position: 16, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, image: null },
  { id: 17, firstName: 'Daniel', lastName: 'Ricciardo', team: 'AlphaTauri', number: 3, country: 'AUS', points: 35, position: 17, wins: 0, podiums: 0, poles: 0, fastestLaps: 1, image: null },
  { id: 18, firstName: 'Zhou', lastName: 'Guanyu', team: 'Alfa Romeo', number: 24, country: 'CHN', points: 20, position: 18, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, image: null },
  { id: 19, firstName: 'Kevin', lastName: 'Magnussen', team: 'Haas', number: 20, country: 'DEN', points: 14, position: 19, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, image: null },
  { id: 20, firstName: 'Logan', lastName: 'Sargeant', team: 'Williams', number: 2, country: 'USA', points: 4, position: 20, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, image: null },
];

// ─── Teams / Constructors ───
export const TEAMS = [
  { id: 1, name: 'Red Bull Racing', points: 860, position: 1, drivers: ['Max Verstappen', 'Sergio Perez'], base: 'Milton Keynes, UK', principal: 'Christian Horner', powerUnit: 'Honda RBPT' },
  { id: 2, name: 'McLaren', points: 908, position: 2, drivers: ['Lando Norris', 'Oscar Piastri'], base: 'Woking, UK', principal: 'Andrea Stella', powerUnit: 'Mercedes' },
  { id: 3, name: 'Ferrari', points: 900, position: 3, drivers: ['Charles Leclerc', 'Carlos Sainz'], base: 'Maranello, Italy', principal: 'Frederic Vasseur', powerUnit: 'Ferrari' },
  { id: 4, name: 'Mercedes', points: 696, position: 4, drivers: ['Lewis Hamilton', 'George Russell'], base: 'Brackley, UK', principal: 'Toto Wolff', powerUnit: 'Mercedes' },
  { id: 5, name: 'Aston Martin', points: 360, position: 5, drivers: ['Fernando Alonso', 'Lance Stroll'], base: 'Silverstone, UK', principal: 'Mike Krack', powerUnit: 'Mercedes' },
  { id: 6, name: 'Alpine', points: 278, position: 6, drivers: ['Pierre Gasly', 'Esteban Ocon'], base: 'Enstone, UK', principal: 'Bruno Famin', powerUnit: 'Renault' },
  { id: 7, name: 'AlphaTauri', points: 97, position: 7, drivers: ['Yuki Tsunoda', 'Daniel Ricciardo'], base: 'Faenza, Italy', principal: 'Laurent Mekies', powerUnit: 'Honda RBPT' },
  { id: 8, name: 'Williams', points: 79, position: 8, drivers: ['Alex Albon', 'Logan Sargeant'], base: 'Grove, UK', principal: 'James Vowles', powerUnit: 'Mercedes' },
  { id: 9, name: 'Alfa Romeo', points: 68, position: 9, drivers: ['Valtteri Bottas', 'Zhou Guanyu'], base: 'Hinwil, Switzerland', principal: 'Alessandro Alunni Bravi', powerUnit: 'Ferrari' },
  { id: 10, name: 'Haas', points: 56, position: 10, drivers: ['Nico Hulkenberg', 'Kevin Magnussen'], base: 'Kannapolis, USA', principal: 'Guenther Steiner', powerUnit: 'Ferrari' },
];

// ─── Race Weekend ───
export const CURRENT_RACE = {
  name: 'Monaco Grand Prix',
  circuit: 'Circuit de Monaco',
  location: 'Monte Carlo, Monaco',
  round: 8,
  totalRounds: 24,
  lap: 52,
  totalLaps: 78,
  flagStatus: 'GREEN',
  fastestLap: { driver: 'Max Verstappen', time: '1:12.432', lap: 47 },
  weather: 'Sunny',
  temperature: '28°C',
  trackTemp: '42°C',
};

// ─── Highlight Stats ───
export const HIGHLIGHTS = {
  fastestDriver: { name: 'Max Verstappen', team: 'Red Bull Racing', time: '1:12.432' },
  tireStrategy: { soft: 8, medium: 10, hard: 2 },
  pitStops: { total: 34, avgTime: '2.4s', fastestStop: { driver: 'Red Bull Racing', time: '1.9s' } },
  drsZones: 2,
};

// ─── Live Timing Data ───
export const LIVE_TIMING = [
  { pos: 1, driver: 'VER', fullName: 'Max Verstappen', team: 'Red Bull Racing', gap: 'LEADER', interval: '-', lastLap: '1:13.245', s1: 24.123, s2: 30.456, s3: 18.666, tire: 'M', tireAge: 18, drs: true },
  { pos: 2, driver: 'NOR', fullName: 'Lando Norris', team: 'McLaren', gap: '+2.341', interval: '+2.341', lastLap: '1:13.502', s1: 24.201, s2: 30.612, s3: 18.689, tire: 'M', tireAge: 18, drs: true },
  { pos: 3, driver: 'LEC', fullName: 'Charles Leclerc', team: 'Ferrari', gap: '+5.672', interval: '+3.331', lastLap: '1:13.789', s1: 24.312, s2: 30.701, s3: 18.776, tire: 'H', tireAge: 24, drs: false },
  { pos: 4, driver: 'SAI', fullName: 'Carlos Sainz', team: 'Ferrari', gap: '+8.103', interval: '+2.431', lastLap: '1:14.012', s1: 24.456, s2: 30.834, s3: 18.722, tire: 'H', tireAge: 24, drs: true },
  { pos: 5, driver: 'PIA', fullName: 'Oscar Piastri', team: 'McLaren', gap: '+12.456', interval: '+4.353', lastLap: '1:14.234', s1: 24.534, s2: 30.912, s3: 18.788, tire: 'M', tireAge: 12, drs: false },
  { pos: 6, driver: 'HAM', fullName: 'Lewis Hamilton', team: 'Ferrari', gap: '+15.789', interval: '+3.333', lastLap: '1:14.456', s1: 24.612, s2: 31.023, s3: 18.821, tire: 'H', tireAge: 30, drs: false },
  { pos: 7, driver: 'RUS', fullName: 'George Russell', team: 'Mercedes', gap: '+18.234', interval: '+2.445', lastLap: '1:14.678', s1: 24.701, s2: 31.112, s3: 18.865, tire: 'M', tireAge: 8, drs: true },
  { pos: 8, driver: 'PER', fullName: 'Sergio Perez', team: 'Red Bull Racing', gap: '+22.567', interval: '+4.333', lastLap: '1:14.890', s1: 24.823, s2: 31.234, s3: 18.833, tire: 'H', tireAge: 30, drs: false },
  { pos: 9, driver: 'ALO', fullName: 'Fernando Alonso', team: 'Aston Martin', gap: '+28.901', interval: '+6.334', lastLap: '1:15.123', s1: 24.912, s2: 31.345, s3: 18.866, tire: 'M', tireAge: 15, drs: false },
  { pos: 10, driver: 'GAS', fullName: 'Pierre Gasly', team: 'Alpine', gap: '+32.345', interval: '+3.444', lastLap: '1:15.345', s1: 25.012, s2: 31.456, s3: 18.877, tire: 'S', tireAge: 5, drs: true },
  { pos: 11, driver: 'STR', fullName: 'Lance Stroll', team: 'Aston Martin', gap: '+35.678', interval: '+3.333', lastLap: '1:15.567', s1: 25.112, s2: 31.567, s3: 18.888, tire: 'M', tireAge: 20, drs: false },
  { pos: 12, driver: 'OCO', fullName: 'Esteban Ocon', team: 'Alpine', gap: '+38.012', interval: '+2.334', lastLap: '1:15.789', s1: 25.201, s2: 31.678, s3: 18.910, tire: 'S', tireAge: 5, drs: false },
  { pos: 13, driver: 'ALB', fullName: 'Alex Albon', team: 'Williams', gap: '+42.345', interval: '+4.333', lastLap: '1:16.012', s1: 25.312, s2: 31.789, s3: 18.911, tire: 'M', tireAge: 22, drs: false },
  { pos: 14, driver: 'TSU', fullName: 'Yuki Tsunoda', team: 'AlphaTauri', gap: '+45.678', interval: '+3.333', lastLap: '1:16.234', s1: 25.412, s2: 31.890, s3: 18.932, tire: 'H', tireAge: 35, drs: false },
  { pos: 15, driver: 'BOT', fullName: 'Valtteri Bottas', team: 'Alfa Romeo', gap: '+48.012', interval: '+2.334', lastLap: '1:16.456', s1: 25.501, s2: 31.945, s3: 19.010, tire: 'M', tireAge: 25, drs: false },
  { pos: 16, driver: 'HUL', fullName: 'Nico Hulkenberg', team: 'Haas', gap: '+52.345', interval: '+4.333', lastLap: '1:16.678', s1: 25.612, s2: 32.056, s3: 19.010, tire: 'H', tireAge: 38, drs: false },
  { pos: 17, driver: 'RIC', fullName: 'Daniel Ricciardo', team: 'AlphaTauri', gap: '+55.678', interval: '+3.333', lastLap: '1:16.890', s1: 25.701, s2: 32.167, s3: 19.022, tire: 'M', tireAge: 28, drs: false },
  { pos: 18, driver: 'ZHO', fullName: 'Zhou Guanyu', team: 'Alfa Romeo', gap: '+58.012', interval: '+2.334', lastLap: '1:17.012', s1: 25.812, s2: 32.278, s3: 18.922, tire: 'H', tireAge: 40, drs: false },
  { pos: 19, driver: 'MAG', fullName: 'Kevin Magnussen', team: 'Haas', gap: '+62.345', interval: '+4.333', lastLap: '1:17.234', s1: 25.901, s2: 32.389, s3: 18.944, tire: 'S', tireAge: 3, drs: false },
  { pos: 20, driver: 'SAR', fullName: 'Logan Sargeant', team: 'Williams', gap: '+65.678', interval: '+3.333', lastLap: '1:17.456', s1: 26.012, s2: 32.500, s3: 18.944, tire: 'M', tireAge: 30, drs: false },
];

// ─── Lap Time Data for Charts ───
export const generateLapData = () => {
  const laps = [];
  for (let i = 1; i <= 52; i++) {
    const base = 73;
    laps.push({
      lap: i,
      VER: +(base + Math.random() * 2 + (i === 1 ? 5 : 0)).toFixed(3),
      NOR: +(base + 0.3 + Math.random() * 2 + (i === 1 ? 5.2 : 0)).toFixed(3),
      LEC: +(base + 0.6 + Math.random() * 2.2 + (i === 1 ? 5.5 : 0)).toFixed(3),
      SAI: +(base + 0.8 + Math.random() * 2.4 + (i === 1 ? 5.3 : 0)).toFixed(3),
      HAM: +(base + 1.2 + Math.random() * 2.5 + (i === 1 ? 6 : 0)).toFixed(3),
    });
  }
  return laps;
};

// ─── Tire Strategy ───
export const TIRE_STRATEGY = [
  { driver: 'VER', stints: [{ tire: 'S', startLap: 1, endLap: 18, color: '#FF3333' }, { tire: 'M', startLap: 19, endLap: 52, color: '#FFD700' }] },
  { driver: 'NOR', stints: [{ tire: 'S', startLap: 1, endLap: 16, color: '#FF3333' }, { tire: 'M', startLap: 17, endLap: 52, color: '#FFD700' }] },
  { driver: 'LEC', stints: [{ tire: 'M', startLap: 1, endLap: 20, color: '#FFD700' }, { tire: 'H', startLap: 21, endLap: 52, color: '#FFFFFF' }] },
  { driver: 'SAI', stints: [{ tire: 'M', startLap: 1, endLap: 22, color: '#FFD700' }, { tire: 'H', startLap: 23, endLap: 52, color: '#FFFFFF' }] },
  { driver: 'PIA', stints: [{ tire: 'S', startLap: 1, endLap: 14, color: '#FF3333' }, { tire: 'M', startLap: 15, endLap: 38, color: '#FFD700' }, { tire: 'S', startLap: 39, endLap: 52, color: '#FF3333' }] },
  { driver: 'HAM', stints: [{ tire: 'M', startLap: 1, endLap: 25, color: '#FFD700' }, { tire: 'H', startLap: 26, endLap: 52, color: '#FFFFFF' }] },
  { driver: 'RUS', stints: [{ tire: 'S', startLap: 1, endLap: 12, color: '#FF3333' }, { tire: 'M', startLap: 13, endLap: 35, color: '#FFD700' }, { tire: 'H', startLap: 36, endLap: 52, color: '#FFFFFF' }] },
  { driver: 'PER', stints: [{ tire: 'M', startLap: 1, endLap: 28, color: '#FFD700' }, { tire: 'H', startLap: 29, endLap: 52, color: '#FFFFFF' }] },
];

// ─── Pit Stop Data ───
export const PIT_STOPS = [
  { lap: 12, driver: 'RUS', team: 'Mercedes', duration: 2.1 },
  { lap: 14, driver: 'PIA', team: 'McLaren', duration: 2.3 },
  { lap: 16, driver: 'NOR', team: 'McLaren', duration: 2.0 },
  { lap: 18, driver: 'VER', team: 'Red Bull Racing', duration: 1.9 },
  { lap: 20, driver: 'LEC', team: 'Ferrari', duration: 2.5 },
  { lap: 22, driver: 'SAI', team: 'Ferrari', duration: 2.2 },
  { lap: 25, driver: 'HAM', team: 'Ferrari', duration: 2.4 },
  { lap: 28, driver: 'PER', team: 'Red Bull Racing', duration: 2.6 },
  { lap: 35, driver: 'RUS', team: 'Mercedes', duration: 2.2 },
  { lap: 38, driver: 'PIA', team: 'McLaren', duration: 2.1 },
];

// ─── Race History (per-driver mock) ───
export const RACE_HISTORY = [
  { race: 'Bahrain', position: 1 },
  { race: 'Saudi', position: 1 },
  { race: 'Australia', position: 2 },
  { race: 'Japan', position: 1 },
  { race: 'China', position: 3 },
  { race: 'Miami', position: 1 },
  { race: 'Imola', position: 2 },
  { race: 'Monaco', position: 1 },
];

// ─── Notification Events ───
export const RACE_EVENTS = [
  { id: 1, type: 'flag', message: 'GREEN FLAG — Race resumed', time: '14:32' },
  { id: 2, type: 'overtake', message: 'Norris overtakes Leclerc for P2!', time: '14:28' },
  { id: 3, type: 'pitstop', message: 'Verstappen pit stop — 1.9s — Fastest!', time: '14:25' },
  { id: 4, type: 'fastest', message: 'Fastest Lap: Verstappen 1:12.432', time: '14:22' },
  { id: 5, type: 'flag', message: 'YELLOW FLAG — Sector 2', time: '14:18' },
];

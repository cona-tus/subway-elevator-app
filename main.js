const endpoint =
  'https://gist.githubusercontent.com/cona-tus/e324dbc7aab0247766d6626cb2a27f98/raw/364424486498277e7a0861384c25551668aefe29/stations.json';

const stations = [];

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => stations.push(...data.DATA));

function findMatches(wordToMatch, stations) {
  const elevators = stations.filter(
    (station) =>
      (station.gubun === 'EV' || station.gubun === 'WL') &&
      station.location !== '' &&
      station.stup_lctn !== ''
  );
  return elevators.filter((elevator) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return elevator.station_nm.match(regex);
  });
}

function displayMatches() {
  matchArray = findMatches(this.value, stations);

  const listHtml = `
        <span class='faci-name'>승강기명</span>
        <span class='stat-name'>역명</span>
        <span class='stat-loca'>설치위치</span>
        <span class='stud-loca'>운행구간</span>
      `;

  const html = matchArray
    .map((station) => {
      const stationName = station.station_nm;
      const stationLocation = station.location;
      const facilityName = station.faci_nm.split(')')[1];
      const studLocation = station.stup_lctn;

      return `
      <li class="list">
        <span class="faci-name">${facilityName}</span>
        <span class="stat-name">${stationName}</span>
        <span class="stat-loca">${stationLocation}</span>
        <span class="stud-loca">${studLocation}</span>
        </li>
        `;
    })
    .join('');
  result.classList.add('active');
  header.innerHTML = listHtml;
  list.innerHTML = html;

  if (searchInput.value === '') {
    header.innerHTML = '';
    list.innerHTML = '';
    result.classList.remove('active');
  }
}

const searchInput = document.querySelector('.search');
const list = document.querySelector('.search-list');
const header = document.querySelector('.search-header');
const result = document.querySelector('.result-container');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

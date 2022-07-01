import Table from './table';

// const DEFAULT_OFFSET = 0;

const RES_URL = 'https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?limit=5&offset=0&ordering=id';

window.addEventListener('load', () => {
  new Table().getData(RES_URL);
});

// getPage(DEFAULT_OFFSET);


// function nextPage(){
//   console.log('123')
// }
// const next = document.querySelector('.next')
// next.addEventListener('onclick', nextPage)

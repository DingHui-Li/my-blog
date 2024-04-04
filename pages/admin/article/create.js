import $http from "@/utils/http.js";


export const movieName = ref("")
export const movieList = ref([])
export const searching = ref(false)

export function onMovieInput(query) {
  console.log(query)
  if (query) {
    movieName.value = query
  }
}
export function searchMovie(query) {
  if (searching.value) {
    return
  }
  if (movieName.value) {
    console.log(movieName.value)
    searching.value = true
    $http.get('/api/admin/searchmovie?name=' + movieName.value).then(res => {
      console.log(res)
      movieList.value = res.data
    }).finally(() => {
      searching.value = false
    })
  }
}

export class Form {
  cover = ""
  title = ""
  htmlContent = ""
  textContent = ""
  topics = []
  type = "moment"
  imgs = []
  movie = {}
  location = {}
}
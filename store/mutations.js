export default {
  SET_TOKEN (state, token) {
    state.token = token
  },
  changeHero (state, hero) {
    state.heroTitle = hero.heroTitle
    state.heroDescription = hero.heroDescription
    state.heroNavbarItems = hero.heroNavbarItems
  }
}

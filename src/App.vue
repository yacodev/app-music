<template>
  <div>
    <pm-header></pm-header>
    <pm-loader v-show="isLoading"></pm-loader>
    <section class="section">
      <nav class="nav has-shadow">
        <div class="container">
          <input
            type="text"
            class="input is-large"
            placeholder="buscar canciones"
            v-model="searchQuery"
            >
          <button href="" class="button is-info is-large" @click="search">Buscar</button>
          <button href="" class="button is-danger is-large">times</button>
        </div>
        <div class="container">
          <p>{{ searchMessage }}</p>
        </div>
      </nav>
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-one-quarter"
            v-for="track in tracks"
            :key="track.name">
            <pm-track :track="track"></pm-track>
          </div>
        </div>
      </div>
    </section>
    <pm-footer></pm-footer>
  </div>
</template>

<script>
import trackService from './services/track'
import PmFooter from './components/layout/Footer.vue'
import PmHeader from './components/layout/Header.vue'
import PmTrack from './components/Track.vue'
import PmLoader from './components/shared/Loader.vue'

export default {
  name: 'App',
  data () {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false
    }
  },
  components: { PmFooter, PmHeader, PmTrack, PmLoader },
  computed: {
    searchMessage () {
      return `Econtrados ${this.tracks.length}`
    }
  },
  methods: {
    search () {
      if (!this.searchQuery) return
      this.isLoading = true
      trackService.search(this.searchQuery)
        .then(res => {
          this.tracks = res.tracks.items
          this.isLoading = false
        })
    }
  }
}
</script>

<style>
@import "./scss/main.scss";

</style>

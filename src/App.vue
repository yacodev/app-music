<template>
  <div>
    <section class="section">
      <nav class="navbar has-shadow">
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
        <div class="columns">
          <div class="column"
            v-for="track in tracks"
            :key="track.name">
            {{ track.name}} - {{track.artists[0].name}}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import trackService from './services/track'

export default {
  name: 'App',
  data () {
    return {
      searchQuery: '',
      tracks: []
    }
  },
  computed: {
    searchMessage () {
      return `Econtrados ${this.tracks.length}`
    }
  },
  methods: {
    search () {
      if (!this.searchQuery) return
      trackService.search(this.searchQuery)
        .then(res => {
          this.tracks = res.tracks.items
        })
    }
  }
}
</script>

<style>
@import "./scss/main.scss";

</style>

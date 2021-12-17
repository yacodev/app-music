<template>
  <main>
    <pm-notification v-show="showNotification">
      <p slot="body"> No se encontraron resultados </p>
    </pm-notification>
    <pm-loader v-show="isLoading"></pm-loader>
    <section class="section" v-show="!isLoading">
      <nav class="nav">
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
            <pm-track
              :track="track"
              @select="setSeletedTrack"
              :class="{'is-active': track.id === selectedTrack}"
              ></pm-track>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import trackService from '../services/track'
import PmTrack from '../components/Track.vue'
import PmLoader from '../components/shared/Loader.vue'
import PmNotification from '../components/shared/Notification.vue'

export default {
  name: 'App',
  data () {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false,
      seletedTrack: '',
      showNotification: false
    }
  },
  components: { PmTrack, PmLoader, PmNotification },
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
          this.showNotification = res.tracks.total === 0
          this.tracks = res.tracks.items
          this.isLoading = false
        })
    },
    setSeletedTrack (id) {
      this.seletedTrack = id
    }
  },
  watch: {
    showNotification () {
      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false
        }, 3000)
      }
    }
  }
}
</script>

<style scoped>
.results {
  margin-top: 50px;
}
.nav{
  display: flex;
  flex-direction: column;
}
.is-active {
  border: 3px #23d160 solid;
}

</style>

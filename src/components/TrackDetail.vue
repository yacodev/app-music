<template>
<div class="container">
  <div class="columns">
    <div class="column is-3 has-text-centered">
      <figure class="media-left">
        <p class="image">
          <img :src="track.album.images[0].url" alt="">
        </p>
        <p>
          <button class="button is-primary is-large">
            <span class="icon" @click="selectTrack"></span>
          </button>
        </p>
      </figure>
    </div>
    <div class="column is-8">
      <div class="panel">
        <div class="panel-heading">
          <h1 class="title">{{ track.name }}</h1>
        </div>
        <div class="panel-block">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <ul v-for="(v, k) in track" :key="k">
                  <li>
                    <strong>{{ k }}:&nbsp;</strong>
                    <span>{{ v }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <nav class="level">
              <div class="level-left">
                <button class="level-item"></button>
              </div>
            </nav>
          </article>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import trackService from '../services/track'
import trackMixin from '../mixins/track'

export default {
  mixins: [trackMixin],
  data () {
    return {
      track: {}
    }
  },
  created () {
    const id = this.$route.params.id
    trackService.getById(id)
      .then((res) => {
        this.track = res
      })
  }
}
</script>
<style scoped>
  .columns{
    margin: 20px;
  }
</style>

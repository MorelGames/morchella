<template>
  <div class="cah-logo">
    <div>
      <p>
        Morels<br />
        Against<br />
        Humanity
      </p>
      <p class="is-tag-line">
        An online game<br />
        for horrible people.
      </p>
    </div>
    <div class="loading" v-show="loading">
      <Loader />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Loader from './Loader.vue'

export default {
  computed: mapState(['loading']),
  components: {
    Loader
  }
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/mixins"

.cah-logo
  padding: 3rem
  border-radius: 6px

  background-color: black
  color: white

  display: flex
  flex-direction: column
  align-items: center

  position: relative

  +unselectable

  p
    margin: 0

    font-size: 3.4rem
    font-family: "Helvetica Neue", Helvetica
    font-weight: bold

    line-height: 1.14em

    text-align: left

    &.is-tag-line
      font-size: 1.5rem
      margin-top: 1rem

  .loading
    position: absolute

    top: 1.5rem
    right: 1.5rem

    width: 32px
    height: 32px

    text-align: right
</style>

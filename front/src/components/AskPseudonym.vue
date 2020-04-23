<template>
  <section class="cah-ask-pseudonym">
    <b-field
      :label="$t('Please enter your name.')"
      :message="$t('<strong>Warning</strong>: this game is sometimes unsafe for work. Okay, <em>often</em>.')"
      custom-class="is-large is-pseudonym">
      <b-field>
        <b-input
          expanded
          size="is-medium"
          :placeholder="$t('Yes, your name, please.')"
          v-model.trim="pseudonym"
          @keyup.native.enter="start" />
        <p class="control">
          <button
            class="button is-dark is-medium"
            aria-label="Se connecter au salon de jeu"
            @click.once="start"
          >
            <b-icon icon="chevron-right"></b-icon>
          </button>
        </p>
      </b-field>
    </b-field>
  </section>
</template>

<script>
export default {
  data () {
    return {
      pseudonym: ''
    }
  },
  methods: {
    start () {
    }
  }
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/mixins"

label.is-pseudonym
  margin-bottom: 0 !important
  +unselectable
</style>

<template>
  <b-dropdown v-model="current_locale" position="is-top-right" aria-role="list">
    <button class="button is-text is-small" type="button" slot="trigger">
      <span>{{ locales[current_locale] }}</span>
      <b-icon icon="caret-up" />
    </button>

    <b-dropdown-item v-for="(locale, i) in Object.keys(locales)" :key="i" :value="locale" aria-role="listitem">
      {{ locales[locale] }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapActions } from 'vuex'
import { available_locales } from '../../i18n'

export default {
  computed: {
    locales () {
      return available_locales
    },
    current_locale: {
      get () {
        return this.$i18n.locale
      },
      set (locale) {
        this.$store.dispatch('set_locale', locale)
      }
    }
  },
  methods: {
    ...mapActions(['set_locale'])
  }
}
</script>

<style lang="sass" scoped>
button.button.is-text
  font-size: 1em
  text-decoration: none
</style>

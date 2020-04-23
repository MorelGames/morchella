<template>
  <div id="app">
    <main>
      <div class="container">
        <div class="cah-layout">
          <div class="cah-layout-logo">
            <Logo />
          </div>
          <div class="cah-layout-game">
            <AskPseudonym v-if="phase === 'PSEUDONYM'" />
            <GameConfiguration v-else-if="phase === 'CONFIG'" />
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="content">
        <p>
          <strong>{{ $t('Morels Against Humanity is not affiliated with Cards Against Humanity.') }}</strong><br />
          <i18n path="It is brought to you by {name}.">
            <a href="https://amaury.carrade.eu" slot="name">Amaury Carrade</a>
          </i18n>&nbsp;
          <i18n path="This application is {open_source}.">
            <a href="https://github.com/AmauryCarrade/cah" slot="open_source">{{ $t('open source, and published under a free licence') }}</a>
          </i18n>
        </p>
        <p>
          <i18n path="Cards are written by {cah} (published under CC BY-NC-SA) and {jah}.">
            <a href="https://cardsagainsthumanity.com/" target="_blank" slot="cah">Cards Against Humanity</a>
            <a href="https://crhallberg.com/cah/" target="_blank" slot="jah">{{ $t('others') }}</a>
          </i18n><br />
          <i18n path="If you like this game, {consider_buying}">
            <a href="https://store.cardsagainsthumanity.com/" target="_blank" slot="consider_buying">{{ $t('please consider buying it!') }}</a>
          </i18n>
          {{ $t('These folks are cool.') }}
        </p>
      </div>
      <LocaleSwitcher />
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Logo from './components/parts/Logo.vue'
import LocaleSwitcher from './components/parts/LocaleSwitcher.vue'

import AskPseudonym from './components/AskPseudonym.vue'
import GameConfiguration from './components/GameConfiguration.vue'

export default {
  name: 'App',
  computed: mapState(['phase']),
  components: {
    Logo,
    LocaleSwitcher,

    AskPseudonym,
    GameConfiguration
  }
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/_all"

@import "sass/variables"

@import "~bulma"
@import "~buefy/src/scss/buefy"

html, body
  overflow-y: auto
  min-height: 100vh

  +mobile
    overflow-x: hidden

#app
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: black

  display: flex
  flex-direction: column
  min-height: 100vh

  main
    flex: 2

.cah-layout
  display: flex
  flex-direction: row

  margin-top: 1.5rem

  .cah-layout-logo
    .cah-logo
      position: sticky

  .cah-layout-game
    margin-top: .2rem
    margin-left: 1.5rem
    flex: 4

footer.footer
  text-align: center

  .content
    margin-bottom: 1em
    p
      a
        &:after
          content: '°'
          display: inline-block
          padding-left: .1em
          font-weight: bold

        &:hover
          text-decoration: underline
</style>

<template>
  <section class="game-configuration">
    <h1 class="title is-2">{{ $t('Yes! We created a game.') }}</h1>
    <p class="subtitle is-4">
      {{ $t('You shall wait for other players to join.') }}
      {{ $t('They should be here any minute now—that is, if you give them the invitation link.') }}
      {{ $t('Otherwise they\'ll have a tough time getting in.') }}
    </p>

    <section class="columns decks-configuration">
      <div class="column is-4">
        <Card :amount="3" :pickText="$t('Decks')" :pick="active_decks.length" type="light" :verso="true" />
      </div>
      <div class="column is-8 is-decks-column">
        <h2 class="title is-3">{{ $t('Pick up some decks') }}</h2>
        <p class="subtitle is-5">{{ $t('Studies suggest that card games are best played with cards. We packed them by theme. Sortof.') }}</p>
        <div class="tags is-decks">
          <div class="tag is-black" v-for="(deck, i) in active_decks" :key="i">{{ $t(decks[deck].name) }}</div>
        </div>
        <footer class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <i18n path="{black_cards_count} and {white_cards_count}" v-if="black_cards_count > 0 && white_cards_count > 0">
                <template slot="black_cards_count">{{ $tc('{count} black card | {count} black cards', black_cards_count) }}</template>
                <template slot="white_cards_count">{{ $tc('{count} white card | {count} white cards', white_cards_count) }}</template>
              </i18n>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <b-button type="is-black" outlined @click="show_decks_selector = true">
                {{ $t('Add or Remove Decks') }}
                <span>{{ $tc('{count} deck available | {count} decks available', decks_count) }}</span>
              </b-button>
            </div>
          </div>
        </footer>
      </div>

      <b-modal :active.sync="show_decks_selector" has-modal-card width="100vw" aria-role="dialog" :aria-modal="true">
        <div class="modal-card">
          <section class="modal-card-body modal-decks">
            <h2>{{ $t('Add or Remove Cards Decks') }}</h2>
            <b-tabs size="is-small">
              <b-tab-item v-for="(decks_locale, i) in Object.keys(decks_locales)" :key="i">
                <template slot="header">
                  {{ decks_locales[decks_locale] }} <b-tag rounded> {{ decks_count_by_locale(decks_locale) }} </b-tag>
                </template>

                <p>
                  {{ $t('Click on the decks below to add or remove them from you game.') }}
                  <i18n path="These ones are all in {lang}.">
                    <template slot="lang">{{ $t(decks_locales[decks_locale]) }}</template>
                  </i18n>
                </p>

                <div class="level is-mobile decks-list-section" v-if="decks_count_by_locale_and_officiality(decks_locale, true) > 0">
                  <div class="level-left">
                    <div class="level-item">
                      <h3>{{ $t('Official Packs') }}</h3>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <b-button size="is-small" type="is-light" @click="toggle_all_decks(decks_locale, true)">
                        <template v-if="!are_all_toggled(decks_locale, true)">{{ $t('Select all') }}</template>
                        <template v-else>{{ $t('Unselect all') }}</template>
                      </b-button>
                    </div>
                  </div>
                </div>
                <div class="columns is-multiline decks-list">
                  <div class="column is-one-third is-one-quarter-fullhd" v-for="(deck, j) in decks_by_locale_and_officiality(decks_locale, true)" :key="j">
                    <DeckItem :deck="deck" :active="active_decks.includes(deck.id)" @click.native="toggle_deck(deck.id)" />
                  </div>
                </div>

                <div class="level is-mobile decks-list-section" v-if="decks_count_by_locale_and_officiality(decks_locale, false) > 0">
                  <div class="level-left">
                    <div class="level-item">
                      <h3>{{ $t('Community Packs') }}</h3>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <b-button size="is-small" type="is-light" @click="toggle_all_decks(decks_locale, false)">
                        <template v-if="!are_all_toggled(decks_locale, false)">{{ $t('Select all') }}</template>
                        <template v-else>{{ $t('Unselect all') }}</template>
                      </b-button>
                    </div>
                  </div>
                </div>
                <div class="columns is-multiline decks-list">
                  <div class="column is-one-third is-one-quarter-fullhd" v-for="(deck, j) in decks_by_locale_and_officiality(decks_locale, false)" :key="j">
                    <DeckItem :deck="deck" :active="active_decks.includes(deck.id)" @click.native="toggle_deck(deck.id)" />
                  </div>
                </div>
              </b-tab-item>
            </b-tabs>
          </section>
        </div>
      </b-modal>
    </section>

  </section>
</template>

<script>
import { mapState } from 'vuex'
import { available_locales } from '../i18n'

import Card from './parts/Card.vue'
import DeckItem from './parts/DeckItem.vue'

export default {
  data () {
    return {
      show_decks_selector: true
    }
  },
  computed: {
    ...mapState({
      decks: state => state.decks,
      active_decks: state => state.game.decks
    }),
    black_cards_count () {
      return this.active_decks.reduce((count, key) => count + this.decks[key].counts.black, 0)
    },
    white_cards_count () {
      return this.active_decks.reduce((count, key) => count + this.decks[key].counts.white, 0)
    },
    decks_count () {
      return Object.keys(this.decks).length
    },
    decks_locales () {
      return Object.keys(this.decks)
        .map(key => this.decks[key].locale)
        .reduce((obj, locale_key) => ({ ...obj, [locale_key]: (available_locales[locale_key] ? available_locales[locale_key] : locale_key) }), {})
    }
  },
  methods: {
    decks_by_locale_and_officiality (locale, official) {
      return Object.keys(this.decks)
        .filter(deck => this.decks[deck].locale === locale)
        .filter(deck => this.decks[deck].official === official)
        .map(deck => ({ ...this.decks[deck], id: deck }))
    },
    decks_count_by_locale (locale) {
      return Object.keys(this.decks)
        .map(key => this.decks[key].locale)
        .filter(l => l === locale)
        .length
    },
    decks_count_by_locale_and_officiality (locale, official) {
      return Object.keys(this.decks)
        .filter(key => this.decks[key].official === official)
        .map(key => this.decks[key].locale)
        .filter(l => l === locale)
        .length
    },
    toggle_deck (deck_id) {
      this.$store.dispatch('toggle_deck', deck_id)
    },
    toggle_all_decks (locale, official) {
      this.$store.dispatch('toggle_all_decks', { locale, official })
    },
    are_all_toggled (locale, official) {
      return this.$store.getters.are_all_decks_active(locale, official)
    }
  },
  components: {
    Card,
    DeckItem
  }
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/mixins"

.game-configuration
  > section
    margin-top: 2rem

  section.decks-configuration

    .is-decks-column
      display: flex
      flex-direction: column
      align-items: flex-start

      .tags.is-decks
        flex: 4
        align-content: baseline

        max-height: 24em
        overflow-y: auto

        .tag
          font-size: .9rem

      .level
        width: 100%

        button.button
          height: 2.8em
          line-height: 1.2

          span span
            display: block
            font-size: .7em

    .animation-content
      max-width: 100vw
      width: 100vw
      display: flex
      align-items: center
      flex-direction: column

      .modal-card
        width: 90%
        +mobile
          width: 96%

    .modal-decks
      padding: 0
      border-radius: 6px

      $modal-deck-padding: 1.8rem
      $modal-deck-tabs-line-width: 3px

      > *
        padding-right: $modal-deck-padding
        padding-left: $modal-deck-padding

      > *:first-child
        padding-top: 1em

      > *:last-child
        padding-bottom: 1em

      h2
        padding-bottom: .6rem

        background: black
        color: white

        font-size: 1.6em
        font-weight: bold

        +unselectable

      .b-tabs
        padding-right: 0
        padding-left: 0

        nav.tabs
          background: black
          color: white

          +unselectable

          ul
            padding-right: $modal-deck-padding
            padding-left: $modal-deck-padding

            border-bottom-color: black
            border-bottom-width: $modal-deck-tabs-line-width

            li
              a
                margin-bottom: -$modal-deck-tabs-line-width
                border-bottom-color: black
                border-bottom-width: $modal-deck-tabs-line-width

                font-size: .8em
                color: white

                .tag
                  position: relative
                  top: -1px

                  height: 1.2em

                  padding-left: .4em
                  padding-right: .4em

                  margin-left: .6em

                  background-color: white

                  font-size: .9em
                  line-height: 1.1

                  span
                    position: relative
                    top: 1px

              &.is-active a, &:hover a
                border-bottom-color: white

              &.is-active a
                font-weight: bold
                .tag
                  font-weight: normal

        section.tab-content
          padding-right: $modal-deck-padding
          padding-left: $modal-deck-padding

          p
            margin-top: 1rem

          .level
            margin-bottom: 1rem

            .level-left
              flex: 2

              .level-item
                max-width: 100%

                &:last-child
                  padding-right: 1em

          button.button.is-small
            font-size: 1em

          .decks-list-section
            margin-top: 1.5rem

            .level-item
              justify-content: normal

            +mobile
              margin-top: 2rem

            h3
              font-size: 1.2em
              font-weight: bold
              font-variant: all-small-caps
              letter-spacing: .08em

</style>

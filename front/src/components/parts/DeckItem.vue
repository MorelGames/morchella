<template>
  <div class="deck" :class="{'is-active': active}">
    <div class="icon" aria-hidden="true">
      <b-icon :icon="deck.icon" :pack="deck.icon_pack || 'fas'" v-if="deck.icon" :class="{'is-colored': deck.color}" :style="{backgroundColor: deck.color}" />
      <span class="icon is-number" v-else-if="deck.number || deck.color" :style="{backgroundColor: deck.color}">
        <span>{{ deck.number || '' }}</span>
      </span>
      <b-icon icon="square" v-else />
    </div>
    <div class="info">
      <h4 v-html="$t(deck.name)"></h4>
      <ul>
        <li>{{ $tc('{count} black | {count} black', deck.counts.black) }}</li>
        <li>{{ $tc('{count} white | {count} white', deck.counts.white) }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deck: {
      type: Object
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/mixins"

$deck-icon-size: 3em

.deck
  display: flex
  align-items: center

  padding: .4em 0

  border: solid 2px black
  border-radius: 4px

  cursor: pointer

  transition: box-shadow .1s ease-in-out

  &:hover
    //transform: scale(102%)
    box-shadow: 1px 1px 4px rgba(black, .5)

  &.is-active
    background-color: black

    > .icon span.icon:not(.is-number)
      background-color: white
      color: black

      &.is-colored
        color: white

    > .info
      color: white
      ul
        color: $grey-lighter

  > .icon
    margin: 1.2em .8em

    width: $deck-icon-size

    span.icon
      position: relative
      left: .1rem

      width: $deck-icon-size
      height: $deck-icon-size
      background-color: black
      color: white
      border-radius: 100%

      &.is-number
        span
          position: relative
          top: .1em

          font-size: 1.8em
          font-weight: bold

  > .info
    padding-left: 0

    h3
      font-size: 1.2em

    ul
      margin-top: -.2em

      font-size: .9em
      color: $grey-dark

      li
        display: inline-block

        &:not(:first-child)
          margin-left: .8em

          &:before
            content: "⋅"
            position: relative
            left: -.4em
</style>

<template>
  <div class="cah-card-container">
    <article
      class="cah-card"
      :class="[
        {
          'is-dark': type === 'black',
          'is-hoverable': !!hoverable,
          'is-active': !!selected
        },
        amount > 1 ? `has-${Math.min(amount, 3)}-cards` : ''
      ]">
      <div class="cah-card-content" :class="{'has-long-text': !!long, 'is-verso': !!verso}">
        <!-- @slot The card's content. -->
        <slot>
          Morels<br />
          Against<br />
          Humanity
        </slot>
      </div>
      <footer class="cah-card-footer">
        <div class="credit" v-if="!verso">
          <span v-if="(!pick || pick <= 1) && !pickText">Morels Against Humanity</span>
          <span v-else>MAH</span>
        </div>
        <i18n path="Pick {count}" tag="div" class="pick" v-if="!pickText && pick > 1">
          <span slot="count" v-if="pickNumberShown">{{ pick }}</span>
        </i18n>
        <div class="pick" :class="{'is-large': has_large_pick_number}" v-else-if="pickText">
          {{ pickText }} <span v-if="pickNumberShown">{{ pick }}</span>
        </div>
      </footer>
    </article>
  </div>
</template>

<script>
/**
 * A Morels Against Humanity Card. Can be white, black, recto, verso, alone,
 * in deck (of 2 or 3), hoverable, selected, with standard footer, pick footer,
 * or custom footer, and TODO in different sizes.
 */
export default {
  props: {
    /**
     * The size of the card.
     * TODO unimplemented
     *
     * @values is-small, is-medium, is-large
     */
    size: {
      type: String,
      default: ''
    },

    /**
     * The type of the card (black or white?).
     *
     * @values black, white
     */
    type: {
      type: String,
      default: 'white'
    },

    /**
     * The amount of cards in the stack, if we want them to appear stacked.
     * If 1 (the default), the card will not appear stacked.
     *
     * @values 1, 2, 3
     */
    amount: {
      type: Number,
      default: 1
    },

    /**
     * In the footer, the amount displayed against the “PICK” text.
     * If 1, the “PICK x” footer will be hidden (and the logo expanded), except
     * if `pickText` is specified and `pickNumberShown` is not `false`.
     */
    pick: {
      type: Number,
      default: 1
    },

    /**
     * A custom text for the “PICK x” right footer. If specified, the counter
     * will be displayed even if it's 1, except if `pickNumberShown` is `false`.
     */
    pickText: {
      type: String,
      default: null
    },

    /**
     * With a custom `pickText`, controls whether the number is shown alongside
     * the text in the right footer.
     */
    pickNumberShown: {
      type: Boolean,
      default: true
    },

    /**
     * If `true`, the shadow will be stronger to indicate that the card is
     * “active” or “selected”.
     */
    selected: {
      type: Boolean,
      default: false
    },

    /**
     * If `true`, the card will scale up on hover, and display a stronger
     * shadow (but less strong than with `selected`). Also, a pointer cursor
     * will be shown.
     *
     * If the card is stacked, the stack will merge on hover.
     */
    hoverable: {
      type: Boolean,
      default: false
    },

    /**
     * You should set this to `true` if the card's content is long (approx.
     * longer than 100 characters). It will display it in a smaller font to
     * avoid overflow.
     */
    long: {
      type: Boolean,
      default: false
    },

    /**
     * If `true`, this card will display the verso instead of the recto.
     * The font will be larger, and the line height different, so the game's
     * logo fits perfectly. If the card is displayed without slot, this logo
     * will be displayed instead. Also, the content of the card will be
     * unselectable and the footer will feature no logo (the right footer can
     * still be used, though).
     */
    verso: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    has_large_pick_number () {
      return this.pick >= 10
    }
  }
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/mixins"
// Original CAH cards are 88mm × 63mm.
$cah-card-ratio: 88/63
$cah-width-normal: 17rem

.cah-card-container
  position: relative
  z-index: 1

.cah-card
  display: flex
  flex-direction: column

  position: relative

  width: $cah-width-normal
  height: $cah-width-normal * $cah-card-ratio

  padding: 1.2rem

  box-shadow: 1px 1px 2px rgba(black, .6)
  border-radius: 20px

  background-color: white

  &.is-active
    box-shadow: 1px 1px 4px black

  &.is-hoverable
    cursor: pointer
    transition: box-shadow .1s ease-in-out, transform .1s ease-in-out

    &:before, &:after
      transition: transform .2s ease-in-out, top .1s ease-in-out, left .01s ease-in-out

    &:hover
      box-shadow: 1px 1px 4px rgba(black, .8)
      transform: scale(102%)

      &:before, &:after
        transform: rotate(0deg)
        top: 0
        left: 0

      &:active
        box-shadow: 1px 1px 4px rgba(black, 1)

  &.has-2-cards, &.has-3-cards
    &:before,
    &:after
      content: ''
      display: block
      position: absolute
      width: 100%
      height: 100%
      border-radius: 20px
      background-color: white

  &.is-dark:before, &.is-dark:after
    background-color: black

  &.has-2-cards:before, &.has-3-cards:before
    top: -2px
    left: 0
    box-shadow: 1px 1px 2px rgba(black, .38)
    z-index: -1
    transform: rotate(5deg)

  &.has-2-cards:after
    display: none

  &.has-3-cards:after
    top: 1px
    left: -2px
    box-shadow: 1px 1px 2px rgba(black, .36)
    z-index: -2
    transform: rotate(-3deg)

  & > *
    position: relative
    z-index: 20

  &.is-dark
    background-color: black
    color: white

    footer.cah-card-footer .credit span:after
      border: none

  &:not(.is-dark)
    footer.cah-card-footer
      .credit span:before
        border: none
      .pick span
        background-color: black
        color: white

  .cah-card-content
    flex: 4

    font-size: 1.7rem
    font-weight: bold

    &.has-long-text
      font-size: 1.4rem
    &.is-verso
      font-size: 2.5rem
      line-height: 1.2em
      +unselectable

  footer.cah-card-footer
    display: flex
    align-items: end

    +unselectable

    .credit
      font-size: .7em

      span
        position: relative
        padding-left: 2.6em

        $cah-footer-logo-vertical-shift: 60%

        &:before, &:after
          content: ''
          display: block
          position: absolute
          left: .4em
          top: -$cah-footer-logo-vertical-shift
          width: 1.6em
          height: 1.6em * ($cah-card-ratio / 1.1)
          border-radius: 2px

        &:after
          background-color: white
          border: solid 1px black
          transform: rotate(10deg)
          top: -($cah-footer-logo-vertical-shift + 14)

        &:before
          background-color: black
          border: solid 1px white
          transform: rotate(-20deg)
          left: -.4em

    .pick
      flex: 4

      position: relative
      top: 0.2em

      font-size: 1.1em
      font-weight: bold

      text-transform: uppercase
      text-align: right

      span
        display: inline-block

        margin-left: .1em

        width: 1.4em
        height: 1.4em

        background-color: white
        border-radius: 100%

        color: black

        letter-spacing: .44em
        line-height: 1.6em

      &.is-large span
        width: auto
        padding: 0 .4em 0 .3em
        border-radius: 12px
        letter-spacing: normal
</style>

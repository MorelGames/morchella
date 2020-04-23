<template>
  <div class="cah-loader" :class="css_class">
    <div class="cah-loader-blade"></div>
    <div class="cah-loader-blade"></div>
    <div class="cah-loader-blade"></div>
    <div class="cah-loader-blade"></div>
    <div class="cah-loader-blade"></div>
    <div class="cah-loader-blade"></div>
    <div class="cah-loader-blade"></div>
    <div class="cah-loader-blade"></div>
    <div class="cah-loader-blade"></div>
    <div class="cah-loader-blade"></div>
    <div class="cah-loader-blade"></div>
    <div class="cah-loader-blade"></div>
  </div>
</template>

<script>
export default {
  props: ['dark', 'position'],
  computed: {
    css_class () {
      const color = this.dark ? 'is-dark' : 'is-light'
      const position = this.position === 'center' ? 'is-centered' : ''

      return `${color} ${position}`
    }
  }
}
</script>

<style lang="sass">
$spinner-color-light: white
$spinner-color-dark: black
$spinner-size: 32px
$spinner-amount: 12

.cah-loader
  display: inline-block
  font-size: $spinner-size
  height: $spinner-size
  position: relative
  vertical-align: middle
  width: $spinner-size

  &-blade
    animation: cah-loader-fade 1s infinite linear
    background-color: $spinner-color-light
    border-radius: .5em
    bottom: 0
    height: .2777em
    left: .4629em
    position: absolute
    transform-origin: center -.2222em
    width: .074em

    $animation-delay: 0s
    $blade-rotation: 0deg
    $blade-initial-opacity: .3

    @for $i from 1 through $spinner-amount
      &:nth-child(#{$i})
        animation-delay: $animation-delay
        transform: rotate($blade-rotation)
        opacity: $blade-initial-opacity

        $blade-rotation: $blade-rotation + (360 / $spinner-amount)
        $animation-delay: $animation-delay + (1 / $spinner-amount)
        $blade-initial-opacity: $blade-initial-opacity + (.7 / $spinner-amount)

  &.is-centered
    display: block
    left: 50%
    margin: auto
    position: absolute
    top: 50%
    transform: translate(-50%, -50%)

  &.is-dark .cah-loader-blade
    background-color: $spinner-color-dark

@keyframes cah-loader-fade
  0%
    opacity: 1

  100%
    opacity: .3
</style>

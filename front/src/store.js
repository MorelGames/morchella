import Vue from 'vue'
import Vuex from 'vuex'

import { set_i18n_language_async } from './i18n'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    phase: 'CONFIG',
    decks: {
      'base-set': {
        id: 'base-set',
        name: 'Base Set',
        official: true,
        locale: 'en',
        icon: null,
        number: null,
        color: null,
        counts: {
          black: 90,
          white: 460
        }
      },
      'the-first-expansion': {
        id: 'the-first-expansion',
        name: 'The First Expansion',
        official: true,
        locale: 'en',
        icon: null,
        number: 1,
        color: '#d90000',
        counts: {
          black: 20,
          white: 80
        }
      },
      'the-second-expansion': {
        id: 'the-second-expansion',
        name: 'The Second Expansion',
        official: true,
        locale: 'en',
        icon: null,
        number: 2,
        color: '#d90000',
        counts: {
          black: 25,
          white: 75
        }
      },
      'the-third-expansion': {
        id: 'the-third-expansion',
        name: 'The Third Expansion',
        official: true,
        locale: 'en',
        icon: null,
        number: 3,
        color: '#d90000',
        counts: {
          black: 25,
          white: 75
        }
      },
      'the-fourth-expansion': {
        id: 'the-fourth-expansion',
        name: 'The Fourth Expansion',
        official: true,
        locale: 'en',
        icon: null,
        number: 4,
        color: 'blue',
        counts: {
          black: 30,
          white: 70
        }
      },
      'the-fifth-expansion': {
        id: 'the-fifth-expansion',
        name: 'The Fifth Expansion',
        official: true,
        locale: 'en',
        icon: null,
        number: 5,
        color: 'blue',
        counts: {
          black: 25,
          white: 75
        }
      },
      'the-sixth-expansion': {
        id: 'the-sixth-expansion',
        name: 'The Sixth Expansion',
        official: true,
        locale: 'en',
        icon: null,
        number: 6,
        color: 'blue',
        counts: {
          black: 25,
          white: 75
        }
      },
      'green-box-expansion': {
        id: 'green-box-expansion',
        name: 'Green Box Expansion',
        official: true,
        locale: 'en',
        icon: 'square',
        number: null,
        color: 'green',
        counts: {
          black: 55,
          white: 245
        }
      },
      '90s-nostalgia-pack': {
        id: '90s-nostalgia-pack',
        name: '90s Nostalgia Pack',
        official: true,
        locale: 'en',
        icon: 'birthday-cake',
        number: null,
        color: null,
        counts: {
          black: 7,
          white: 23
        }
      },
      'box-expansion': {
        id: 'box-expansion',
        name: 'Box Expansion',
        official: true,
        locale: 'en',
        icon: 'cube',
        number: null,
        color: null,
        counts: {
          black: 0,
          white: 21
        }
      },
      'fantasy-pack': {
        id: 'fantasy-pack',
        name: 'Fantasy Pack',
        official: true,
        locale: 'en',
        icon: 'magic',
        number: null,
        color: null,
        counts: {
          black: 6,
          white: 26
        }
      },
      'food-pack': {
        id: 'food-pack',
        name: 'Food Pack',
        official: true,
        locale: 'en',
        icon: 'utensils',
        number: null,
        color: null,
        counts: {
          black: 6,
          white: 24
        }
      },
      'science-pack': {
        id: 'science-pack',
        name: 'Science Pack',
        official: true,
        locale: 'en',
        icon: 'flask',
        number: null,
        color: null,
        counts: {
          black: 7,
          white: 23
        }
      },
      'world-wide-web-pack': {
        id: 'world-wide-web-pack',
        name: 'World Wide Web Pack',
        official: true,
        locale: 'en',
        icon: 'globe',
        number: null,
        color: null,
        counts: {
          black: 9,
          white: 21
        }
      },
      'vote-for-hillary-pack': {
        id: 'vote-for-hillary-pack',
        name: 'Vote for Hillary Pack',
        official: true,
        locale: 'en',
        icon: 'venus',
        number: null,
        color: null,
        counts: {
          black: 3,
          white: 11
        }
      },
      'vote-for-trump-pack': {
        id: 'vote-for-trump-pack',
        name: 'Vote for Trump Pack',
        official: true,
        locale: 'en',
        icon: 'bullhorn',
        number: null,
        color: null,
        counts: {
          black: 3,
          white: 12
        }
      },
      'trump-survival-pack': {
        id: 'trump-survival-pack',
        name: 'Trump Survival Pack',
        official: true,
        locale: 'en',
        icon: 'medkit',
        number: null,
        color: null,
        counts: {
          black: 3,
          white: 22
        }
      },
      '2012-holiday-pack': {
        id: '2012-holiday-pack',
        name: '2012 Holiday Pack',
        official: true,
        locale: 'en',
        icon: 'tree',
        number: null,
        color: null,
        counts: {
          black: 7,
          white: 23
        }
      },
      '2013-holiday-pack': {
        id: '2013-holiday-pack',
        name: '2013 Holiday Pack',
        official: true,
        locale: 'en',
        icon: 'gift',
        number: null,
        color: null,
        counts: {
          black: 9,
          white: 21
        }
      },
      'pax-east-2013': {
        id: 'pax-east-2013',
        name: 'PAX East 2013',
        official: true,
        locale: 'en',
        icon: 'arrow-circle-right',
        number: null,
        color: null,
        counts: {
          black: 6,
          white: 24
        }
      },
      'pax-prime-2013': {
        id: 'pax-prime-2013',
        name: 'PAX Prime 2013',
        official: true,
        locale: 'en',
        icon: 'paypal',
        icon_pack: 'fab',
        number: null,
        color: null,
        counts: {
          black: 7,
          white: 37
        }
      },
      'pax-east-2014': {
        id: 'pax-east-2014',
        name: 'PAX East 2014',
        official: true,
        locale: 'en',
        icon: 'arrow-alt-circle-right',
        number: null,
        color: null,
        counts: {
          black: 5,
          white: 22
        }
      },
      'pax-east-2014-panel-pack': {
        id: 'pax-east-2014-panel-pack',
        name: 'PAX East 2014 Panel Pack',
        official: true,
        locale: 'en',
        icon: 'users',
        number: null,
        color: null,
        counts: {
          black: 2,
          white: 8
        }
      },
      'pax-prime-2014-panel-pack': {
        id: 'pax-prime-2014-panel-pack',
        name: 'PAX Prime 2014 Panel Pack',
        official: true,
        locale: 'en',
        icon: 'user-times',
        number: null,
        color: null,
        counts: {
          black: 5,
          white: 6
        }
      },
      'pax-prime-2015-food-packs': {
        id: 'pax-prime-2015-food-packs',
        name: 'PAX Prime 2015 Food Packs',
        official: true,
        locale: 'en',
        icon: 'truck',
        number: null,
        color: null,
        counts: {
          black: 6,
          white: 24
        }
      },
      'house-of-cards-against-humanity': {
        id: 'house-of-cards-against-humanity',
        name: 'House of Cards Against Humanity',
        official: true,
        locale: 'en',
        icon: 'university',
        number: null,
        color: null,
        counts: {
          black: 9,
          white: 16
        }
      },
      'reject-pack': {
        id: 'reject-pack',
        name: 'Reject Pack',
        official: true,
        locale: 'en',
        icon: 'thumbs-down',
        number: null,
        color: null,
        counts: {
          black: 8,
          white: 16
        }
      },
      'reject-pack-2': {
        id: 'reject-pack-2',
        name: 'Reject Pack 2',
        official: true,
        locale: 'en',
        icon: 'ban',
        number: null,
        color: null,
        counts: {
          black: 10,
          white: 24
        }
      },
      canadian: {
        id: 'canadian',
        name: 'Canadian',
        official: true,
        locale: 'en',
        icon: 'leaf',
        number: null,
        color: null,
        counts: {
          black: 5,
          white: 21
        }
      },
      'misprint-replacement-bonus-cards': {
        id: 'misprint-replacement-bonus-cards',
        name: 'Misprint Replacement Bonus Cards',
        official: true,
        locale: 'en',
        icon: 'print',
        number: null,
        color: null,
        counts: {
          black: 1,
          white: 9
        }
      },
      'apples-to-apples-party-pack': {
        id: 'apples-to-apples-party-pack',
        name: 'Apples to Apples&reg; Party Pack',
        official: false,
        locale: 'en',
        icon: 'apple',
        icon_pack: 'fab',
        number: null,
        color: null,
        counts: {
          black: 249,
          white: 747
        }
      },
      'crabs-adjust-humidity': {
        id: 'crabs-adjust-humidity',
        name: 'Crabs Adjust Humidity',
        official: false,
        locale: 'en',
        icon: 'wrench',
        number: null,
        color: null,
        counts: {
          black: 129,
          white: 320
        }
      },
      'cads-about-matrimony': {
        id: 'cads-about-matrimony',
        name: 'Cads About Matrimony',
        official: false,
        locale: 'en',
        icon: 'bell',
        number: null,
        color: null,
        counts: {
          black: 55,
          white: 230
        }
      },
      'c-tg': {
        id: 'c-tg',
        name: '/tg/',
        official: false,
        locale: 'en',
        icon: 'reddit',
        icon_pack: 'fab',
        number: null,
        color: null,
        counts: {
          black: 90,
          white: 267
        }
      },
      'c-admin-s-picks': {
        id: 'c-admin-s-picks',
        name: 'Admin\'s Picks',
        official: false,
        locale: 'en',
        icon: 'thumbs-up',
        number: null,
        color: null,
        counts: {
          black: 123,
          white: 227
        }
      },
      'c-anime': {
        id: 'c-anime',
        name: 'Anime',
        official: false,
        locale: 'en',
        icon: 'sun',
        number: null,
        color: null,
        counts: {
          black: 151,
          white: 526
        }
      },
      'c-antisocial-injustice': {
        id: 'c-antisocial-injustice',
        name: 'Antisocial Injustice',
        official: false,
        locale: 'en',
        icon: 'gavel',
        number: null,
        color: null,
        counts: {
          black: 9,
          white: 27
        }
      },
      'c-cards-against-equinity': {
        id: 'c-cards-against-equinity',
        name: 'Cards Against Equinity',
        official: false,
        locale: 'en',
        icon: 'trophy',
        number: null,
        color: null,
        counts: {
          black: 60,
          white: 138
        }
      },
      'c-cards-against-homestuck': {
        id: 'c-cards-against-homestuck',
        name: 'Cards Against Homestuck',
        official: false,
        locale: 'en',
        icon: 'home',
        number: null,
        color: null,
        counts: {
          black: 67,
          white: 340
        }
      },
      'c-derps-against-humanity': {
        id: 'c-derps-against-humanity',
        name: 'Derps Against Humanity',
        official: false,
        locale: 'en',
        icon: 'meh',
        number: null,
        color: null,
        counts: {
          black: 42,
          white: 37
        }
      },
      'c-doctor-who': {
        id: 'c-doctor-who',
        name: 'Doctor Who',
        official: false,
        locale: 'en',
        icon: 'stethoscope',
        number: null,
        color: null,
        counts: {
          black: 26,
          white: 71
        }
      },
      'c-eurovision-song-contest': {
        id: 'c-eurovision-song-contest',
        name: 'Eurovision Song Contest',
        official: false,
        locale: 'en',
        icon: 'music',
        number: null,
        color: null,
        counts: {
          black: 20,
          white: 20
        }
      },
      'c-fimfiction-net': {
        id: 'c-fimfiction-net',
        name: 'FiMFiction.net',
        official: false,
        locale: 'en',
        icon: 'heart',
        number: null,
        color: null,
        counts: {
          black: 36,
          white: 77
        }
      },
      'c-game-grumps': {
        id: 'c-game-grumps',
        name: 'Game Grumps',
        official: false,
        locale: 'en',
        icon: 'frown',
        number: null,
        color: null,
        counts: {
          black: 99,
          white: 178
        }
      },
      'c-golby-fan-club': {
        id: 'c-golby-fan-club',
        name: 'Golby Fan Club',
        official: false,
        locale: 'en',
        icon: 'file-alt',
        number: null,
        color: null,
        counts: {
          black: 18,
          white: 101
        }
      },
      'c-game-of-thrones-no-spoilers': {
        id: 'c-game-of-thrones-no-spoilers',
        name: 'Game of Thrones (no spoilers)',
        official: false,
        locale: 'en',
        icon: 'shield-alt',
        number: null,
        color: null,
        counts: {
          black: 20,
          white: 80
        }
      },
      'c-grognards-against-humanity-rpg-fandom-pack': {
        id: 'c-grognards-against-humanity-rpg-fandom-pack',
        name: 'Grognards Against Humanity (RPG fandom pack)',
        official: false,
        locale: 'en',
        icon: 'moon',
        number: null,
        color: null,
        counts: {
          black: 23,
          white: 86
        }
      },
      'c-hackers-against-humanity': {
        id: 'c-hackers-against-humanity',
        name: 'Hackers Against Humanity',
        official: false,
        locale: 'en',
        icon: 'laptop',
        number: null,
        color: null,
        counts: {
          black: 78,
          white: 279
        }
      },
      'c-joey-image-1': {
        id: 'c-joey-image-1',
        name: 'Joey Image 1',
        official: false,
        locale: 'en',
        icon: 'image',
        number: null,
        color: null,
        counts: {
          black: 15,
          white: 35
        }
      },
      'c-ladies-against-humanity': {
        id: 'c-ladies-against-humanity',
        name: 'Ladies Against Humanity',
        official: false,
        locale: 'en',
        icon: 'female',
        number: null,
        color: null,
        counts: {
          black: 25,
          white: 89
        }
      },
      'c-imgur': {
        id: 'c-imgur',
        name: 'Imgur',
        official: false,
        locale: 'en',
        icon: 'info',
        number: null,
        color: null,
        counts: {
          black: 56,
          white: 49
        }
      },
      'c-khaos-wolfkat': {
        id: 'c-khaos-wolfkat',
        name: 'Khaos WolfKat',
        official: false,
        locale: 'en',
        icon: 'kiss-wink-heart',
        number: null,
        color: null,
        counts: {
          black: 76,
          white: 90
        }
      },
      'c-mr-man-collection': {
        id: 'c-mr-man-collection',
        name: 'Mr. Man Collection',
        official: false,
        locale: 'en',
        icon: 'male',
        number: null,
        color: null,
        counts: {
          black: 37,
          white: 99
        }
      },
      'c-neindy': {
        id: 'c-neindy',
        name: 'NEIndy',
        official: false,
        locale: 'en',
        icon: 'question',
        number: null,
        color: null,
        counts: {
          black: 16,
          white: 30
        }
      },
      'c-nobilis-reed': {
        id: 'c-nobilis-reed',
        name: 'Nobilis Reed',
        official: false,
        locale: 'en',
        icon: 'exclamation',
        number: null,
        color: null,
        counts: {
          black: 10,
          white: 24
        }
      },
      'c-not-safe-for-humanity': {
        id: 'c-not-safe-for-humanity',
        name: 'Not Safe For Humanity',
        official: false,
        locale: 'en',
        icon: 'exclamation-triangle',
        number: null,
        color: null,
        counts: {
          black: 32,
          white: 99
        }
      },
      'c-northernlion': {
        id: 'c-northernlion',
        name: 'Northernlion',
        official: false,
        locale: 'en',
        icon: 'youtube',
        icon_pack: 'fab',
        number: null,
        color: null,
        counts: {
          black: 101,
          white: 171
        }
      },
      'c-ragingpsyfag-s-pack-of-shenanigans': {
        id: 'c-ragingpsyfag-s-pack-of-shenanigans',
        name: 'RagingPsyfag\'s Pack of Shenanigans',
        official: false,
        locale: 'en',
        icon: 'fighter-jet',
        number: null,
        color: null,
        counts: {
          black: 16,
          white: 62
        }
      },
      'c-ridiculously-stupid': {
        id: 'c-ridiculously-stupid',
        name: 'Ridiculously Stupid',
        official: false,
        locale: 'en',
        icon: 'lemon',
        number: null,
        color: null,
        counts: {
          black: 47,
          white: 115
        }
      },
      'c-rooster-teeth': {
        id: 'c-rooster-teeth',
        name: 'Rooster Teeth',
        official: false,
        locale: 'en',
        icon: 'youtube',
        icon_pack: 'fab',
        number: null,
        color: null,
        counts: {
          black: 69,
          white: 155
        }
      },
      'c-rpanons': {
        id: 'c-rpanons',
        name: 'RPAnons',
        official: false,
        locale: 'en',
        icon: 'user-secret',
        number: null,
        color: null,
        counts: {
          black: 69,
          white: 163
        }
      },
      'c-socialgamer': {
        id: 'c-socialgamer',
        name: 'SocialGamer',
        official: false,
        locale: 'en',
        icon: 'gamepad',
        number: null,
        color: null,
        counts: {
          black: 13,
          white: 22
        }
      },
      'c-sodomy-dog-s-furry-pack': {
        id: 'c-sodomy-dog-s-furry-pack',
        name: 'Sodomy Dog\'s Furry Pack',
        official: false,
        locale: 'en',
        icon: 'paw',
        number: null,
        color: null,
        counts: {
          black: 105,
          white: 178
        }
      },
      'c-that-guy-with-the-glasses': {
        id: 'c-that-guy-with-the-glasses',
        name: 'That Guy With The Glasses',
        official: false,
        locale: 'en',
        icon: 'street-view',
        number: null,
        color: null,
        counts: {
          black: 208,
          white: 425
        }
      },
      'c-very-serious': {
        id: 'c-very-serious',
        name: 'Very Serious',
        official: false,
        locale: 'en',
        icon: 'black-tie',
        icon_pack: 'fab',
        number: null,
        color: null,
        counts: {
          black: 59,
          white: 113
        }
      },
      'c-vidya': {
        id: 'c-vidya',
        name: 'Vidya',
        official: false,
        locale: 'en',
        icon: 'video',
        number: null,
        color: null,
        counts: {
          black: 107,
          white: 215
        }
      },
      'c-xkcd': {
        id: 'c-xkcd',
        name: 'xkcd',
        official: false,
        locale: 'en',
        icon: 'times',
        number: null,
        color: null,
        counts: {
          black: 67,
          white: 41
        }
      }
    },
    game: {
      decks: ['base-set', 'science-pack']
    }
  },

  getters: {
    are_all_decks_active (state) {
      return (locale, official) => {
        const ids_list = Object.values(state.decks)
          .filter(deck => deck.locale === locale && deck.official === official)
          .map(deck => deck.id)

        return ids_list.every(id => state.game.decks.includes(id))
      }
    }
  },

  mutations: {
    set_loading (store, loading) {
      store.loading = loading
    },
    select_deck (store, deck_id) {
      if (!store.game.decks.includes(deck_id)) {
        store.game.decks.push(deck_id)
      }
    },
    unselect_deck (store, deck_id) {
      store.game.decks = store.game.decks.filter(id => id !== deck_id)
    },
    reorder_decks (store) {
      const decks = store.game.decks
      store.game.decks = Object.values(store.decks).filter(deck => decks.includes(deck.id)).map(deck => deck.id)
    }
  },

  actions: {
    set_locale (context, locale) {
      context.commit('set_loading', true)
      set_i18n_language_async(locale).then(() => context.commit('set_loading', false))
    },
    toggle_deck (context, deck_id) {
      if (context.state.game.decks.includes(deck_id)) {
        context.commit('unselect_deck', deck_id)
      } else {
        context.commit('select_deck', deck_id)
      }
      context.commit('reorder_decks')
    },
    toggle_all_decks (context, params) {
      const locale = params.locale
      const official = params.official

      const ids_list = Object.values(context.state.decks)
        .filter(deck => deck.locale === locale && deck.official === official)
        .map(deck => deck.id)

      // If all items corresponding to these parameters are selected, we unselect
      // them all. Else we select them all.
      const do_select = !ids_list.every(id => context.state.game.decks.includes(id))

      ids_list.forEach(id => context.commit(do_select ? 'select_deck' : 'unselect_deck', id))
      context.commit('reorder_decks')
    }
  },

  modules: {
  }
})

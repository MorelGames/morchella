import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  formatFallbackMessages: true,
  silentFallbackWarn: true, // Same as below, no keys for English, fallback is normal.
  messages: {} // English is not needed as keys are the English translation.
})

const loaded_languages = ['en']

function set_i18n_language (locale) {
  i18n.locale = locale
  document.querySelector('html').setAttribute('lang', locale)
  return locale
}

export function set_i18n_language_async (locale) {
  if (i18n.locale === locale || loaded_languages.includes(locale)) {
    return Promise.resolve(set_i18n_language(locale))
  }

  // The language is not loaded yet
  return import(/* webpackChunkName: "locales-[request]" */ './locales/' + locale + '.json').then(messages => {
    i18n.setLocaleMessage(locale, messages.default)
    loaded_languages.push(locale)
    return set_i18n_language(locale)
  }).catch(() => {
    // If the locale cannot be loaded, we try to load the less-specific locale
    // (i.e. if fr-FR fails, we try fr).

    // Nothing left to try: unavailable.
    if (!locale.includes('-')) return

    const locale_parts = locale.split('-')
    locale_parts.pop()

    console.log(locale, 'not found, trying', locale_parts)

    return set_i18n_language_async(locale_parts.join('-'))
  })
}

export const available_locales = {
  en: 'English',
  es: 'Español',
  fr: 'Français'
}

set_i18n_language_async(navigator.language)

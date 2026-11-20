// warchocki.pl: 54 wersje językowe. Kody, hreflang i og:locale 1:1 z rejestru MERA EVENTS
// (merarobotics: netlify/functions/lib/events-langs.mjs, EVENTS_PAGE_LANGS, stan 20.11.2026), żeby obie strony
// i mera.rent używały tych samych kodów. Zmiana kodu = zmiana adresu, więc tylko z przekierowaniem 301.
// path: adres strony Edwarda w tym języku (pl i en to pełna strona React, pozostałe to strony statyczne z prerenderu).
// events: landing MERA EVENTS w tym języku (edward: strona Edwarda w MERA EVENTS, tylko pl, en, de).
// base: wariant regionalny tłumaczony na podstawie języka bazowego. rtl: pismo od prawej do lewej.
const L = (code, name, enName, locale, extra = {}) => ({
  code, hreflang: code, name, enName, locale, path: `/${code}/`, events: `/${code}/events`, edward: null, base: null, rtl: false, ...extra,
})

export const LANGS = [
  L('pl', 'Polski', 'Polish', 'pl_PL', { path: '/', events: '/events', edward: '/events/edward-warchocki' }),
  L('en', 'English', 'English', 'en_GB', { path: '/en', edward: '/en/events/edward-warchocki' }),
  L('de', 'Deutsch', 'German', 'de_DE', { edward: '/de/events/edward-warchocki' }),
  L('fr', 'Français', 'French', 'fr_FR'),
  L('it', 'Italiano', 'Italian', 'it_IT'),
  L('es', 'Español', 'Spanish', 'es_ES'),
  L('nl', 'Nederlands', 'Dutch', 'nl_NL'),
  L('pt', 'Português', 'Portuguese', 'pt_PT'),
  L('sv', 'Svenska', 'Swedish', 'sv_SE'),
  L('da', 'Dansk', 'Danish', 'da_DK'),
  L('no', 'Norsk', 'Norwegian (Bokmål)', 'nb_NO'),
  L('fi', 'Suomi', 'Finnish', 'fi_FI'),
  L('et', 'Eesti', 'Estonian', 'et_EE'),
  L('lv', 'Latviešu', 'Latvian', 'lv_LV'),
  L('lt', 'Lietuvių', 'Lithuanian', 'lt_LT'),
  L('uk', 'Українська', 'Ukrainian', 'uk_UA'),
  L('cs', 'Čeština', 'Czech', 'cs_CZ'),
  L('sk', 'Slovenčina', 'Slovak', 'sk_SK'),
  L('hu', 'Magyar', 'Hungarian', 'hu_HU'),
  L('ro', 'Română', 'Romanian', 'ro_RO'),
  L('bg', 'Български', 'Bulgarian', 'bg_BG'),
  L('hr', 'Hrvatski', 'Croatian', 'hr_HR'),
  L('sl', 'Slovenščina', 'Slovenian', 'sl_SI'),
  L('el', 'Ελληνικά', 'Greek', 'el_GR'),
  L('ca', 'Català', 'Catalan', 'ca_ES'),
  L('eu', 'Euskara', 'Basque', 'eu_ES'),
  L('gl', 'Galego', 'Galician', 'gl_ES'),
  L('cy', 'Cymraeg', 'Welsh', 'cy_GB'),
  L('ga', 'Gaeilge', 'Irish', 'ga_IE'),
  L('mt', 'Malti', 'Maltese', 'mt_MT'),
  L('lb', 'Lëtzebuergesch', 'Luxembourgish', 'lb_LU'),
  L('is', 'Íslenska', 'Icelandic', 'is_IS'),
  L('tr', 'Türkçe', 'Turkish', 'tr_TR'),
  L('sq', 'Shqip', 'Albanian', 'sq_AL'),
  L('sr', 'Srpski', 'Serbian (Latin script)', 'sr_RS'),
  L('bs', 'Bosanski', 'Bosnian', 'bs_BA'),
  L('mk', 'Македонски', 'Macedonian', 'mk_MK'),
  L('ka', 'ქართული', 'Georgian', 'ka_GE'),
  L('hy', 'Հայերեն', 'Armenian', 'hy_AM'),
  L('az', 'Azərbaycanca', 'Azerbaijani', 'az_AZ'),
  L('ru', 'Русский', 'Russian', 'ru_RU'),
  L('ar', 'العربية', 'Arabic', 'ar_AE', { rtl: true }),
  L('he', 'עברית', 'Hebrew', 'he_IL', { rtl: true }),
  L('zh', '中文', 'Chinese (Simplified)', 'zh_CN'),
  L('ja', '日本語', 'Japanese', 'ja_JP'),
  L('ko', '한국어', 'Korean', 'ko_KR'),
  L('hi', 'हिन्दी', 'Hindi', 'hi_IN'),
  L('id', 'Bahasa Indonesia', 'Indonesian', 'id_ID'),
  L('ms', 'Bahasa Melayu', 'Malay', 'ms_MY'),
  L('th', 'ไทย', 'Thai', 'th_TH'),
  L('vi', 'Tiếng Việt', 'Vietnamese', 'vi_VN'),
  // Warianty regionalne: kod w adresie małymi literami, hreflang i <html lang> w zapisie BCP 47
  L('en-us', 'English (US)', 'English (United States)', 'en_US', { hreflang: 'en-US', base: 'en' }),
  L('es-la', 'Español (Latinoamérica)', 'Spanish (Latin America)', 'es_MX', { hreflang: 'es-419', base: 'es' }),
  L('pt-br', 'Português (Brasil)', 'Portuguese (Brazil)', 'pt_BR', { hreflang: 'pt-BR', base: 'pt' }),
]

export const LANG_CODES = LANGS.map((l) => l.code)
export const lang = (code) => LANGS.find((l) => l.code === code) || null
// Języki ze stroną statyczną /<kod>/ (pl i en mają pełną stronę React: / i /en)
export const STATIC_LANGS = LANGS.filter((l) => !['pl', 'en'].includes(l.code))
// Adres dla wersji, z której nie pasuje żaden język: angielska strona (świat), nie polska
export const X_DEFAULT = '/en'

if (LANGS.length !== 54 || new Set(LANG_CODES).size !== 54) throw new Error(`langs: oczekiwano 54 unikalnych kodów, jest ${LANGS.length}`)

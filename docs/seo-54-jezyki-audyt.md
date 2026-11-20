# warchocki.pl: audyt przed wersjami w 54 językach (20.11.2026)

## 1. Co jest dziś na stronie

- 36 adresów w `sitemap.xml`: 10 stron po polsku, 2 po angielsku (`/en`, `/en/produkty`) i 24 strony produktów (12 PL + 12 EN).
- Prerender działa: każda trasa ma treść w HTML, własny `<title>`, opis, canonical, JSON-LD (MERA Robotics + Edward jako Brand z Wikipedią i Wikidata) i blok faktów `#o-edwardzie`.
- hreflang tylko w parach pl/en (strona główna, produkty), x-default wskazuje polską wersję.
- `<html lang>` jest poprawny (`pl` albo `en`).
- `_redirects` ma `/* /index.html 200`, więc każdy nieistniejący adres (np. `/de/`, `/cokolwiek`) zwraca 200 z polską stroną główną (miękki 404). Canonical wskazuje wtedy `/`, więc Google nie powinien tych adresów indeksować, ale weryfikację wdrożenia trzeba robić po treści (`<html lang>`, canonical), nie po samym kodzie 200.
- Brak wersji w innych językach niż PL i EN. Brak FAQ i brak danych strukturalnych filmu z dzikami.
- `llms.txt` jest, ale o mediach pisze tylko „Reuters, among others” (F12 wymienia sześć redakcji).

## 2. Indeks wyszukiwarek (`site:warchocki.pl`, 20.11.2026)

| Wyszukiwarka | Co widać | Uwagi |
|---|---|---|
| Google | ok. 40 wyników na 4 stronach: strona główna PL i EN, produkty, współpraca, wynajem, raport Pol’and’Rock | Raport Pol’and’Rock ma w wyniku stary opis z dawnej wersji strony („pierwszy robot influencer w Polsce. Ponad 500 milionów wyświetleń”). Zniknie po ponownym odwiedzeniu strony przez Googlebota. |
| Bing | zapytanie `site:` zwróciło pustą stronę, ale zapytanie „warchocki.pl” pokazuje stronę główną PL i EN, wynajem Edwarda, wynajem robotów i kolekcję szkolną | Strona jest w indeksie Bing, tylko częściowo. |
| Brave | 3 wyniki: strona główna (stary tytuł „WARCHOCKI.PL ... Pierwszy Robot...” i stary opis z „500 milionów”), produkty EN, wynajem robotów | Brave ma bardzo stary obraz strony. |

Fraza „robot chasing wild boars” w Google (USA, po angielsku): pierwsza strona to YouTube (ABC7, Inside Edition), Reddit, BBC, Facebook (NBC, ABC, BBC), SCMP. **warchocki.pl nie ma na pierwszej stronie.** Google pokazuje pytania „Is the robot chasing wild boars real?” i „Did a robot chase pigs in Poland?”.

## 3. Co ludzie wpisują (podpowiedzi Google, 20.11.2026)

- PL: „robot influencer polska”, „robot influencer edward warchocki”, „robot dziki warszawa”, „robot przegania dziki”, „edward warchocki kto go stworzył”, „edward warchocki co to za robot”, „edward warchocki kto jest właścicielem”, „edward warchocki o co chodzi”.
- EN: „robot chasing wild boars in poland / in warsaw”, „... video”, „... is it real”, „... real or fake”, „... ai”, „humanoid robot wild boars poland”, „robot influencer poland”, „robot influencer edward”.
- DE: „roboter jagt wildschweine (polen, warschau, video)”, „roboter verjagt wildschweine”, „humanoider roboter wildschweine”, „edward roboter wildschweine”, „roboter influencer jagt wildschweine in polen”.
- IT: „robot cinghiali varsavia”, „robot scaccia cinghiali (in polonia)”, „robot insegue cinghiali”, „robot umanoide cinghiali”, „robot influencer edward warchocki”.
- FR: „pologne robot sangliers”, „robot chasse les sangliers”, „varsovie sangliers robot”.
- ES: „robot influencer edward warchocki”, „robot humanoide influencer”.
- NL: „robot jaagt wilde zwijnen weg”.

Wnioski: ludzie szukają filmu z dzikami opisowo (robot + dziki + Warszawa/Polska) i pytają, czy nagranie jest prawdziwe. Fraza „najpopularniejszy robot influencer” prawie nie występuje w podpowiedziach; częściej „robot influencer” + kraj albo imię.

## 4. Film z dzikami

- Oryginał na kanale YouTube Edwarda: „zaganiam dziki do lasu”, https://www.youtube.com/shorts/cLPW4AHcLdA, opublikowany 12.04.2026, 26 s. Nadaje się na VideoObject.
- Relacje mediów według F12: Reuters, CNN, BBC News, CBS News, Channel 4 News, Fox Business.

## 5. Plan wdrożenia

1. 54 kody języków z rejestru `EVENTS_PAGE_LANGS` (merarobotics, `events-langs.mjs`): `/` (pl) i `/en` zostają, 52 nowe strony `/<kod>/` (np. `/de/`, `/ja/`, `/en-us/`, `/es-la/`, `/pt-br/`), arabski i hebrajski od prawej do lewej.
2. Każda strona językowa prerenderowana do statycznego HTML (bez JS): definicja Edwarda, film z dzikami, zasięg (F30), media (F12, F33), FAQ z pytaniami, które ludzie zadają („Kto to jest Edward Warchocki?”, „Który robot przegonił dziki w Warszawie?”, „Czy nagranie jest prawdziwe?”, „Który robot influencer jest najpopularniejszy?” z odpowiedzią opartą na liczbach i mediach), linki do MERA EVENTS i MERA RENT w tym samym języku, przełącznik 54 języków.
3. hreflang: pełny zestaw 54 wersji + x-default na stronie głównej PL, EN i każdej nowej stronie; sitemap z tym samym zestawem.
4. JSON-LD: Edward (ten sam `@id` co na merarobotics.com, Wikipedia, Wikidata), VideoObject filmu z YouTube, FAQPage, WebPage w języku strony.
5. FAQ także w bloku faktów strony głównej PL i EN.
6. `llms.txt`: pełna lista mediów z F12, film, adresy 54 wersji.
7. Tłumaczenia: skrypt `scripts/i18n-fill.mjs` z Claude Sonnet 5.5, źródło PL i EN, walidator (liczby, nazwy własne, zakaz długich myślników).
8. IndexNow dla nowych adresów, sitemap do Google i Bing.

## 6. Do decyzji Bartosza

- **5 miliardów wyświetleń:** w źródłach faktów jest tylko F30 („około 3 miliardów wyświetleń miesięcznie” na kanałach Edwarda, listopad 2026). Strona używa F30. Liczba 5 mld wejdzie dopiero, gdy będzie źródło (np. zrzut z paneli platform albo zestawienie) i wpis w `seo-facts.mjs`.
- **Popularność w Chinach:** brak faktu w źródłach (w wynikach Google widać materiał South China Morning Post, ale F12 go nie wymienia). Do dopisania jako fakt, jeśli Bartosz potwierdzi konkretne media.
- **„Najpopularniejszy” i „pierwszy”:** strona nie twierdzi tego wprost; fraza występuje tylko jako pytanie w FAQ, a odpowiedź podaje liczby i media.

## 7. Wdrożenie (20.11.2026, commity bf2aff9 i b0dc0be)

- Na produkcji: 54 wersje (`/`, `/en` i 52 strony `/<kod>/`), każda sprawdzona po wdrożeniu: 200, `text/html`, właściwy `<html lang>`, canonical na siebie, 55 linków hreflang (54 wersje + x-default `/en`).
- `sitemap.xml`: 88 adresów (36 dotychczasowych + 52 nowe), strony główne i językowe z pełnym zestawem hreflang.
- `llms.txt`: pełna lista mediów, film z dzikami, lista 54 wersji.
- IndexNow (`node scripts/indexnow.mjs`): 89 adresów (sitemap + llms.txt) przyjęte przez api.indexnow.org, Bing, Yandex, Seznam i Naver (200/202).
- Google Search Console (usługa `https://warchocki.pl/`, konto idzikbartosz): sitemap zgłoszona ponownie, Google od razu ją przeczytał: 88 wykrytych stron, status „Success”.
- Razem z tym wdrożeniem poszedł commit f0a8fb8 z `main` (formularz współpracy zapisuje zapytania handlowe także w CRM MERA, mail zostaje jako zapas), który był na `main`, ale jeszcze nie na produkcji.

## 8. Kroki dla Bartosza

**Google Search Console** (https://search.google.com/search-console, usługa `https://warchocki.pl/`):
1. „Sprawdzenie adresu URL” (pasek u góry): wpisz `https://warchocki.pl/`, potem „Poproś o zindeksowanie”. To samo dla `https://warchocki.pl/en`, `https://warchocki.pl/raport-polandrock` (stary opis z „500 milionów”) i kilku wersji z największych rynków: `/de/`, `/fr/`, `/es/`, `/it/`, `/en-us/`. Limit to ok. 10 próśb dziennie.
2. Za 3-7 dni: „Strony” (indeksowanie) i „Skuteczność” z filtrem „Strona zawiera /de/” itd. Sprawdź, czy nowe wersje są zindeksowane.
3. Opcjonalnie: dodaj usługę domenową `warchocki.pl` (weryfikacja rekordem TXT w DNS). Konto idzikbartosz ma dziś tylko usługę z prefiksem `https://warchocki.pl/`.

**Bing Webmaster Tools** (https://www.bing.com/webmasters, w Chrome nie było zalogowanej sesji):
1. Zaloguj się kontem Microsoft albo Google.
2. Jeśli strony nie ma: „Dodaj witrynę” → „Importuj z Google Search Console” (najszybciej, bez weryfikacji DNS).
3. „Mapy witryn” → „Prześlij mapę witryny”: `https://warchocki.pl/sitemap.xml`.
4. IndexNow już zgłosił wszystkie adresy; w „IndexNow” w panelu zobaczysz je po kilku godzinach.

**Brave Search:** nie ma panelu ani zgłaszania adresów. Brave buduje indeks z własnego robota i z ruchu użytkowników przeglądarki Brave (Web Discovery Project), więc pomagają linki z mocnych stron i odwiedziny. W praktyce: linki do `warchocki.pl/<kod>/` z merarobotics.com i mera.rent w tych samych językach, z profili Edwarda (bio na YouTube, Instagramie, X) oraz z Wikipedii i Wikidata (np. „oficjalna strona” w Wikidata Q141129635). Stary tytuł i opis w Brave znikną, gdy jego robot odwiedzi stronę ponownie.

**Do potwierdzenia:** źródło „5 miliardów wyświetleń” i obecności Edwarda w mediach w Chinach. Po potwierdzeniu trzeba je dopisać najpierw do `merarobotics/netlify/functions/lib/seo-facts.mjs`, potem do `scripts/seo-facts.mjs`, `scripts/lang/pl.json` i `en.json`, i przetłumaczyć ponownie: `node scripts/lang-fill.mjs --force`.

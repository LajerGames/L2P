<?php
$this
# System
->SetMenu('system_')
->Set('title_welcome', 'Velkommen til Magic Tune')

# Global
->SetMenu('global_')
->Set('button_save', 'Gem')
->Set('button_close', 'Luk')
->Set('select', ' -- Vælg --')
->Set('point', 'Point')
->Set('points', 'Point')
->Set('save', 'Gem')
->Set('play', 'Spil')
->Set('play_again', 'Spil igen')
->Set('pause', 'Pause')
->Set('delete', 'Slet')
->Set('new', 'Ny')
->Set('last', 'Sidste')
->Set('octave', 'Oktav')
->Set('closed_preview', 'Lukket Preview')
->Set('refresh', 'Genindlæs')

# Validation Errors
->SetMenu('validation_')
->Set('username', 'Dit brugernavn skal være mellem 2 og 16 karaktere. Må kun indeholde tegnene a-å, A-Å…, 0-9 og -_')
->Set('password', 'Minimum 6 karakterer med mindst 1 tal')
->Set('email', 'Skriv venligst en korrekt e-mail adresse')

# Time
->SetMenu('time_')
->Set('day', 'dag')
->Set('days', 'dage')
->Set('hour', 'time')
->Set('hours', 'timer')
->Set('minute', 'minut')
->Set('minutes', 'minutter')
->Set('second', 'sekund')
->Set('seconds', 'sekunder')
->Set('less_than_minute', 'Mindre end et minut siden')
->Set('few_minutes', 'Et par minutter siden')
->Set('about_an_hour', 'Onkring en time siden')
->Set('yesterday', 'I går')
->Set('more_than_a_year', 'Mere end et år siden')
->Set('ago', 'siden')
->Set('date', 'Dato')
->Set('monday', 'mandag')
->Set('tuesday', 'tirsdag')
->Set('wednesday', 'onsdag')
->Set('thursday', 'torsdag')
->Set('friday', 'fredag')
->Set('saturday', 'lørdag')
->Set('sunday', 'søndag')
->Set('january', 'januar')
->Set('febuary', 'febuar')
->Set('march', 'marts')
->Set('april', 'april')
->Set('may', 'maj')
->Set('june', 'juni')
->Set('july', 'juli')
->Set('august', 'august')
->Set('september', 'september')
->Set('october', 'oktober')
->Set('november', 'november')
->Set('december', 'december')

# Login
->SetMenu('login_')
->Set('username', 'Brugernavn')
->Set('password', 'Kodeord')
->Set('validation_attempts_exceeded', 'Du har skrevet dit password forkert #login_attempts# gange. Din konto er blokeret i #block_time#')
->Set('validation_incorrect_login', 'Vi kunne ikke finde en bruger der matchede intastede informationer, prøv igen')

# Frontpage
->SetMenu('frontpage_')
->Set('choose_song', 'Vælg sang')
->Set('choose_scale', 'Vælg skala')
->Set('login', 'Log ind')
->Set('edit', 'Rediger bruger')
->Set('create_user', 'Opret bruger')
->Set('locked_song_login', 'Opret en gratis bruger og få adgang til mange flere sange - det er helt gratis')
->Set('locked_song_purchase', 'Klik på denne sang for at købe den')
->Set('add_to_playlist', 'Tilføj til din playlist')
->Set('view_all', 'Vis alle')
->Set('view_all_songs_title', 'Åbn hele sanglisten')
->Set('view_all_scales_title', 'Åbn hele skalalisten')
->Set('user_logout', 'Log ud')
->Set('user_statistics', 'Statistikker')
->Set('user_settings', 'Indstillinger')
->Set('user_subscription', 'Abonnement')

# Browse
->SetMenu('browse_')
->Set('headline_songs', 'Vis sange')
->Set('headline_scales', 'Vis skalaer')
->Set('search_title', 'Titel')
->Set('playlist_save', 'Gem playlist')
->Set('playlist_play', 'Spil playlist')
->Set('playlist_add', 'Tilføj til playlist')
->Set('start_position', 'Start Position')
->Set('loops', 'Gentag')
->Set('my_playlist', 'Min playlist')

# Create user
->SetMenu('create_user_')
->Set('headline', 'Opret bruger')
->Set('submit', 'Opret')
->Set('username', 'Brugernavn')
->Set('language', 'Vælg sprog')
->Set('email', 'E-mail')
->Set('repeat_email', 'Gentag e-mail')
->Set('password', 'Kodeord')
->Set('repeat_password', 'Gentag kodeord')
->Set('validation_username_unavailable', 'Det valgte brugernavn er allerede i brug')
->Set('validation_emails_mismatch', 'Dine e-mails matcher ikke hinanden')
->Set('validation_email_unavailable', 'Den valgte e-mail adresse er allerede i brug, vælg venligst en anden')
->Set('validation_passwords_mismatch', 'Dine passwords matcher ikke hinanden, prøv igen')
->Set('confirmation_mail_headline', 'Velkommen til')
->Set('confirmation_mail', '
	Hej #username#, <br /><br />
	Velkommen til #system# :) <br /><br />
	For at kunne logge ind, skal du bekræfte denne e-mail adresse. <br /><br />
	Første gang du logger ind #system# vil du blive bedt om at udfylde en aktiveringsnøgle.<br />
	Du kan også bekræfte din mail direkte via dette link:<br />
	#confirmation_anchortag#<br /><br />
	Aktiveringsnøgle: #activationkey#<br />
	Brugernavn: #username# <br />
	Password: #password# <br /><br />
	Hav det sjovt og udvid din awesomeness på #system# ;)<br /><br />
	#system# Team
')

# Handle user
->SetMenu('handle_user_')
->Set('headline', 'Rediger bruger')
->Set('first_name', 'Fornavn')
->Set('last_name', 'Efternavn')
->Set('validation_first_name', 'Dit foravn må max være 20 karaktere langt, og kun indeholde bogstaver')
->Set('validation_last_name', 'Dit efternavn må max være 30 karaktere langt, og kun indeholde bogstaver')

# User settings
->SetMenu('user_settings_')
->Set('concert_pitch', 'Kammertone')
->Set('color_notes', 'Farvede noder')
->Set('kiddie_mode', 'Begyndertilstand')
->Set('validation_concert_pitch', 'Kammertonen skal være numerisk')
->Set('countdown_time', 'Spilstart nedtælling')
->Set('metronome', 'Metronom')

# Activate user
->SetMenu('activate_')
->Set('headline', 'Bekræft e-mail adresse #email#')
->Set('submit', 'Aktiver')
->Set('activationkey', 'Aktiveringsnøgle')
->Set('validation_activationkey', 'Skriv venligst den aktiveringsnøgle du har modtaget på din e-mail')
->Set('validation_activationerror', 'Der skete en fejl, luk venligst dette vindue og log ind én gang til')
->Set('validation_newkeysent', 'En ny aktiveringsnøgle er blevet sendt til din e-mail adresse da aktiveringskoden er skrevet forkert for mange gange')
->Set('reconfirmation_mail_headline', 'Din nye aktiveringsnøgle')
->Set('reconfirmation_mail', '
    Hej #username#, <br /><br />
    Du har indtastet en forkert aktiveringsnøgle for mange gange.<br /><br />
    Vi har sendt denne nye aktiveringsnøgle, for at beskytte din konto.<br /><br />
    Første gang du logger ind #system# vil du blive bedt om at udfylde en aktiveringsnøgle.<br />
	Du kan også bekræfte din mail direkte via dette link:<br />
    #confirmation_anchortag#<br /><br />
    Aktiveringsnøgle: #activationkey#<br />
    Brugernavn: #username# <br /><br />
    Hav det sjovt og udvid din awesomeness på #system# ;)<br /><br />
    #system# Team
')

# User already logged in
->SetMenu('userarea_')
->Set('headline', 'Velkommen, #username#')

# User already logged in
->SetMenu('game_')
->Set('start', 'START!')
->Set('permission_ask', 'Klik venligst tillad ovenfor')
->Set('permission_ask_initial', 'Vi skal bruge din mikrofon')
->Set('permission_ask_helpful', 'Du har ikke klikket tillad')
->Set('permission_ask_helpful_2', 'Gik noget galt?')
->Set('permission_ask_helpful_3', '... så opdater siden')
->Set('permission_ask_impatient', 'Hallo, er du derude?')
->Set('permission_ask_impatient_sigh', 'Vi venter stadig!')
->Set('permission_denied', 'Du tillod ikke adgang, og kan derfor ikke spille')
->Set('measuring', 'Måler baggrundsstøj')
->Set('measuring_quiet', 'Vær venligst stille om')
->Set('measuring_shh', 'Shh...')
->Set('measuring_done', 'Færdig, god fornøjelse :)')
->Set('grade_perfect', 'Perfekt')
->Set('grade_good', 'Flot')
->Set('grade_fair', 'Fint')
->Set('grade_average', 'Gennemsnitligt')
->Set('grade_poor', 'Svagt')
->Set('grade_rubbish', 'Dårligt')
->Set('grade_miserable', 'Frygteligt')

# User statistics
->SetMenu('statistics_')
->Set('headline_own', 'Dine statistikker')
->Set('headline_other', 'Statistikker for #username#')
->Set('favorite_songs', 'Favoritsange')
->Set('graph_precision', 'Præcision')
->Set('graph_pointsprminute', 'Points pr. minut')
->Set('graph_pointsprtact', 'Point pr. takt')
->Set('graph_precisionprtact', 'Præcision pr. takt')
->Set('favourites', 'Favoritter')
->Set('view_all', 'Vis alle')
->Set('title', 'Titel')
->Set('played', 'Spillet')
->Set('avg_pts', 'Gns. point')
->Set('times', 'Gange')
->Set('time', 'Gang')
->Set('play_time', 'Varighed')
->Set('plays', 'Spil')
->Set('summery', 'Opsummering')
->Set('this_game', 'Dette spil')
->Set('average_games', 'Gennemsnit')

# Genres
->SetMenu('genre_')
->Set('game', 'Spil musik')
->Set('jazz', 'Jazz')
->Set('classic', 'Klassisk')
->Set('pop', 'Pop')
->Set('birthday', 'Fødselsdag')
->Set('christmas', 'Jul')
->Set('movie', 'Film')
->Set('danish', 'Dansk')
->Set('children', 'Børn')
->Set('rock', 'Rock')
->Set('wedding', 'Bryllup')

->SetMenu('tour_')
->Set('0_0', 'Velkommen til Magic Tunes guidede rundvisning. Vi vil vise dig lidt rundt i spillets funktionalitet og vise dig hvordan man spiller. <br /><br /> <strong>Inden du starter bør du kontrollere at din mikrofon virker.</strong>"')
->Set('1_0', 'Klik på "Indstillinger"')
->Set('1_1', 'Kammertonen: Her kan du angive hvilken kammertone du spiller med til dagligt, 440 og 442 er det mest normale at anvende. <br /><br /> Klik på "Videre" for at fortsætte')
->Set('1_2', 'Farvede norder: Hvis du sætter en fluevinge i denne kasse, vil vi sørge for at spillets noder har forskellige farver. Noder der ligger på G strengen vil være gule, noder der ligger på A strengen vil være røde og så videre. <br /><br /> Klik på "Videre" for at fortsætte.')
->Set('1_3', 'Her kan du ændre hvilket sprog du vil se Magic Tune i. <br /><br /> Klik på "Videre for at fortsætte.')
->Set('1_4', 'Hvis du sætter en fluevinge i denne boks, sørger vi for at det bilver nemmere for dig at spille. Vi sørger for at spillet stopper ved hver node, og ikke fortsætter før du har spillet den korrekte tone. Dette vil træne din evne til at læse noder og gøre det lettere at lære nye sange. <br /><br /> Klik på "Videre" for at fortsætte.')
->Set('1_5', 'Fra du trykker "Start", venter vi lidt tid inden spillet rent faktisk starter. Vi gør dette for at sikre os at du har haft tid til at samle din violin op, og gøre dig klar. Du kan ændre antallet af sekunder før spillet starter, ved at vælge et nyt antal i denne kasse. <br /><br /> Klik på "Videre" for at fortsætte.')
->Set('1_6', 'Det kan være udfordrende at føle hvornår man præcis skal skifte node. Hvis du sætter en fluevinge i denne boks, laver vi en grafisk pulsering inde i spillet, som passer til sangens rytme. Dette vil gøre det nemmere for dig at vide hvornår du skal skifte tone.')
->Set('1_7', 'Klik på "Gem" for at fortsætte til den næste del.')
->Set('2_0', 'Klik på "Vis alle" på skalaerne.')
->Set('2_1', 'Tilføj denne A-Dur skala til din playlist ved at klikke på plus ikonet.')
->Set('2_2', 'Her kan du se hvilken fingerposition der er den først anvendte i denne skala. <br /><br /> Klik på "Videre" for at fortsætte.')
->Set('2_3', 'Tilføj denne B-Dur skala til din playlist ved at klikke på plus ikonet.')
->Set('2_4', 'Du har nu lavet din egen playlist. Klik på "afspil" ikonet for at fortsætte til spillet.')
->Set('3_0', 'Vi skal bruge din mikrofon til at høre den musik du spiller, venligst klik på tillad for at lade Magic Tune bruge din mikrofon.')
->Set('4_0', 'Snak lidt til din mikrofon, så vi lige kan teste om vi har adgang til den.')
->Set('4_0a', '<br /><br />  <strong>Vi har endnu ikke hørt dig snakke, kontroller venligst at din mikrofon virker som den skal.</strong>')
->Set('4_0b', '<br /><br /> <div style="color: #090; font-weight: bold;">Det virker :) klik på "Videre" for at fortsætte guiden - Vi er snart færdige</div>')
->Set('5_0', 'Sørg for at dit instrument stemmer med din mikrofon. Spil strengene for din mikrofon en ad gangen, og hold øje med at stregen er i midten af tuner-baren og at den korrekte tone vises. <br /><br /> Når du er færdig, er du klar til at spille - tak fordi du tog vores rundvisning og god fornøjelse.')
;
?>
<?php
$this
# System
->SetMenu('system_')
->Set('title_welcome', 'Velkommen til Play.now')

# Global
->SetMenu('global_')
->Set('button_save', 'Gem')
->Set('button_close', 'Luk')
->Set('select', ' -- Vælg --')
->Set('point', 'Point')
->Set('points', 'Point')
->Set('save', 'Gem')
->Set('play', 'Spil')
->Set('delete', 'Slet')
->Set('new', 'Ny')

# Validation Errors
->SetMenu('validation_')
->Set('username', 'Dit brugernavn skal være mellem 2 og 16 karaktere. Må kun indeholde tegnene a-å, A-Å…, 0-9 og -_')
->Set('password', 'Minimum 6 karakterer med mindst 1 tal')
->Set('email', 'Skriv venligst en korrekt e-mail adresse')

# Time
->SetMenu('time_')
->Set('hour', 'time')
->Set('hours', 'timer')
->Set('minute', 'minut')
->Set('minutes', 'minutter')
->Set('second', 'sekund')
->Set('seconds', 'sekunder')

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

# Browse
->SetMenu('browse_')
->Set('headline_songs', 'Vis sange')
->Set('headline_scales', 'Vis skalaer')
->Set('search_title', 'Titel')
->Set('playlist_save', 'Gem playlist')
->Set('playlist_play', 'Spil playlist')
->Set('playlist_add', 'Tilføj til playlist')

# Create user
->SetMenu('create_user_')
->Set('headline', 'Opret bruger')
->Set('submit', 'Opret')
->Set('username', 'Brugernavn')
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
	FÃ¸rste gang du logger ind #system# vil du blive bedt om at udfylde en aktiveringsnøgle.<br />
	Du kan ogsÃ¥ bekrÃ¦fte din mail direkte via dette link:<br />
	#confirmation_anchortag#<br /><br />
	AktiveringsnÃ¸gle: #activationkey#<br />
	Brugernavn: #username# <br />
	Password: #password# <br /><br />
	Hav det sjovt og udvid din awesomeness pÃ¥ #system# ;)<br /><br />
	#system# Team
')

# Handle user
->SetMenu('handle_user_')
->Set('headline', 'Rediger bruger')
->Set('first_name', 'Fornavn')
->Set('last_name', 'Efternavn')
->Set('validation_first_name', 'Dit foravn må max være 20 karaktere langt, og kun indeholde bogstaver')
->Set('validation_last_name', 'Dit efternavn må max være 30 karaktere langt, og kun indeholde bogstaver')

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
    Vi har sendt denne nye aktiveringsnÃ¸gle, for at beskytte din konto.<br /><br />
    FÃ¸rste gang du logger ind #system# vil du blive bedt om at udfylde en aktiveringsnøgle.<br />
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

# User statistics
->SetMenu('statistics_')
->Set('headline_own', 'Dine statistikker')
->Set('headline_other', 'Statistikker for #username#')
->Set('favorite_songs', 'Favoritsange')
->Set('graph_precision', 'Præcision')
->Set('graph_pointsprminute', 'Points pr minut')
->Set('favourites', 'Favoritter')
->Set('view_all', 'Vis alle')

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
;
?>
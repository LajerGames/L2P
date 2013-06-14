<?php
$this
# System
->SetMenu('system_')
->Set('title_welcome', 'Welcome to Play.now')

# Global
->SetMenu('global_')
->Set('button_save', 'Save')
->Set('button_close', 'Close')
->Set('select', ' -- Select --')
->Set('point', 'Point')
->Set('points', 'Points')
->Set('save', 'Save')
->Set('play', 'Play')
->Set('play_again', 'Play again')
->Set('pause', 'Pause')
->Set('delete', 'Delete')
->Set('new', 'New')
->Set('last', 'Last')
->Set('octave', 'Octave')

# Validation Errors
->SetMenu('validation_')
->Set('username', 'Your password has to be between 2 and 16 chracters. It may only contain a-w, A-W, 0,9, -_')
->Set('password', 'At least 6 characters of which at least one should be numeric')
->Set('email', 'Please write a correct e-mail address')

# Time
->SetMenu('time_')
->Set('hour', 'hour')
->Set('hours', 'hours')
->Set('minute', 'minute')
->Set('minutes', 'minutes')
->Set('second', 'second')
->Set('seconds', 'seconds')
->Set('less_than_minute', 'Less than a minute ago')
->Set('few_minutes', 'A few minutes ago')
->Set('about_an_hour', 'Abour an hour ago')
->Set('yesterday', 'Yesterday')
->Set('more_than_a_year', 'More than a year ago')
->Set('ago', 'ago')
->Set('date', 'Date')
->Set('monday', 'monday')
->Set('tuesday', 'tuesday')
->Set('wednesday', 'wednesday')
->Set('thursday', 'thursday')
->Set('friday', 'friday')
->Set('saturday', 'saturday')
->Set('sunday', 'sunday')
->Set('january', 'january')
->Set('febuary', 'febuary')
->Set('march', 'march')
->Set('april', 'april')
->Set('may', 'may')
->Set('june', 'june')
->Set('july', 'july')
->Set('august', 'august')
->Set('september', 'september')
->Set('october', 'october')
->Set('november', 'november')
->Set('december', 'december')

# Login
->SetMenu('login_')
->Set('username', 'Username')
->Set('password', 'Password')
->Set('validation_attempts_exceeded', 'you typed your credentials incorrect #login_attempts# times. Your account are blocked for #block_time#')
->Set('validation_incorrect_login', 'Username and password didn\'t match anything, try again')

# Frontpage
->SetMenu('frontpage_')
->Set('choose_song', 'Choose song')
->Set('choose_scale', 'Choose scale')
->Set('login', 'Login')
->Set('edit', 'Edit user')
->Set('create_user', 'Create user')
->Set('locked_song_login', 'Create a free and gain access to alot of free songs')
->Set('locked_song_purchase', 'Click on this song to purchase it')
->Set('add_to_playlist', 'Add to playlist')
->Set('view_all', 'View all')
->Set('view_all_songs_title', 'Open entire songlist')
->Set('view_all_scales_title', 'Open entire scalelist')
->Set('user_logout', 'Logout')
->Set('user_statistics', 'Statistics')
->Set('user_settings', 'Settings')

# Browse
->SetMenu('browse_')
->Set('headline_songs', 'Browse songs')
->Set('headline_scales', 'Browse scales')
->Set('search_title', 'Title')
->Set('playlist_save', 'Save playlist')
->Set('playlist_play', 'Play playlist')
->Set('playlist_add', 'New playlist')
->Set('start_position', 'Start Position')
->Set('loops', 'Loops')
->Set('my_playlist', 'My playlist')

# Create user
->SetMenu('create_user_')
->Set('headline', 'Create user')
->Set('submit', 'Create')
->Set('username', 'Username')
->Set('email', 'E-mail')
->Set('language', 'Vælg sprog')
->Set('repeat_email', 'Repeat e-mail')
->Set('password', 'Password')
->Set('repeat_password', 'Repeat password')
->Set('validation_username_unavailable', 'The chosen username is not available')
->Set('validation_emails_mismatch', 'The e-mail addresses does not match')
->Set('validation_email_unavailable', 'The chosen e-mail address is not')
->Set('validation_passwords_mismatch', 'The passwords does not match')
->Set('confirmation_mail_headline', 'Welcome to')
->Set('confirmation_mail', '
    Hello #username#, <br /><br />
    Welcome to #system# :) <br /><br />
    In order to login, you will have to confirm this e-mail address. <br /><br />
    First time you login to #system# you will be asked for a activation-key.<br />
    You can confirm your mail directly via this link:<br />
    #confirmation_anchortag#<br /><br />
    Activationkey: #activationkey#<br />
    Username: #username# <br />
    Password: #password# <br /><br />
    Hav fun being awesome on #system# ;)<br /><br />
    #system# Team
')

# Handle user
->SetMenu('handle_user_')
->Set('headline', 'Edit user')
->Set('first_name', 'Fornavn')
->Set('last_name', 'Efternavn')
->Set('validation_first_name', 'Your first name may not contain more than 20 characters and it may only contain letters')
->Set('validation_last_name', 'Your last may not contain more than 30 characters and it may only contain letters')

# User settings
->SetMenu('user_settings_')
->Set('concert_pitch', 'Concert pitch')
->Set('color_notes', 'Colored notes')
->Set('kiddie_mode', 'Kiddie mode')
->Set('validation_concert_pitch', 'Concert pitch must be numeric')

# Activate user
->SetMenu('activate_')
->Set('headline', 'Confirm e-mail #email#')
->Set('submit', 'Activate')
->Set('activationkey', 'Activationkey')
->Set('validation_activationkey', 'Please type the activation key you\'ve recieved via e-mail')
->Set('validation_activationerror', 'An error has occured, please close this window and try to login again')
->Set('validation_newkeysent', 'You\'ve typed in an incorrect activationkey too many times, therefor we\'ve sent a new activationkey to your account')
->Set('reconfirmation_mail_headline', 'Your new activation key')
->Set('reconfirmation_mail', '
    Hello #username#, <br /><br />
	You\'ve typed in an incorrect activation key too many times.<br /><br />
	We\'ve sent you this e-mail, containing a new activation key, in order to protect your account.<br /><br />
	When you login to #system# you will be asked for a activation-key.<br />
    You can confirm your mail directly via this link:<br />
    #confirmation_anchortag#<br /><br />
    Activationkey: #activationkey#<br />
    Username: #username# <br /><br />
    Hav fun being awesome on #system# ;)<br /><br />
    #system# Team
')

# User already logged in
->SetMenu('userarea_')
->Set('headline', 'Welcome, #username#')

# User already logged in
->SetMenu('game_')
->Set('start', 'GO!')

# User statistics
->SetMenu('statistics_')
->Set('headline_own', 'Your statistics')
->Set('headline_other', 'Statistics for #username#')
->Set('favorite_songs', 'Favorite songs')
->Set('graph_precision', 'Precision')
->Set('graph_pointsprminute', 'Points per minute')
->Set('graph_pointsprtact', 'Points per tact')
->Set('favourites', 'Favourites')
->Set('view_all', 'View all')
->Set('title', 'Title')
->Set('played', 'Played')
->Set('avg_pts', 'Avg. points')
->Set('times', 'Times')
->Set('time', 'Time')
->Set('play_time', 'Duration')
->Set('plays', 'Plays')
->Set('summery', 'Summery')
->Set('this_game', 'This game')
->Set('average_games', 'Average')

# Genres
->SetMenu('genre_')
->Set('game', 'Game music')
->Set('jazz', 'Jazz')
->Set('classic', 'Classic')
->Set('pop', 'Pop')
->Set('birthday', 'Birthday')
->Set('christmas', 'Christmas')
->Set('movie', 'Movie')
->Set('danish', 'Danish')
->Set('children', 'Children')
->Set('rock', 'Rock')
->Set('wedding', 'Wedding')
;
?>
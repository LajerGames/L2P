<?php
class browse
{
	public $oSql;

	public function __construct(MySQLWrapper $oSql)
	{
		$this->oSql	= $oSql;

		return;
	}

	public function RenderMusic($strType, $strSearch = '', $iAmt = 100, $strSubMode = '')
	{
		global	$oTemplate,
				$oLang;

		$rMusic		= GetMusic($this->oSql, $strType, $iAmt, $strSearch);
		$strMusic	= '';

		if($strType === 'music')
		{
			while($oMusic = $this->oSql->FetchObject($rMusic, false))
			{
				$arrOctave	= explode(',', $oMusic->octave);

				foreach($arrOctave as $iOctave)
				{
					$oMusicOctave			= clone $oMusic;
					$oMusicOctave->octave	= $iOctave;

					$strMusic	.= $oTemplate->RenderContent('
						<a class="browse-item" href="/game/{{permlink}}/{{octave}}" data-dialog="game" title="{{info}}" data-title="{{title}}">
							<span class="browse-item-octave">('.$oLang->Get('global_octave').' {{octave}})</span> <span class="browse-item-title">{{title}}</span>
							<img src="'.HTTP_PROJECT_ROOT_IMG.'icons/plus_black.svg" class="browse-item-add" data-action="add-to-playlist" alt="'.$oLang->Get('frontpage_add_to_playlist').'" title="'.$oLang->Get('frontpage_add_to_playlist').'" />
						</a>
					', $oMusicOctave);
				}
			}
		}
		else
		{
			$arrPosition1	= array();
			$arrPosition2	= array();
			$arrPosition3	= array();

			while($oMusic = $this->oSql->FetchObject($rMusic, false))
			{
				$arrOctave	= explode(',', $oMusic->octave);

				foreach($arrOctave as $iOctave)
				{
					$oMusicOctave			= clone $oMusic;
					$oMusicOctave->octave	= $iOctave;

					$arrPosition1[]	= $oTemplate->RenderContent('
						<a class="browse-item" href="/game/{{permlink}}/{{octave}}/1" data-dialog="game" title="{{info}}" data-title="{{title}}">
							<span class="browse-item-octave">('.$oLang->Get('global_octave').' {{octave}})</span> <span class="browse-item-title">{{title}}</span>
							<img src="'.HTTP_PROJECT_ROOT_IMG.'icons/plus_black.svg" class="browse-item-add" data-action="add-to-playlist" alt="'.$oLang->Get('frontpage_add_to_playlist').'" title="'.$oLang->Get('frontpage_add_to_playlist').'" />
						</a>
					', $oMusicOctave);

					if($iOctave == 3 && in_array($oMusic->start_tone, array('G', 'G#', 'A')))
					{}
					else
					{
						$arrPosition2[]	= $oTemplate->RenderContent('
							<a class="browse-item" href="/game/{{permlink}}/{{octave}}/2" data-dialog="game" title="{{info}}" data-title="{{title}}">
								<span class="browse-item-octave">('.$oLang->Get('global_octave').' {{octave}})</span> <span class="browse-item-title">{{title}}</span>
								<img src="'.HTTP_PROJECT_ROOT_IMG.'icons/plus_black.svg" class="browse-item-add" data-action="add-to-playlist" alt="'.$oLang->Get('frontpage_add_to_playlist').'" title="'.$oLang->Get('frontpage_add_to_playlist').'" />
							</a>
						', $oMusicOctave);
					}

					if($iOctave == 3 && in_array($oMusic->start_tone, array('G', 'G#', 'A', 'Bb', 'B')))
					{}
					else
					{
						$arrPosition3[]	= $oTemplate->RenderContent('
							<a class="browse-item" href="/game/{{permlink}}/{{octave}}/3" data-dialog="game" title="{{info}}" data-title="{{title}}">
								<span class="browse-item-octave">('.$oLang->Get('global_octave').' {{octave}})</span> <span class="browse-item-title">{{title}}</span>
								<img src="'.HTTP_PROJECT_ROOT_IMG.'icons/plus_black.svg" class="browse-item-add" data-action="add-to-playlist" alt="'.$oLang->Get('frontpage_add_to_playlist').'" title="'.$oLang->Get('frontpage_add_to_playlist').'" />
							</a>
						', $oMusicOctave);
					}
				}
			}

            $arrKeys = array(
                'c_major'           => $oLang->Get('game_key_c_major'),
                'a_minor'           => $oLang->Get('game_key_a_minor'),
                'g_major'           => $oLang->Get('game_key_g_major'),
                'e_minor'           => $oLang->Get('game_key_e_minor'),
                'd_major'           => $oLang->Get('game_key_d_major'),
                'b_minor'           => $oLang->Get('game_key_b_minor'),
                'a_major'           => $oLang->Get('game_key_a_major'),
                'f_sharp_minor'     => $oLang->Get('game_key_f_sharp_minor'),
                'e_major'           => $oLang->Get('game_key_e_major'),
                'c_sharp_minor'     => $oLang->Get('game_key_c_sharp_minor'),
                'b_major'           => $oLang->Get('game_key_b_major'),
                'g_sharp_minor'     => $oLang->Get('game_key_g_sharp_minor'),
                'f_sharp_major'     => $oLang->Get('game_key_f_sharp_major'),
                'd_sharp_minor'     => $oLang->Get('game_key_d_sharp_minor'),
                'g_flat_major'      => $oLang->Get('game_key_g_flat_major'),
                'e_flat_minor'      => $oLang->Get('game_key_e_flat_minor'),
                'd_flat_major'      => $oLang->Get('game_key_d_flat_major'),
                'b_flat_minor'      => $oLang->Get('game_key_b_flat_minor'),
                'a_flat_major'      => $oLang->Get('game_key_a_flat_major'),
                'f_minor'           => $oLang->Get('game_key_f_minor'),
                'e_flat_major'      => $oLang->Get('game_key_e_flat_major'),
                'c_minor'           => $oLang->Get('game_key_c_minor'),
                'b_flat_major'      => $oLang->Get('game_key_b_flat_major'),
                'g_minor'           => $oLang->Get('game_key_g_minor'),
                'f_major'           => $oLang->Get('game_key_f_major'),
                'd_minor'           => $oLang->Get('game_key_d_minor')
            );

            //printr(GetMusicKeys($oLang));

			$oPrimaVistaForm	= new Form('prima_vista', '/game/action/generate-game/', true);
			$oPrimaVistaForm->SelectBox('difficulty', SongGenerator::Difficulty_Easy, array(
                SongGenerator::Difficulty_Easy        => $oLang->Get('browse_song_generator_difficulty_easy'),
                SongGenerator::Difficulty_Medium    => $oLang->Get('browse_song_generator_difficulty_medium'),
                SongGenerator::Difficulty_Hard        => $oLang->Get('browse_song_generator_difficulty_hard')
            ), $oLang->Get('browse_song_generator_difficulty'));
			$oPrimaVistaForm->SelectBox('speed', SongGenerator::Speed_Slow, array(
				SongGenerator::Speed_Slow	=> $oLang->Get('browse_song_generator_speed_slow'),
				SongGenerator::Speed_Medium	=> $oLang->Get('browse_song_generator_speed_medium'),
				SongGenerator::Speed_Fast	=> $oLang->Get('browse_song_generator_speed_fast')
			), $oLang->Get('browse_song_generator_speed'));
			$oPrimaVistaForm->SelectBox('pulse', SongGenerator::Pulse_FourFourths, array(
				SongGenerator::Pulse_TwoFourths		=> SongGenerator::Pulse_TwoFourths,
				SongGenerator::Pulse_ThreeFourths	=> SongGenerator::Pulse_ThreeFourths,
				SongGenerator::Pulse_FourFourths	=> SongGenerator::Pulse_FourFourths,
				SongGenerator::Pulse_FiveFourths	=> SongGenerator::Pulse_FiveFourths,
				SongGenerator::Pulse_SixFourths		=> SongGenerator::Pulse_SixFourths
			), $oLang->Get('browse_song_generator_pulse'));
            $oPrimaVistaForm->SelectBox('duration', SongGenerator::Duration_Short, array(
                SongGenerator::Duration_Short    => $oLang->Get('browse_song_generator_duration_short'),
                SongGenerator::Duration_Medium    => $oLang->Get('browse_song_generator_duration_medium'),
                SongGenerator::Duration_Long    => $oLang->Get('browse_song_generator_duration_long')
            ), $oLang->Get('browse_song_generator_duration'));
            $oPrimaVistaForm->SelectBox('lowest_note', 'G', GetNoteNamesArray(), $oLang->Get('browse_song_generator_note_lowest'));
            $oPrimaVistaForm->SelectBox('lowest_octave', '3', GetOctavesArray(), $oLang->Get('browse_song_generator_octave_lowest'));
            $oPrimaVistaForm->SelectBox('highest_note', 'B', GetNoteNamesArray(), $oLang->Get('browse_song_generator_note_highest'));
            $oPrimaVistaForm->SelectBox('highest_octave', '5', GetOctavesArray(), $oLang->Get('browse_song_generator_octave_highest'));
            $oPrimaVistaForm->SelectBox('key', 'c_major', $arrKeys, $oLang->Get('browse_song_generator_key'));

			$strMusic	= '
				<div class="browse-submode'.($strSubMode === 'position1' ? ' browse-submode--focus' : '').'" data-submode="position1">
					<div class="browse-submode-title">Skalaer Position 1</div>
					<div class="browse-submode-content"><div class="browse-submode-content-inner">'.implode('', $arrPosition1).'</div></div>
				</div>
				<div class="browse-submode'.($strSubMode === 'position2' ? ' browse-submode--focus' : '').'" data-submode="position2">
					<div class="browse-submode-title">Skalaer Position 2</div>
					<div class="browse-submode-content"><div class="browse-submode-content-inner">'.implode('', $arrPosition2).'</div></div>
				</div>
				<div class="browse-submode'.($strSubMode === 'position3' ? ' browse-submode--focus' : '').'" data-submode="position3">
					<div class="browse-submode-title">Skalaer Position 3</div>
					<div class="browse-submode-content"><div class="browse-submode-content-inner">'.implode('', $arrPosition3).'</div></div>
				</div>
				<div class="browse-submode browse-submode--prima-vista'.($strSubMode === 'primavista' ? ' browse-submode--focus' : '').'" data-submode="primavista">
					<div class="browse-submode-title">Prima Vista</div>
					<div class="browse-submode-content"><div class="browse-submode-content-inner">
						'.$oPrimaVistaForm->RenderFields(true, 'Generate Song', null, 2).'
					</div></div>
				</div>
			';
		}

		return $strMusic;
	}
}
?>

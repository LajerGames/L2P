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

			$oPrimaVistaForm	= new Form('prima_vista', null, true);
			$oPrimaVistaForm->SelectBox('duration', SongGenerator::Duration_Short, array(
				SongGenerator::Duration_Short	=> SongGenerator::Duration_Short,
				SongGenerator::Duration_Medium	=> SongGenerator::Duration_Medium,
				SongGenerator::Duration_Long	=> SongGenerator::Duration_Long
			), 'Duration');
			$oPrimaVistaForm->SelectBox('spped', SongGenerator::Speed_Slow, array(
				SongGenerator::Speed_Slow	=> SongGenerator::Speed_Slow,
				SongGenerator::Speed_Medium	=> SongGenerator::Speed_Medium,
				SongGenerator::Speed_Fast	=> SongGenerator::Speed_Fast
			), 'Speed');
			$oPrimaVistaForm->SelectBox('pulse', SongGenerator::Pulse_FourFourths, array(
				SongGenerator::Pulse_TwoFourths		=> SongGenerator::Pulse_TwoFourths,
				SongGenerator::Pulse_ThreeFourths	=> SongGenerator::Pulse_ThreeFourths,
				SongGenerator::Pulse_FourFourths	=> SongGenerator::Pulse_FourFourths,
				SongGenerator::Pulse_FiveFourths	=> SongGenerator::Pulse_FiveFourths,
				SongGenerator::Pulse_SixFourths		=> SongGenerator::Pulse_SixFourths
			), 'Pulse');
			$oPrimaVistaForm->SelectBox('difficulty', SongGenerator::Difficulty_Easy, array(
				SongGenerator::Difficulty_Easy		=> SongGenerator::Difficulty_Easy,
				SongGenerator::Difficulty_Medium	=> SongGenerator::Difficulty_Medium,
				SongGenerator::Difficulty_Hard		=> SongGenerator::Difficulty_Hard
			), 'Difficulty');

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
						'.$oPrimaVistaForm->RenderFields(true, 'Generate Song', null, true).'
					</div></div>
				</div>
			';
		}

		return $strMusic;
	}
}
?>

define(['jquery', 'game/note', 'game/tact', 'game/options', 'text!templates/info.html', 'text!templates/edit_properties.html'], function ($, Note, Tact, options, dialog, dialogText) {
	var	noteopt	= options.noteOptions;

	function Edit(gameController) {
		this.gameController	= gameController;
		this.game			= this.gameController.game;
		this.octave			= this.game.startOctave;

		this.currentTact	= this.game.tacts[0];
		this.currentNote;
		this.currentInfo	= [
			this.octave,
			'A'
		];

		this.gameController.edit		= this;
		this.gameController.isEdit		= true;
		this.gameController.playSound	= true;
		this.$dialog					= $(dialog).addClass('modal-edit');
		this.$dialog.find('.modal-header').css('background-color', '#B73535').find('h2').text('Properties');
		this.$dialog.find('.modal-header').find('img').remove();
		this.$dialog.find('.modal-body').html(dialogText);
		this.$dialog.find('.modal-footer').remove();
		this.$dialog.on('hide.bs.modal', $.proxy(this.propertiesSave, this));

		this.setFocus(this.currentTact.nodes[0]);
		this.gameController.moveToTact(0);

		this.proxyOnKeyDown	= $.proxy(this.onKeyDown, this);

		$(window).on('keydown', this.proxyOnKeyDown);
	}
	Edit.prototype.createNote		= function (type, octave, nodeName, noteOptions) {
		return new Note(options.nodes.types[type], options.tones.names[octave][nodeName], noteOptions);
	};
	Edit.prototype.createRest		= function (type) {
		return new Note(options.nodes.types.rest[type], options.tones.rest);
	};
	Edit.prototype.addTact			= function (notes) {
		var	edit	= this,
			tact	= new Tact(options.tacts.types.quarter);
		notes.forEach(function (note) {
			tact.addNode(note);
		});
		tact.fill();

		edit.game.addTact(tact);
	};
	Edit.prototype.replaceNote		= function (newNote) {
		var	edit		= this,
			newTact		= new Tact(edit.currentTact.type),
			hasReplaced	= false,
			restNotes	= [],
			resetFocus	= false;

		edit.currentTact.nodes.forEach(function (note, i) {
			var	thisReplace	= false,
				added;
			if(note === edit.currentNote) {
				note		= newNote;
				hasReplaced	= true;
				thisReplace	= true;
			}

			if(!thisReplace && hasReplaced && note.isRest) {
				restNotes.push(note);
			} else {
				if(hasReplaced) {
					restNotes.forEach(function (note) {
						newTact.addNode(note);
					});
					restNotes	= [];
				}
				added	= newTact.addNode(note);
			}

			if(thisReplace && !added) {
				resetFocus	= true;
			}
		});

		newTact.fill();
		newTact.setKeys(edit.game.sharps, edit.game.flats);

		edit.game.tacts.splice(edit.game.tacts.indexOf(edit.currentTact), 1, newTact);

		newNote.setThisFocus();
		edit.currentNote	= newNote;
		edit.currentTact	= newTact;

		if(!edit.currentNote.isRest) {
			edit.currentInfo	= [edit.currentNote.orgTone.octav, edit.currentNote.orgTone.name];
		}

		if(resetFocus) {
			edit.setFocus(edit.currentTact.nodes[edit.currentTact.nodes.length - 1]);
		}

		edit.gameController.initView(true);
	};
	Edit.prototype.updateNote		= function (relPos) {
		var	edit	= this,
			toneI	= options.tones.all.indexOf(edit.currentNote.orgTone),
			newTone	= options.tones.all[toneI - relPos],
			newNote	= edit.createNote(edit.currentNote.type.name, newTone.octav, newTone.name, edit.currentNote.options);

		edit.replaceNote(newNote);
	};
	Edit.prototype.updateNoteSize	= function (bigger) {
		var	edit			= this,
			noteI			= edit.currentTact.nodes.indexOf(edit.currentNote),
			newTact			= new Tact(edit.currentTact.type),
			newNote,
			types			= [
				'whole',
				'halfPeriod',
				'half',
				'quarterPeriod',
				'quarter',
				'eighthPeriod',
				'eighth',
				//'sixteenthPeriod',
				'sixteenth'
			],
			typesRest		= [
				'restQuarter',
				'restEighth',
				'restSixteenth'
			],
			typesRestConverted	= [
				'quarter',
				'eighth',
				'sixteenth'
			],
			currentTypeI	= edit.currentNote.isRest ? typesRest.indexOf(edit.currentNote.type.name) : types.indexOf(edit.currentNote.type.name),
			lastNote		= true;

		if(bigger) {
			if(currentTypeI > 0) {
				if(edit.currentNote.isRest) {
					newNote	= edit.createRest(typesRestConverted[currentTypeI - 1]);
				} else {
					newNote	= edit.createNote(types[currentTypeI - 1], edit.currentNote.orgTone.octav, edit.currentNote.orgTone.name, edit.currentNote.options);
				}
			}
		} else {
			if(edit.currentNote.isRest) {
				if(currentTypeI < (typesRest.length - 1)) {
					newNote	= edit.createRest(typesRestConverted[currentTypeI + 1]);
				}
			} else {
				if(currentTypeI < (types.length - 1)) {
					newNote	= edit.createNote(types[currentTypeI + 1], edit.currentNote.orgTone.octav, edit.currentNote.orgTone.name, edit.currentNote.options);
				}
			}
		}

		if(newNote) {
			edit.replaceNote(newNote);
		}
	};
	Edit.prototype.setRest			= function () {
		var	edit	= this,
			name;

		if(!edit.currentNote.isRest) {
			edit.replaceNote(edit.createRest(edit.currentNote.type.name));
		} else {
			name	= edit.currentNote.type.name.substr(4).split('').map(function (s, i) {
				if(i === 0) {
					s	= s.toLowerCase();
				}
				return s;
			}).join('');
			edit.replaceNote(edit.createNote(name, edit.currentInfo[0], edit.currentInfo[1]));
		}
	};
	Edit.prototype.setFocus			= function (note) {
		var	edit	= this;

		if(edit.currentNote) {
			edit.currentNote.unsetThisFocus();
		}
		note.setThisFocus();
		edit.currentNote	= note;

		if(!note.isRest) {
			edit.currentInfo	= [note.orgTone.octav, note.orgTone.name];
		}
	};
	Edit.prototype.moveFocus		= function (right, toTact) {
		var	edit	= this,
			noteI	= toTact ? (right ? edit.currentTact.nodes.length - 1 : 0) : edit.currentTact.nodes.indexOf(edit.currentNote),
			tactI,
			focusNote,
			tactUpdate	= false,
			reloadView	= false;

		if(right) {
			if(noteI >= (edit.currentTact.nodes.length - 1)) {
				tactI	= edit.game.tacts.indexOf(edit.currentTact);
				if(tactI >= (edit.game.tacts.length - 1)) {
					edit.addTact([]);
					reloadView	= true;
				}
				edit.currentTact	= edit.game.tacts[tactI + 1];
				tactUpdate	= true;

				noteI		= -1;
			}
			focusNote	= edit.currentTact.nodes[noteI + 1];
		} else {
			if(noteI === 0) {
				tactI	= edit.game.tacts.indexOf(edit.currentTact);
				if(tactI > 0) {
					edit.currentTact	= edit.game.tacts[tactI - 1];
					tactUpdate	= true;
					noteI		= toTact ? 1 : edit.currentTact.nodes.length;
				}
			}
			focusNote	= edit.currentTact.nodes[noteI - 1];
		}

		if(focusNote) {
			edit.setFocus(focusNote);
		}
		if(reloadView) {
			edit.gameController.initView(true);
		}
		if(tactUpdate) {
			edit.gameController.moveToTact(edit.currentTact);
		}
	};
	Edit.prototype.toggle			= function (id) {
		var	edit	= this;

		if(!edit.currentNote.isRest) {
			edit.currentNote.toggle(id);

			if(id === noteopt.removekey) {
				edit.currentTact.setKeys(edit.game.sharps, edit.game.flats);
			}

			edit.gameController.initView(true);
		}
	};
	Edit.prototype.setSharp			= function () {
		var	edit	= this;

		if(!edit.currentNote.isRest) {
			var	toneName	= edit.currentNote.orgTone.name.substr(0, 1);

			edit.game.setSharp(toneName, 'toggle');

			edit.game.tacts.forEach(function (tact) {
				tact.setKeys(edit.game.sharps, edit.game.flats);
			});

			edit.gameController.initView(true);
		}
	};
	Edit.prototype.setFlat			= function () {
		var	edit	= this;

		if(!edit.currentNote.isRest) {
			var	toneName	= edit.currentNote.orgTone.name.substr(0, 1);

			edit.game.setFlat(toneName, 'toggle');

			edit.game.tacts.forEach(function (tact) {
				tact.setKeys(edit.game.sharps, edit.game.flats);
			});

			edit.gameController.initView(true);
		}
	};
	Edit.prototype.toggleProperties	= function () {
		var	edit	= this,
			optName,
			$elem;

		if(this.$dialog.is(':visible')) {
			edit.$dialog.modal('hide');
		} else {
			for(optName in noteopt) {
				$elem	= edit.$dialog.find('[name="'+optName+'"]');
				if($elem.length > 0) {
					$elem[0].checked	= edit.currentNote.is(noteopt[optName]);
				}
			}
			edit.$dialog.modal('show');
		}
	};
	Edit.prototype.propertiesSave	= function () {
		var	edit	= this,
			changed	= false;

		for(optName in noteopt) {
			$elem	= edit.$dialog.find('[name="'+optName+'"]');
			if($elem.length > 0) {
				if($elem[0].checked) {
					if(edit.currentNote.add(noteopt[optName])) {
						changed	= true;
					}
				} else {
					if(edit.currentNote.rm(noteopt[optName])) {
						changed	= true;
					}
				}
			}
		}

		if(changed) {
			edit.gameController.initView(true);
		}
	};
	Edit.prototype.onKeyDown		= function (e) {
		var	edit		= this,
			dialogOpen	= this.$dialog.is(':visible');

		if(!dialogOpen || e.which === 32 || (e.which === 82 && e.ctrlKey)) {
			switch(e.which) {
			case 32:	// Space
				e.preventDefault();
				edit.toggleProperties();
				break;
			case 35:	// End
				e.preventDefault();
				edit.currentTact	= edit.gameController.game.tacts[edit.gameController.game.tacts.length - 1];
				edit.gameController.moveToTact(edit.currentTact);
				edit.setFocus(edit.currentTact.nodes[edit.currentTact.nodes.length - 1]);
				break;
			case 36:	// Home
				e.preventDefault();
				edit.currentTact	= edit.gameController.game.tacts[0];
				edit.gameController.moveToTact(edit.currentTact);
				edit.setFocus(edit.currentTact.nodes[0]);
				break;
			case 37:	// ArrowLeft
				e.preventDefault();
				edit.moveFocus(false, e.ctrlKey);
				break;
			case 38:	// ArrowUp
				e.preventDefault();
				edit.updateNote(-1);
				break;
			case 39:	// ArrowRight
				e.preventDefault();
				edit.moveFocus(true, e.ctrlKey);
				break;
			case 40:	// ArrowDown
				e.preventDefault();
				edit.updateNote(1);
				break;
			case 107:	// NumPad+
			case 187:	// +
				e.preventDefault();
				edit.updateNoteSize(true);
				break;
			case 109:	// NumPad-
			case 189:	// -
				e.preventDefault();
				edit.updateNoteSize(false);
				break;
			case 69:	// e
				e.preventDefault();
				edit.toggle(noteopt.removekey);
				break;
			case 70:	// f
				e.preventDefault();
				edit.setFlat();
				break;
			case 74:	// j
				e.preventDefault();
				edit.toggle(noteopt.join);
				break;
			case 76:	// l
				e.preventDefault();
				if(e.altKey) {
					edit.toggle(noteopt.slurend);
				} else {
					edit.toggle(noteopt.slurstart);
				}
				break;
			case 82:	// r
				if(!e.ctrlKey) {
					e.preventDefault();
					edit.setRest();
				}
				break;
			case 83:	// s
				e.preventDefault();
				edit.setSharp();
				break;
			case 88:	// x
				e.preventDefault();

				require(['fM'], function (fM) {
					$(window).off('keydown', edit.proxyOnKeyDown);
					fM.link.navigate('/game/'+edit.gameController.permlink+'/save/', 'Magic Tune', {
						title:	'Magic Tune',
						data:	{
							data:	JSON.stringify(edit.gameController.exportGame())
						}
					});
				});
				break;
			default:
				console.log(e.which);
				break;
			}
		}
	};

	return Edit;
});
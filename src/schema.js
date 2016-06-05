var Schema = {
  member: {
    id: {type: 'increments', nullable: false, primary: true},
    email: {type: 'string', maxlength: 254, nullable: false, unique: true},
    name: {type: 'string', maxlength: 150, nullable: false}
  },
  league: {
    id: {type: 'increments', nullable: false, primary: true},
    name: {type: 'string', maxlength: 150, nullable: false}
  },
  draft: {
    id: {type: 'increments', nullable: false, primary: true},
    league_id: {type: 'integer', nullable: false, unsigned: true},
    date: {type: 'dateTime', nullable: false},
    location: {type: 'string', maxlength: 150, nullable: false}
  },
  draftpick: {
    id: {type: 'increments', nullable: false, primary: true},
    league_id: {type: 'integer', nullable: false, unsigned: true},
    draft_id: {type: 'integer', nullable: false, unsigned: true},
    player_id: {type: 'string', nullable: false},
    date: {type: 'dateTime', nullable: false},
    location: {type: 'string', maxlength: 150, nullable: false}
  },
  player: {
    player_id: {type: 'string', maxlength: 10, nullable: false},
    gsis_name: {type: 'string', maxlength: 150, nullable: false},
    full_name: {type: 'string', maxlength: 150, nullable: false},
    first_name: {type: 'string', maxlength: 150, nullable: false},
    last_name: {type: 'string', maxlength: 150, nullable: false},
    team: {type: 'string', maxlength: 150, nullable: false},
    position: {type: 'string', maxlength: 150, nullable: false}
  },
}

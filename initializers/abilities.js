import { Ability } from '../base/Ability.js';
import { SpriteBase } from '../base/SpriteBase.js';

export let abilities_list = {};

export function initialize_abilities(game, abilities_db, misc_animations_db, load_promise_resolve) {
    let load_promises = []
    for (let i = 0; i < abilities_db.length; ++i) {
        const ability_data = abilities_db[i];
        abilities_list[ability_data.key_name] = new Ability(
            ability_data.key_name,
            ability_data.name,
            ability_data.description,
            ability_data.type,
            ability_data.element,
            ability_data.battle_target,
            ability_data.range,
            ability_data.pp_cost,
            ability_data.ability_power,
            ability_data.effects_outside_battle,
            ability_data.is_battle_ability,
            ability_data.is_field_psynergy,
            ability_data.effects,
            ability_data.ability_category,
            ability_data.battle_animation_key,
            ability_data.priority_move,
            ability_data.has_critical,
            ability_data.crit_mult_factor,
            ability_data.can_switch_to_unleash,
            ability_data.can_be_evaded,
            ability_data.use_diminishing_ratio,
            ability_data.msg_type,
            ability_data.affects_pp,
            ability_data.has_animation_variation
        );
        const import_keys = ["move_hand"];
        for(let i=0; i<import_keys.length; i++){
            const db_data = misc_animations_db[import_keys[i]];
            const sprite_base = new SpriteBase(db_data.key_name, [db_data.actions.animations]);
            for(let n=0; n<db_data.actions.animations.length; n++){
                sprite_base.setActionSpritesheet(
                    db_data.actions.animations[n],
                    db_data.spritesheet.image,
                    db_data.spritesheet.json
                );
                sprite_base.setActionDirections(
                    db_data.actions.animations[n],
                    db_data.actions.directions,
                    db_data.frames_count
                );
                sprite_base.setActionFrameRate(db_data.actions.animations[n], db_data.frame_rate);
            }
            sprite_base.generateAllFrames();

            let load_spritesheet_promise_resolve;
            const load_spritesheet_promise = new Promise(resolve => {
                load_spritesheet_promise_resolve = resolve;
            });
            load_promises.push(load_spritesheet_promise);
            sprite_base.loadSpritesheets(game, true, load_spritesheet_promise_resolve);
        }
    }
    game.load.atlasJSONHash('abilities_icons', 'assets/images/icons/abilities/abilities_icons.png', 'assets/images/icons/abilities/abilities_icons.json');
    Promise.all(load_promises).then(load_promise_resolve);
    game.load.start();
}
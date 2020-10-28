import { initialize_main_chars, initialize_classes } from './main_chars';
import { initialize_abilities, initialize_field_abilities } from './abilities';
import { initialize_items } from './items';
import { initialize_djinni, initialize_djinni_sprites } from './djinni';
import { initialize_enemies } from './enemies';
import { initialize_maps } from './maps';
import { initialize_misc_data } from './misc_data';
import { initialize_shops } from './shops';
import { initialize_interactable_objs_data } from './interactable_objects';

export async function initialize_game_data(game, data) {
    let load_maps_promise_resolve;
    const load_maps_promise = new Promise(resolve => {
        load_maps_promise_resolve = resolve;
    });
    data.info.maps_list = initialize_maps(game, data, data.dbs.maps_db, load_maps_promise_resolve);
    await load_maps_promise;

    data.info.classes_list = initialize_classes(data.dbs.classes_db);

    let load_enemies_sprites_promise_resolve;
    const load_enemies_sprites_promise = new Promise(resolve => {
        load_enemies_sprites_promise_resolve = resolve;
    });
    data.info.enemies_list = initialize_enemies(game, data.dbs.enemies_db, load_enemies_sprites_promise_resolve);
    await load_enemies_sprites_promise;

    data.info.djinni_list = initialize_djinni(data.dbs.djinni_db);

    let load_djinni_sprites_promise_resolve;
    const load_djinni_sprites_promise = new Promise(resolve => {
        load_djinni_sprites_promise_resolve = resolve;
    });
    data.info.djinni_sprites = initialize_djinni_sprites(game, load_djinni_sprites_promise_resolve);
    await load_djinni_sprites_promise;
    
    let load_abilities_promise_resolve;
    const load_abilities_promise = new Promise(resolve => {
        load_abilities_promise_resolve = resolve;
    });
    data.info.abilities_list = initialize_abilities(game, data.dbs.abilities_db, load_abilities_promise_resolve);
    await load_abilities_promise;
    
    let load_items_promise_resolve;
    const load_items_promise = new Promise(resolve => {
        load_items_promise_resolve = resolve;
    });
    data.info.items_list = initialize_items(game, data.dbs.items_db, load_items_promise_resolve);
    await load_items_promise;

    data.info.party_data = {
        members: [],
        coins: data.dbs.init_db.coins,
        game_tickets: {coins_remaining: 300, tickets_bought: 0}
    };

    let load_chars_promise_resolve;
    const load_chars_promise = new Promise(resolve => {
        load_chars_promise_resolve = resolve;
    });
    data.info.main_char_list = initialize_main_chars(game, data.info, data.dbs.main_chars_db, data.dbs.classes_db, load_chars_promise_resolve);
    await load_chars_promise;

    let load_misc_promise_resolve;
    const load_misc_promise = new Promise(resolve => {
        load_misc_promise_resolve = resolve;
    });
    data.info.misc_sprite_base_list = initialize_misc_data(game, data.dbs.misc_animations_db, load_misc_promise_resolve);
    await load_misc_promise;

    let load_iter_objs_promise_resolve;
    const load_iter_objs_promise = new Promise(resolve => {
        load_iter_objs_promise_resolve = resolve;
    });
    data.info.iter_objs_sprite_base_list = initialize_interactable_objs_data(game, data.dbs.interactable_objects_db, load_iter_objs_promise_resolve);
    await load_iter_objs_promise;

    data.info.shops_list = initialize_shops(data.dbs.shops_db);

    data.info.field_abilities_list = initialize_field_abilities(game, data);
}
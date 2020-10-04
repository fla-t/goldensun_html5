import { ItemCounter } from '../../utils/ItemsCounter.js';
import { Window } from '../../Window.js';

const QUANTITY_WIN_X = 56;
const QUANTITY_WIN_Y = 32;
const QUANTITY_WIN_WIDTH = 180;
const QUANTITY_WIN_HEIGHT = 20;

const ITEM_COUNTER_X = 8;
const ITEM_COUNTER_Y = 8;

const QUANTITY_TEXT_END_X = 93;
const QUANTITY_TEXT_Y = 8;

const COINS_VALUE_END_X = 141;
const COINS_VALUE_Y = 8;

const COINS_LABEL_X = 144;
const COINS_LABEL_Y = 8;

const CURSOR_X = 132;
const CURSOR_Y = 46;

export class ShopItemQuantityWindow {
    constructor(game, data, cursor_manager) {
        this.game = game;
        this.data = data;
        this.cursor_manager = cursor_manager;
        this.close_callback = null;

        this.window = new Window(this.game, QUANTITY_WIN_X, QUANTITY_WIN_Y, QUANTITY_WIN_WIDTH, QUANTITY_WIN_HEIGHT);
        this.item_counter = new ItemCounter(this.game, this.window.group, ITEM_COUNTER_X, ITEM_COUNTER_Y, this.on_change.bind(this));

        this.choosen_quantity = 1;
        this.coins = 0;

        this.quantity_text = this.window.set_text_in_position(String(this.choosen_quantity), QUANTITY_TEXT_END_X, QUANTITY_TEXT_Y, true);
        this.coins_val_text = this.window.set_text_in_position("", COINS_VALUE_END_X, COINS_VALUE_Y, true);
        this.coins_label_text = this.window.set_text_in_position("Coins", COINS_LABEL_X, COINS_LABEL_Y);

    }

    on_change(quantity) {
        this.choosen_quantity = quantity;
        this.window.update_text(String(this.choosen_quantity), this.quantity_text);
    }

    open(item_obj, close_callback, open_callback){
        this.cursor_manager.move_to(CURSOR_X, CURSOR_Y, "wiggle");

        this.coins = this.data.info.party_data.coins;
        this.window.update_text(String(this.coins), this.coins_val_text);

        let quantity = (item_obj.quantity === -1 ? 30 : item_obj.quantity);
        this.item_counter.config(quantity, this.choosen_quantity);

        this.close_callback = close_callback;
        this.window.show(open_callback, false);

    }

    close(){
        this.item_counter.deactivate();
        this.cursor_manager.clear_tweens();

        this.choosen_quantity = 1;
        this.coins = 0;

        this.window.close(this.close_callback, false);
        this.close_callback = null;
    }
}

import Vue from 'vue';
import {Button} from '../components/common/Button';
import {CardOrderStorage} from './CardOrderStorage';
import {PlayerModel} from '../models/PlayerModel';
import {VueModelCheckbox, VueModelRadio} from './VueTypes';

interface SelectCardModel {
    cards: VueModelRadio<CardModel> | VueModelCheckbox<Array<CardModel>>;
}

import {Card} from './card/Card';
import {CardModel} from '../models/CardModel';
import {PlayerInputModel} from '../models/PlayerInputModel';

export const SelectCard = Vue.component('select-card', {
  props: {
    player: {
      type: Object as () => PlayerModel,
    },
    playerinput: {
      type: Object as () => PlayerInputModel,
    },
    onsave: {
      type: Function as unknown as () => (out: Array<Array<string>>) => void,
    },
    showsave: {
      type: Boolean,
    },
    showtitle: {
      type: Boolean,
    },
  },
  data: function() {
    return {
      cards: [],
    } as SelectCardModel;
  },
  components: {
    Card,
    Button,
  },
  methods: {
    getOrderedCards: function() {
      if (this.playerinput.cards === undefined) {
        return [];
      }
      return CardOrderStorage.getOrdered(
        CardOrderStorage.getCardOrder(this.player.id),
        this.playerinput.cards,
      );
    },
    saveData: function() {
      this.onsave([Array.isArray(this.$data.cards) ? this.$data.cards.map((card) => card.name) : [this.$data.cards.name]]);
    },
  },
  template: `<div class="wf-component wf-component--select-card">
        <div v-if="showtitle === true" class="nofloat wf-component-title" v-i18n>{{playerinput.title}}</div>
        <label v-for="card in getOrderedCards()" class="cardbox">
            <input v-if="playerinput.maxCardsToSelect === 1 && playerinput.minCardsToSelect === 1" type="radio" v-model="cards" :value="card" />
            <input v-else type="checkbox" v-model="cards" :value="card" :disabled="playerinput.maxCardsToSelect !== undefined && Array.isArray(cards) && cards.length >= playerinput.maxCardsToSelect && cards.indexOf(card) === -1" />
            <Card :card="card" />
        </label>
        <div v-if="showsave === true" class="nofloat">
            <Button type="submit" :onClick="saveData" :title="playerinput.buttonLabel" />
        </div>
    </div>`,
});


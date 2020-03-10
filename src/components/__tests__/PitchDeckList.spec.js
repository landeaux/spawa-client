import { createLocalVue, shallowMount } from '@vue/test-utils';
import PitchDeckList from '@/components/PitchDeckList';
import PitchDeckListItem from '@/components/PitchDeckListItem';
import { BIcon } from 'bootstrap-vue';

const localVue = createLocalVue();

localVue.component('b-icon', BIcon);

describe('PitchDeckList.vue', () => {
  it('should render an item with data for each item in items', () => {
    const items = [
      {
        businessName: 'Burger King',
        dateSubmitted: new Date(),
        userHasReviewed: false,
        reviewCount: 0,
      },
      {
        businessName: 'McDonald\'s',
        dateSubmitted: new Date('02/28/2020'),
        userHasReviewed: true,
        reviewCount: 1,
      },
      {
        businessName: 'Wendy\'s',
        dateSubmitted: new Date('09/09/2009'),
        userHasReviewed: true,
        reviewCount: 4,
      },
    ];

    const wrapper = shallowMount(PitchDeckList, {
      propsData: { items },
      localVue,
    });

    const pitchDecks = wrapper.findAll(PitchDeckListItem);
    expect(pitchDecks).toHaveLength(items.length);

    pitchDecks.wrappers.forEach((w, i) => {
      expect(w.props()).toStrictEqual(items[i]);
    });
  });
});

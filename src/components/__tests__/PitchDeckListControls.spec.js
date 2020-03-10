import { createLocalVue, shallowMount } from '@vue/test-utils';
import PitchDeckListControls from '@/components/PitchDeckListControls';
import BootstrapVue, { BDropdown } from 'bootstrap-vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe('PitchDeckList.vue', () => {
  it('should have dropdowns for sorting and filtering', () => {
    const wrapper = shallowMount(PitchDeckListControls, {
      localVue,
    });
    const dropdowns = wrapper.findAll(BDropdown);
    expect(dropdowns).toHaveLength(2);
    ['filter', 'sort'].forEach((label) => {
      expect(dropdowns.filter((d) => {
        return d.props().text.toLowerCase().includes(label);
      })).toHaveLength(1);
    });
  });

  // it('should render an option for each option in sortOptions', () => {
  //   expect(true).toBe(false);
  // });

  // it('should render an option for each option in filterOptions', () => {
  //   expect(true).toBe(false);
  // });

  it('should render the total number of pitch decks', () => {
    const pitchDeckCount = 100;
    const wrapper = shallowMount(PitchDeckListControls, {
      propsData: {
        pitchDeckCount,
      },
      localVue,
    });
    expect(wrapper.find('.pitch-deck-count').text()).toContain(pitchDeckCount);
  });

  it('should render the total number of unreviewed pitch decks', () => {
    const unreviewedCount = 7;
    const wrapper = shallowMount(PitchDeckListControls, {
      propsData: {
        unreviewedCount,
      },
      localVue,
    });
    expect(wrapper.find('.unreviewed-count').text()).toContain(unreviewedCount);
  });
});

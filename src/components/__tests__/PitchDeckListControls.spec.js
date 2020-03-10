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
  });
});

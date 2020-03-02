import { shallowMount } from '@vue/test-utils';
import PitchDeckListItem from '@/components/PitchDeckListItem';

describe('PitchDeckListItem.vue', function () {
  it('should display the business name', function () {
    const businessName = 'Krispy Kreme';
    const wrapper = shallowMount(PitchDeckListItem, {
      propsData: { businessName },
    });
    expect(wrapper.text()).toContain(businessName);
  });
});

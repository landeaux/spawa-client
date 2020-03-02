import { shallowMount } from '@vue/test-utils';
import PitchDeckListItem from '@/components/PitchDeckListItem';

describe('PitchDeckListItem.vue', function () {
  const item = {
    businessName: 'Krispy Kreme',
    dateSubmitted: new Date(),
  };

  const wrapper = shallowMount(PitchDeckListItem, {
    propsData: { ...item },
  });

  it('should display the business name', () => {
    expect(wrapper.text()).toContain(item.businessName);
  });

  it('should display the date submitted', () => {
    expect(wrapper.text()).toContain(item.dateSubmitted.toDateString());
  });
});

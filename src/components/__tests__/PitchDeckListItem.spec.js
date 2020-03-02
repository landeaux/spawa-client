import { createLocalVue, shallowMount } from '@vue/test-utils';
import PitchDeckListItem from '@/components/PitchDeckListItem';
import { BIcon } from 'bootstrap-vue';

const localVue = createLocalVue();

localVue.component('b-icon', BIcon);

describe('PitchDeckListItem.vue', function () {
  it('should display the business name', () => {
    const item = {
      businessName: 'Krispy Kreme',
      dateSubmitted: new Date(),
      userHasReviewed: true,
    };

    const wrapper = shallowMount(PitchDeckListItem, {
      propsData: { ...item },
      localVue,
    });

    expect(wrapper.text()).toContain(item.businessName);
  });

  it('should display the date submitted', () => {
    const item = {
      businessName: '',
      dateSubmitted: new Date(),
      userHasReviewed: true,
    };

    const wrapper = shallowMount(PitchDeckListItem, {
      propsData: { ...item },
      localVue,
    });

    expect(wrapper.text()).toContain(item.dateSubmitted.toDateString());
  });

  it('should display check icon if user has reviewed it', () => {
    const item = {
      businessName: '',
      dateSubmitted: new Date(),
      userHasReviewed: true,
    };

    const wrapper = shallowMount(PitchDeckListItem, {
      propsData: { ...item },
      localVue,
    });

    const icon = wrapper.find(BIcon);
    expect(icon.attributes().icon).toBe('check-circle');
  });

  it('should display alert icon if user has not reviewed it', () => {
    const item = {
      businessName: '',
      dateSubmitted: new Date(),
      userHasReviewed: false,
    };

    const wrapper = shallowMount(PitchDeckListItem, {
      propsData: { ...item },
      localVue,
    });

    const icon = wrapper.find(BIcon);
    expect(icon.attributes().icon).toBe('alert-circle');
  });

  it('should have a "Review" button for users to click to review the item', () => {
    const item = {
      businessName: '',
      dateSubmitted: new Date(),
      userHasReviewed: false,
    };

    const wrapper = shallowMount(PitchDeckListItem, {
      propsData: { ...item },
      localVue,
    });

    const filteredButtonArray = wrapper
      .findAll('button')
      .filter((w) => w.text().toLowerCase() === 'review');

    expect(filteredButtonArray.length).toBe(1);

    const button = filteredButtonArray[0];
    button.trigger('click');
  });
});

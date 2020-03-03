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
      reviewCount: 0,
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
      reviewCount: 0,
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
      reviewCount: 0,
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
      reviewCount: 0,
    };

    const wrapper = shallowMount(PitchDeckListItem, {
      propsData: { ...item },
      localVue,
    });

    const icon = wrapper.find(BIcon);
    expect(icon.attributes().icon).toBe('alert-circle');
  });

  it('should have a "Review" button that emits review-button-clicked when clicked', () => {
    const item = {
      businessName: '',
      dateSubmitted: new Date(),
      userHasReviewed: false,
      reviewCount: 0,
    };

    const wrapper = shallowMount(PitchDeckListItem, {
      propsData: { ...item },
      localVue,
    });

    const filteredButtonArray = wrapper
      .findAll('button')
      .filter((w) => w.text().toLowerCase() === 'review');

    expect(filteredButtonArray).toHaveLength(1);

    const button = filteredButtonArray.at(0);
    button.trigger('click');
    expect(wrapper.emitted('review-button-clicked')).toHaveLength(1);
  });

  it('should display the number of reviews', function () {
    const item = {
      businessName: '',
      dateSubmitted: new Date(),
      userHasReviewed: false,
      reviewCount: 4,
    };

    const wrapper = shallowMount(PitchDeckListItem, {
      propsData: { ...item },
      localVue,
    });

    expect(wrapper.find('.review-count').text()).toContain(item.reviewCount);
  });
});

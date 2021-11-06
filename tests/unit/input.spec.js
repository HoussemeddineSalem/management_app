import { mount } from '@vue/test-utils'
import AddPerson from '@/components/AddPerson.vue'
import PersonCard from '@/components/AddPerson.vue'

it('testing the input in AddPerson', async () => {
  const wrapper = mount(AddPerson)
  const input = wrapper.find('input')
  await input.setValue('my@mail.com')
  expect(input.element.value).toBe('my@mail.com')
})



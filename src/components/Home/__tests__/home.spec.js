import { mount } from "@vue/test-utils";
import Vue from "vue";
import ElementUI from "element-ui";
import VueVirtualScroller from 'vue-virtual-scroller'

import Home from "../Home.vue";
import {store} from "../../../store";

Vue.use(ElementUI);
Vue.use(VueVirtualScroller)

import { render, fireEvent } from "@testing-library/vue";

describe("Home", () => {

  it("renders home", () => {
    const wrapper = mount(Home, { store });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("check user is rendered", async () => {
    const { findByText, getByText } = render(Home, { store });
    expect(await findByText("Catalina Simpson")).toBeTruthy();
    expect(getByText("Melissa Bishop")).toBeTruthy();
  });

  it("Add Form is commig", async () => {
    const { findByRole, getByRole, queryByRole } = render(Home, { store });
    const addButton = await findByRole("button", {name: "Add New User"});
    expect(addButton).toBeTruthy();

    expect(queryByRole("button", {name: "Create User"})).not.toBeTruthy()
    expect(queryByRole("button", {name: "Cancel"})).not.toBeTruthy()
    await fireEvent.click(addButton)
    expect(getByRole("button", {name: "Create User"})).toBeTruthy()
    expect(getByRole("button", {name: "Cancel"})).toBeTruthy()
  });

  it("check user view page", async () => {
    const { findByRole } = render(Home, { store });
    const view = await findByRole("button", {name : "View Melissa Bishop"})
    expect(view).toBeTruthy();
  });
});

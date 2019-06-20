class Tabs {
  constructor(element) {
    this.element = element;
    this.currentTab = new TabLink(
      this.element.querySelector('.tabs-link-selected'),
      this
    );
    this.element
      .querySelectorAll('.tabs-link')
      .forEach(link => new TabLink(link, this));
  }
}

class TabLink {
  constructor(element, parentTab) {
    // Assign this.element to the passed in DOM element
    this.element = element;
    // Assign the parent tab container to this child
    this.parentTab = parentTab;
    // Get the custom data attribute on the Link
    this.data = element.dataset.tab;
    // Using the custom data attribute get the associated Item element
    this.itemElement = document.querySelector(
      `.tabs-item[data-tab='${this.data}']`
    );
    // Using the Item element, create a new instance of the TabItem class
    this.tabItem = new TabItem(this.itemElement);
    // Add a click event listener on this instance, calling the select method on click
    this.element.addEventListener('click', () => this.select());
  }

  select() {
    if (this.parentTab.currentTab != this) {
      // Add a class named "tabs-link-selected" to this link
      this.element.classList.add('tabs-link-selected');
      // Call the select method on the item associated with this link
      this.tabItem.select();
      this.parentTab.currentTab.deselect();
      this.parentTab.currentTab = this;
    }
  }

  deselect() {
    this.element.classList.remove('tabs-link-selected');
    this.tabItem.deselect();
  }
}

class TabItem {
  constructor(element) {
    // Assign this.element to the passed in element
    this.element = element;
  }

  select() {
    // Add a class named "tabs-item-selected" to this element
    this.element.classList.add('tabs-item-selected');
  }

  deselect() {
    this.element.classList.remove('tabs-item-selected');
  }
}

/* START HERE: 

- Select all classes named ".tabs-link" and assign that value to the links variable

- With your selection in place, now chain a .forEach() method onto the links variable to iterate over the DOM NodeList

- In your .forEach() method's callback function, return a new instance of TabLink and pass in each link as a parameter

*/

document.querySelectorAll('.tabs').forEach(tabs => new Tabs(tabs));

const PROPERTY_KEY = "properties";
class PropertyStore {
  constructor() {
    this.properties = [];
    this.loadFromLocalStorage();
  }
  loadFromLocalStorage() {
    if (!localStorage) return [];
    this.properties = JSON.parse(localStorage.getItem(PROPERTY_KEY) || "[]");
  }
  saveToLocalStorage() {
    if (!localStorage) return false;
    localStorage.setItem(PROPERTY_KEY, JSON.stringify(this.properties));
  }
  addProperty(property) {
    const props = [property, ...this.properties];
    const ids = props.map(p => p.ids);
    this.properties = props.filter(
      (prop, index) => ids.indexOf(prop.ids) === index
    );
    this.saveToLocalStorage();
  }
  setProperties(properties) {
    this.properties = [...properties];
    this.saveToLocalStorage();
  }
  removeProperty(property) {
    const index = this.properties.indexOf(property);
    if (index >= 0) {
      this.properties = [
        ...this.properties.slice(0, index),
        ...this.properties.slice(index + 1)
      ];
      this.saveToLocalStorage();
    }
  }
  cleanProperties() {
    this.properties = [];
    this.saveToLocalStorage();
  }
}

export default PropertyStore;

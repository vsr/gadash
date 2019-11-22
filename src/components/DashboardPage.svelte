<script>
  import DateSelector from "./DateSelector.svelte";
  import IdExplorer from "./IdExplorer.svelte";
  import PropertyBoard from "./PropertyBoard.svelte";
  import { onMount } from "svelte";
  import PropertyStore from "../lib/property-store";

  let dateRange;
  let propertyStore;
  let properties = [];
  let viewData;
  onMount(() => {
    propertyStore = new PropertyStore();
    properties = [...propertyStore.properties];
  });
  const onDateSelected = ({ detail: detail }) => {
    dateRange = detail;
  };
  const addProperty = ({ detail: detail }) => {
    console.log("addProperty", detail);
    propertyStore.addProperty(detail);
    properties = [...propertyStore.properties];
  };
  const removeProperty = ({ detail }) => {
    console.log("removeProperty", detail);
    propertyStore.removeProperty(detail);
    properties = [...propertyStore.properties];
  };
</script>

<div>
  <div class="flex flex-wrap">
    <div class="p-2 border m-2 rounded">
      <IdExplorer on:selected={addProperty} />
    </div>
    <div class="p-2 border m-2 rounded">
      <DateSelector on:selected={onDateSelected} />
    </div>

  </div>
  {properties.length}
  <div class="flex flex-wrap">
    {#each properties as property (property.ids)}
      <PropertyBoard
        {dateRange}
        viewData={property}
        on:remove={removeProperty} />
    {/each}
  </div>
</div>

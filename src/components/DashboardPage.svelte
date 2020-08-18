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
    propertyStore.addProperty(detail);
    properties = [...propertyStore.properties];
  };
  const removeProperty = ({ detail }) => {
    propertyStore.removeProperty(detail);
    properties = [...propertyStore.properties];
  };
</script>

<div>
  <div class="flex flex-wrap">
    <div class="border-b p-2 flex flex-wrap w-full">
      <div class="">
        <IdExplorer on:selected={addProperty} expanded={false} />
      </div>
      <div class="">
        <DateSelector on:selected={onDateSelected} expanded={false} />
      </div>
    </div>
  </div>
  <div class="flex flex-wrap">
    {#each properties as property (property.ids)}
      <PropertyBoard
        {dateRange}
        viewData={property}
        on:remove={removeProperty} />
    {/each}
  </div>
</div>

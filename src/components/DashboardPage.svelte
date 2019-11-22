<script>
  import DateSelector from "./DateSelector.svelte";
  import IdExplorer from "./IdExplorer.svelte";
  let dateRange;

  const onDateSelected = ({ detail: detail }) => {
    dateRange = detail;
    console.log("onDateSelected", dateRange);
  };
  const addProperty = ({ detail: detail }) => {
    console.log("addProperty", detail);
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
</div>

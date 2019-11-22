<script>
  export let viewData;
  export let dateRange;
  import { onMount, createEventDispatcher } from "svelte";

  let chartContainer1;

  let commonConfig = {
    query: {
      metrics: "ga:sessions",
      dimensions: "ga:date"
    },
    chart: {
      type: "LINE",
      options: {
        width: "100%"
      }
    }
  };

  let dataChart;

  const initChart = (dateRange, ids, container) => {
    console.log("initChart", { ...dateRange, ids });
    const ch = new gapi.analytics.googleCharts.DataChart(commonConfig)
      .set({ query: { ...dateRange, ids: ids } })
      .set({ chart: { container } })
      .execute();
    console.log(ch);
    return ch;
  };

  onMount(() => {
    console.log("onmount", dateRange, viewData, viewData.ids, chartContainer1);
    if (dateRange && viewData && viewData.ids && chartContainer1) {
      dataChart = initChart(dateRange, viewData.ids, chartContainer1);
    }
  });

  $: dataChart =
    dateRange && viewData && viewData.ids && chartContainer1
      ? initChart(dateRange, viewData.ids, chartContainer1)
      : null;
</script>

{#if viewData}
  <section class="p-2 m-2 rounded border shadow">
    <h1 class="text-sm text-bold text-blue-800">
      {viewData.property.name}({viewData.view.name})
    </h1>
    <div class="flex">
      <div bind:this={chartContainer1} class="chart-x" />
    </div>
  </section>
{/if}

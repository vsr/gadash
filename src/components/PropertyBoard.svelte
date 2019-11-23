<script>
  export let viewData;
  export let dateRange;
  import { onMount, createEventDispatcher } from "svelte";

  let chartContainers = [];
  const dispatch = createEventDispatcher();

  const chartConfigs = [
    {
      query: {
        metrics:
          "ga:sessions,ga:users,ga:pageviews,ga:bounceRate,ga:avgTimeOnPage,ga:avgPageLoadTime"
      },
      chart: {
        type: "TABLE"
      }
    },
    {
      query: {
        metrics: "ga:sessions",
        dimensions: "ga:date"
      },
      chart: {
        type: "LINE",
        options: {
          width: "100%",
          title: "Sessions over date range."
        }
      }
    }
  ];

  let dataCharts;

  const initChart = (dateRange, ids, container) => {
    console.log("initChart", { ...dateRange, ids });
    dataCharts = [];
    chartConfigs.forEach((config, i) => {
      dataCharts[i] = new gapi.analytics.googleCharts.DataChart(config)
        .set({ query: { ...dateRange, ids: ids } })
        .set({ chart: { container: chartContainers[i] } })
        .execute();
    });
  };

  onMount(() => {
    console.log("onmount", dateRange, viewData, viewData.ids);
    if (dateRange && viewData && viewData.ids) {
      dataCharts = initChart(dateRange, viewData.ids);
    }
  });

  $: dataCharts =
    dateRange && viewData && viewData.ids
      ? initChart(dateRange, viewData.ids)
      : null;
</script>

{#if viewData}
  <section class="p-2 m-2 rounded border shadow relative max-w-full">
    <h1 class="text-sm text-bold text-blue-800">
      {viewData.property.name}({viewData.view.name})
    </h1>

    <div class="flex w-full flex-wrap">
      {#each chartConfigs as chartConfig, i}
        <div bind:this={chartContainers[i]} class="chart-x max-w-full" />
      {/each}
    </div>

    <span
      on:click={() => {
        dispatch('remove', viewData);
      }}
      class="absolute top-0 right-0 text-center text-xl font-extrabold
      cursor-pointer bg-gray-200 text-red-600 rounded-full w-8 h-8 block border
      hover:bg-gray-100 p-1"
      title="Delete property dashboard">
      ✖
    </span>
  </section>
{/if}

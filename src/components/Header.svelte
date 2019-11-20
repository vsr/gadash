<script>
  export let gapiAuthenticated;
  export let gapiUser;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<header class="bg-blue-100 py-2 px-4 shadow leading-loose">
  <div class="container mx-auto flex justify-between">
    <h1 class="text-xl font-bold text-blue-600 hover:text-blue-500 italic">
      <a href="/">gaDash</a>
    </h1>
    {#if gapiAuthenticated}
      <div>
        {#if gapiUser}
          <div class="flex">
            <img
              class="inline rounded-full w-8 h-8"
              src={gapiUser.imageUrl}
              alt="Profile image" />
            <div
              class=" flex-col text-sm leading-tight align-top pl-1 hidden
              md:flex">
              <span>{gapiUser.name}</span>
              <span>({gapiUser.email})</span>
              <span>
                <button
                  class="rounded bg-red-600 text-gray-200 p-1"
                  on:click={() => {
                    dispatch('logout', {});
                  }}>
                  Logout
                </button>
              </span>
            </div>

          </div>
        {/if}
      </div>
    {/if}
  </div>
</header>

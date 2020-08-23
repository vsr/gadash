<script>
  export let gapiAuthenticated;
  export let gapiUser;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let menuShown = false;

  const toggleMenu = () => {
    menuShown = !menuShown;
  };
</script>

<header class="border-b text-gray-900 py-2 px-4 ">
  <div class="container mx-auto flex justify-between relative">
    <h1 class="text-md font-bold hover:text-gray-800">
      <a href="/">gaDash</a>
    </h1>
    {#if gapiAuthenticated}
      <div>
        {#if gapiUser}
          <div class="relative">
            <!-- {gapiUser.email} -->
            <span
              on:click={toggleMenu}
              class="inline text-xs cursor-pointer p-2 underline">
              Hi {gapiUser.name}!
            </span>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</header>

{#if gapiAuthenticated && gapiUser}
  <div
    class:hidden={!menuShown}
    class:block={menuShown}
    class="text-sm leading-tight align-top absolute w-screen h-screen right-0
    top-0 left-0 bottom-0 z-40 ">
    <!-- <div class="flex justify-end">
          <span
            on:click={toggleMenu}
            class="text-center text-xl font-extrabold cursor-pointer bg-gray-200
            rounded-full w-8 h-8 block border-2 hover:bg-gray-100 p-1">
            ✖
          </span>
        </div> -->
    <div
      class="mask w-screen h-screen bg-gray-500 bg-opacity-75 overflow-hidden"
      on:click={toggleMenu}>
      <div
        on:click={ev => {
          ev.stopPropagation();
        }}
        class="bg-white text-gray-700 rounded shadow-md p-2 mx-auto w-64 mt-8">
        <div class="flex border-b p-2">
          <img
            class="inline rounded-full w-8 h-8 cursor-pointer"
            src={gapiUser.imageUrl}
            alt="Pic" />
          <div class=" pl-2">
            {gapiUser.name}
            <br />
            ({gapiUser.email})
          </div>
        </div>
        <div class="p-2">
          <a
            href="javascript:void()"
            class="text-red-800 font-medium cursor-pointer"
            on:click={() => {
              dispatch('logout', {});
            }}>
            Logout
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}

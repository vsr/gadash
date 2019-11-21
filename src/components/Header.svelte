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

<header class="bg-blue-100 py-2 px-4 shadow leading-loose">
  <div class="container mx-auto flex justify-between relative">
    <h1 class="text-xl font-bold text-blue-600 hover:text-blue-500 italic">
      <a href="/">gaDash</a>
    </h1>
    {#if gapiAuthenticated}
      <div>
        {#if gapiUser}
          <div class="relative">
            <img
              on:click={toggleMenu}
              class="inline rounded-full w-10 h-10 cursor-pointer border-2
              border-white hover:border-gray-400 "
              src={gapiUser.imageUrl}
              alt="Profile image" />
          </div>
        {/if}
      </div>
    {/if}

    {#if gapiAuthenticated && gapiUser}
      <div
        class:hidden={!menuShown}
        class:block={menuShown}
        class="text-sm leading-tight align-top absolute right-0 top-0">
        <div class="flex justify-end">
          <span
            on:click={toggleMenu}
            class="text-center text-2xl font-extrabold cursor-pointer
            bg-gray-200 rounded-full w-10 h-10 block border-2 cursor-pointer
            hover:bg-gray-100 p-1">
            ✖
          </span>
        </div>
        <div class="bg-white rounded shadow-md mt-1">
          <div class="flex border-b p-2">
            <img
              class="inline rounded-full w-8 h-8 pointer"
              src={gapiUser.imageUrl}
              alt="Profile image" />
            <div class=" pl-2">
              {gapiUser.name}
              <br />
              ({gapiUser.email})
            </div>
          </div>
          <div class="text-red-800 p-2">
            <a
              href="javascript:void()"
              class=""
              on:click={() => {
                dispatch('logout', {});
              }}>
              Logout
            </a>
          </div>
        </div>
      </div>
    {/if}

  </div>
</header>

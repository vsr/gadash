<script>
  export let gapiAuthenticated;
  export let gapiUser;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let menuShown = false;

  const toggleMenu = () => {
    console.log("toggleMenu", menuShown);
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
              class="inline rounded-full w-8 h-8 cursor-pointer"
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
            class=" font-extrabold cursor-pointer bg-gray-100 rounded-full w-8
            h-8 block p-1">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41
                19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
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

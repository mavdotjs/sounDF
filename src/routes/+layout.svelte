<script lang="ts">
  import type { LayoutData } from './$types';
  
  import '../theme.postcss';
  import '@skeletonlabs/skeleton/styles/all.css';
  import '../app.postcss';

  import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';

  export let data: LayoutData;
  console.log(data)
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">sounDF</svelte:fragment>
      <LightSwitch />
      <svelte:fragment slot="trail">
        {#if data._lucia.user}
          {data._lucia.user.username}
        {:else}
          Not logged in
        {/if}
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <slot />
  <svelte:fragment slot="pageFooter">Made by The Crash Corporation</svelte:fragment>
</AppShell>

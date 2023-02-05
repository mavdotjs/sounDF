<script lang=ts>
    import { writable } from "svelte/store";
    export let data;
    const result = writable(data.data)
    const query = writable<"Mod" | "Beta" | null>()
    function copy(text: string) {
        return () => {
            navigator.clipboard.writeText(text)
        }
    }
    
</script>

<div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Code</th>
                <th>Type</th>
			</tr>
		</thead>
		<tbody>
			{#each $result as row, i}
				<tr>
					<td>{row.code} <button on:click={copy(row.code)}>Copy</button></td>
                    <td>{row.type}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<script lang="ts">
	function getClassNames(name: string) {
		const combined = ['a-button'];
		combined.push(name);

		return combined.join(' ');
	}

	interface Props {
		class?: string;
	}
	let { class: className = '' }: Props = $props();
</script>

<div class={getClassNames(className)}></div>

<style lang="scss">
	@use '$styles/globals' as *;
</style>

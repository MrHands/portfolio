<script lang="ts">
	interface IProps {
		class?: string;
	}
	let { class: className }: IProps = $props();

	let classList = $derived(() => {
		const resolved = ['o-template'];
		if (className) {
			resolved.push(className);
		}
		return resolved;
	});
</script>

<div class={classList().join(' ')}></div>

<style lang="scss">
	@use '$styles/globals' as *;

	:global {
		.o-template {
			/* styles */
		}
	}
</style>
